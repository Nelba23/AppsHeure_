const fs = require('fs');
const { google } = require('googleapis');

// Charger les identifiants
const credentials = JSON.parse(fs.readFileSync('chemin/vers/votre/fichier.json'));

// Authentification
const { client_secret, client_id, redirect_uris } = credentials.installed;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

// Authentifier l'application
async function authenticate() {
    const token = fs.readFileSync('token.json'); // Assurez-vous d'avoir un token valide
    oAuth2Client.setCredentials(JSON.parse(token));
}

// Lire des données depuis Google Sheets
async function readData() {
    await authenticate();
    const sheets = google.sheets({ version: 'v4', auth: oAuth2Client });
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: 'VOTRE_ID_DE_FEUILLE_DE_CALCUL',
        range: 'Feuille1!A1:E', // Ajustez la plage selon vos besoins
    });
    const rows = response.data.values;
    if (rows.length) {
        console.log('Données :');
        rows.map((row) => {
            console.log(`${row.join(', ')}`);
        });
    } else {
        console.log('Aucune donnée trouvée.');
    }
}
readData().catch(console.error);
