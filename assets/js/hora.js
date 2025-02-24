// Constants
const API_URL = 'https://script.google.com/macros/s/AKfycbxKRYzZuR2r8kefjd8Yt4gmb4tcxxMTCULPpVB3S4cQ-ogvh8f4HjxGtC2qMIbtFSjvdQ/exec';
const EMPTY_TIME_DISPLAY = '--:--';

// State variables
let state = {
    username: '',
    arrivalTime: '',
    startWorkTime: '',
    breakStartTime: '',
    breakEndTime: '',
    departureTime: ''
};

// Fonction pour afficher les notifications
function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    setTimeout(() => {
        notification.textContent = '';
        notification.className = 'notification';
    }, 3000);
}

// Initialisation de l'horloge en temps réel
function updateClock() {
    const now = new Date();
    document.getElementById('dateActuelle').textContent = now.toLocaleDateString();
    document.getElementById('heureActuelle').textContent = now.toLocaleTimeString();
}

// Au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    updateClock();
    setInterval(updateClock, 1000);

    const savedUsername = sessionStorage.getItem('username');
    if (savedUsername) {
        state.username = savedUsername;
    } else {
        window.location.href = 'acceuil.html';
    }
});

// Validation du format de l'heure
function validateTime(time) {
    if (!time) return true; // Allow empty times
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/;
    return typeof time === 'string' && timeRegex.test(time);
}

// Validation de la séquence des heures
function validateTimeSequence() {
    const times = [
        { time: state.arrivalTime, name: "d'arrivée" },
        { time: state.startWorkTime, name: 'de début de travail' },
        { time: state.breakStartTime, name: 'de début de pause' },
        { time: state.breakEndTime, name: 'de fin de pause' },
        { time: state.departureTime, name: 'de départ' }
    ];

    // Filter out empty times
    const filteredTimes = times.filter(t => t.time);

    // Vérifier que toutes les heures sont valides
    for (const timeEntry of times) {
        if (!validateTime(timeEntry.time)) {
            showNotification(`Format d'heure invalide pour l'heure ${timeEntry.name}`, 'error');
            return false;
        }
    }

    // Vérifier que chaque heure est bien après la précédente
    for (let i = 1; i < filteredTimes.length; i++) {
        const prevTime = new Date(`1970-01-01T${filteredTimes[i - 1].time}:00`);
        const currTime = new Date(`1970-01-01T${filteredTimes[i].time}:00`);

        if (isNaN(prevTime.getTime()) || isNaN(currTime.getTime())) {
          showNotification("Format d'heure invalide", 'error');
          return false;
        }

        // if (currTime <= prevTime) {
        //     showNotification(`L'heure ${filteredTimes[i].name} doit être après l'heure ${filteredTimes[i - 1].name}`, 'error');
        //     return false;
        // }
    }

    return true;
}

// Mise à jour d'un champ d'heure
function updateTimeField(timeType, nextButtonId) {
    let time;

    if (timeType === 'arrival') {
        // Récupérer la valeur de l'input time pour l'heure d'arrivée
        const timeInput = document.getElementById('arrivalTimeInput');
        time = timeInput.value;

        if (!validateTime(time)) {
            showNotification("Veuillez entrer une heure d'arrivée valide au format HH:MM", 'error');
            return;
        }
    } else {
        // Utiliser l'heure actuelle pour les autres champs
        time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    state[`${timeType}Time`] = time;
    document.getElementById(`${timeType}Time`).textContent = time;

    if (nextButtonId) {
        document.getElementById(nextButtonId).disabled = false;
    }

    const currentButton = document.getElementById(`${timeType}Btn`);
    if (currentButton) {
        currentButton.disabled = true;
    }
}

// Event Listeners pour chaque bouton
document.getElementById('arrivalBtn').addEventListener('click', () => {
    updateTimeField('arrival', 'startWorkBtn');
    showNotification("Heure d'arrivée enregistrée", 'success');
});

document.getElementById('startWorkBtn').addEventListener('click', () => {
    updateTimeField('startWork', 'breakStartBtn');
    showNotification("Heure de début de travail enregistrée", 'success');
});

document.getElementById('breakStartBtn').addEventListener('click', () => {
    updateTimeField('breakStart', 'breakEndBtn');
    showNotification("Début de pause enregistré", 'success');
});

document.getElementById('breakEndBtn').addEventListener('click', () => {
    updateTimeField('breakEnd', 'departureBtn');
    showNotification("Fin de pause enregistrée", 'success');
});

document.getElementById('departureBtn').addEventListener('click', () => {
    updateTimeField('departure', 'saveBtn');
    showNotification("Heure de départ enregistrée", 'success');
});

// Sauvegarde des données via API
document.getElementById('saveBtn').addEventListener('click', async function () {
    if (!validateTimeSequence()) return;

    const dataToSend = {
        username: state.username,
        date: new Date().toLocaleDateString(),
        heureDebut: state.arrivalTime,
        heureDebutTravail: state.startWorkTime,
        heureDebutpause: state.breakStartTime,
        heureFinpause: state.breakEndTime,
        heureDepart: state.departureTime
    };

    try {
        const formData = new URLSearchParams();
        formData.append('data', JSON.stringify(dataToSend));

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: formData.toString()
        });

        if (response.ok) {
            const responseData = await response.json();
            if (responseData.result === 'success') {
                showNotification("Données envoyées avec succès", 'success');
                resetForm();
            } else {
                showNotification(`Erreur lors de l'enregistrement : ${responseData.message}`, 'error');
            }
        } else {
            showNotification(`Erreur HTTP : ${response.status}`, 'error');
        }

    } catch (error) {
        console.error(error);
        showNotification(`Erreur lors de l'enregistrement : ${error.message}`, 'error');
    }
});

// Réinitialisation du formulaire
function resetForm() {
    Object.keys(state).forEach(key => { if (key !== 'username') state[key] = ''; });

    ['arrival', 'startWork', 'breakStart', 'breakEnd', 'departure'].forEach(field => {
        document.getElementById(`${field}Time`).textContent = EMPTY_TIME_DISPLAY;
    });

    document.getElementById('arrivalBtn').disabled = false;

    ['startWork', 'breakStart', 'breakEnd', 'departure', 'save'].forEach(btn => {
        document.getElementById(`${btn}Btn`).disabled = true;
    });
}
