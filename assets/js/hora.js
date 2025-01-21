// Afficher l'heure actuelle
function afficherHeureActuelle() {
    const now = new Date();
    const heure = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const secondes = now.getSeconds().toString().padStart(2, '0');

    document.getElementById('heureActuelle').innerText = `Heure actuelle: ${heure}:${minutes}:${secondes}`;
}

// Mise à jour de l'heure toutes les secondes
setInterval(afficherHeureActuelle, 1000);

// Gestion des horaires
let arrivalTime = null;
let breakStartTime = null;
let breakEndTime = null;
let departureTime = null;

document.getElementById('arrivalBtn').addEventListener('click', function() {
    arrivalTime = new Date();
    document.getElementById('arrivalTime').innerText = `${arrivalTime.getHours().toString().padStart(2, '0')}:${arrivalTime.getMinutes().toString().padStart(2, '0')}`;
    document.getElementById('breakStartBtn').disabled = false;
    afficherNotification('Heure d\'arrivée enregistrée');
});

document.getElementById('breakStartBtn').addEventListener('click', function() {
    breakStartTime = new Date();
    document.getElementById('breakStartTime').innerText = `${breakStartTime.getHours().toString().padStart(2, '0')}:${breakStartTime.getMinutes().toString().padStart(2, '0')}`;
    document.getElementById('breakEndBtn').disabled = false;
    afficherNotification('Heure de début de pause enregistrée');
});

document.getElementById('breakEndBtn').addEventListener('click', function() {
    breakEndTime = new Date();
    document.getElementById('breakEndTime').innerText = `${breakEndTime.getHours().toString().padStart(2, '0')}:${breakEndTime.getMinutes().toString().padStart(2, '0')}`;
    document.getElementById('departureBtn').disabled = false;
    afficherNotification('Heure de fin de pause enregistrée');
});

document.getElementById('departureBtn').addEventListener('click', function() {
    departureTime = new Date();
    document.getElementById('departureTime').innerText = `${departureTime.getHours().toString().padStart(2, '0')}:${departureTime.getMinutes().toString().padStart(2, '0')}`;
    document.getElementById('saveBtn').disabled = false;
    afficherNotification('Heure de départ enregistrée');
});

document.getElementById('saveBtn').addEventListener('click', function() {
    // Sauvegarde des horaires (ici, on les affiche simplement)
    console.log('Horaires enregistrés:');
    console.log(`Arrivée: ${arrivalTime.toLocaleTimeString()}`);
    console.log(`Début de pause: ${breakStartTime.toLocaleTimeString()}`);
    console.log(`Fin de pause: ${breakEndTime.toLocaleTimeString()}`);
    console.log(`Départ: ${departureTime.toLocaleTimeString()}`);
    afficherNotification('Horaires enregistrés avec succès');
});

// // Fonction pour afficher des notifications
// function afficherNotification(message) {
//     const notificationElement = document.getElementById('notification');
//     notificationElement.innerText = message;
//     setTimeout(() => {
//         notificationElement.innerText = '';
//     }, 3000); // Effacer la notification après 3 secondes
// 
