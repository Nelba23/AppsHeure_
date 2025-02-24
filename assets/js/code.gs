function doPost(e) {
  var lock = LockService.getScriptLock();
  
  try {
    lock.tryLock(10000);
    
    // Récupération et validation des paramètres
    const params = e.parameter;
    const { username, email, password, action } = params;

    // Vérification de l'action
    if (action !== 'login') {
      return createResponse(false, 'Action non reconnue');
    }

    // Validation des données requises
    if (!username || !email || !password) {
      return createResponse(false, 'Données manquantes');
    }

    // Accès à la feuille de calcul
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Users');
    if (!sheet) {
      throw new Error('Feuille de données non trouvée');
    }

    // Recherche de l'utilisateur
    const data = sheet.getDataRange().getValues();
    const userRow = data.find(row => 
      row[0].toLowerCase() === username.toLowerCase() && 
      row[1].toLowerCase() === email.toLowerCase() && 
      row[2] === password
    );

    if (!userRow) {
      return createResponse(false, 'Identifiants incorrects');
    }

    // Mise à jour de la dernière connexion
    const rowIndex = data.findIndex(row => 
      row[0].toLowerCase() === username.toLowerCase()
    ) + 1;
    
    if (rowIndex > 0) {
      sheet.getRange(rowIndex, 4).setValue(new Date());
    }

    // Création du token de session
    const token = Utilities.getUuid();

    return createResponse(true, 'Connexion réussie', {
      username: username,
      email: email,
      token: token,
      lastLogin: new Date().toISOString()
    });

  } catch (error) {
    console.error('Erreur:', error);
    return createResponse(false, 'Erreur système: ' + error.message);
  
  } finally {
    if (lock.hasLock()) {
      lock.releaseLock();
    }
  }
}

function createResponse(success, message, data = {}) {
  return ContentService.createTextOutput(JSON.stringify({
    success: success,
    message: message,
    ...data
  }))
  .setMimeType(ContentService.MimeType.JSON)
  .setHeader('Access-Control-Allow-Origin', '*')
  .setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
}

function doGet() {
  return createResponse(true, 'Service actif', {
    timestamp: new Date().toISOString()
  });
}

// Fonction de test pour vérifier la configuration
function testConfiguration() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Users');
  if (!sheet) {
    throw new Error('La feuille Users n\'existe pas');
  }
  
  const headers = sheet.getRange(1, 1, 1, 4).getValues()[0];
  const expectedHeaders = ['Username', 'Email', 'Password', 'Last Login'];
  
  const missingHeaders = expectedHeaders.filter(header => 
    !headers.includes(header)
  );
  
  if (missingHeaders.length > 0) {
    throw new Error('Colonnes manquantes: ' + missingHeaders.join(', '));
  }
  
  return 'Configuration correcte';
}


// Horaire 
try {
  const date = json.
}
function doPost(e) {
  const spreadsheetId = 'VOTRE_SPREADSHEET_ID'; // À remplacer avec votre ID
  const params = JSON.parse(e.postData.contents);
  
  try {
    const ss = SpreadsheetApp.openById(spreadsheetId);
    let sheet = ss.getSheetByName('Pointages');
    
    // Créer la feuille si elle n'existe pas
    if (!sheet) {
      sheet = ss.insertSheet('Pointages');
      // En-têtes correspondant aux données envoyées par hora.js
      sheet.getRange('A1:F1').setValues([['Date', 'Utilisateur', 'Heure Début', 'Heure Début Pause', 'Heure Fin Pause', 'Heure Départ']]);
      sheet.setFrozenRows(1);
    }
    
    // Préparer les données à insérer en correspondance avec hora.js
    const rowData = [
      [
        params.date,
        params.username,
        params.heureDebut,
        params.heureDebutpause,
        params.heureFinpause,
        params.heureDepart
      ]
    ];
    
    // Insérer les données
    const lastRow = sheet.getLastRow();
    sheet.getRange(lastRow + 1, 1, 1, 6).setValues(rowData);
    
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'success',
      'message': 'Données enregistrées avec succès'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput('Service actif');
}




//brouillon

function doPost(e) {
  try {
    // Récupérer les données JSON
    const data = JSON.parse(e.postData.contents);
    
    // Ouvrir la feuille de calcul (remplacez l'ID par le vôtre)
    const ss = SpreadsheetApp.openById('VOTRE_ID_SPREADSHEET');
    let sheet = ss.getSheetByName('Pointages');
    
    // Créer la feuille si elle n'existe pas
    if (!sheet) {
      sheet = ss.insertSheet('Pointages');
      sheet.getRange('A1:F1').setValues([['Date', 'Utilisateur', 'Heure Début', 'Début Pause', 'Fin Pause', 'Départ']]);
      sheet.setFrozenRows(1);
    }
    
    // Préparer la ligne de données
    const rowData = [[
      data.date,
      data.username,
      data.heureDebut,
      data.heureDebutpause,
      data.heureFinpause,
      data.heureDepart
    ]];
    
    // Ajouter la ligne à la feuille
    sheet.getRange(sheet.getLastRow() + 1, 1, 1, 6).setValues(rowData);
    
    // Retourner une réponse de succès
    return ContentService.createTextOutput(JSON.stringify({
      result: 'success',
      message: 'Données enregistrées avec succès'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Retourner une réponse d'erreur
    return ContentService.createTextOutput(JSON.stringify({
      result: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput('Service actif');
}



