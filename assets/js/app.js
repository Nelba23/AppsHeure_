// DOM Elements
const arrivalTimeEl = document.getElementById('arrivalTime');
const breakStartTimeEl = document.getElementById('breakStartTime');
const breakEndTimeEl = document.getElementById('breakEndTime');
const departureTimeEl = document.getElementById('departureTime');

const arrivalBtn = document.getElementById('arrivalBtn');
const breakStartBtn = document.getElementById('breakStartBtn');
const breakEndBtn = document.getElementById('breakEndBtn');
const departureBtn = document.getElementById('departureBtn');
const saveBtn = document.getElementById('saveBtn');

// Time data
const timeData = {
    arrivalTime: '',
    breakStartTime: '',
    breakEndTime: '',
    departureTime: ''
};

// Event Listeners
arrivalBtn.addEventListener('click', () => {
    timeData.arrivalTime = getCurrentTime();
    arrivalTimeEl.textContent = timeData.arrivalTime;
    
    arrivalBtn.disabled = true;
    breakStartBtn.disabled = false;
    departureBtn.disabled = false;
});

breakStartBtn.addEventListener('click', () => {
    timeData.breakStartTime = getCurrentTime();
    breakStartTimeEl.textContent = timeData.breakStartTime;
    
    breakStartBtn.disabled = true;
    breakEndBtn.disabled = false;
    departureBtn.disabled = true;
});

breakEndBtn.addEventListener('click', () => {
    timeData.breakEndTime = getCurrentTime();
    breakEndTimeEl.textContent = timeData.breakEndTime;
    
    breakEndBtn.disabled = true;
    departureBtn.disabled = false;
});

departureBtn.addEventListener('click', () => {
    timeData.departureTime = getCurrentTime();
    departureTimeEl.textContent = timeData.departureTime;
    
    departureBtn.disabled = true;
    breakStartBtn.disabled = true;
    saveBtn.disabled = false;
});

saveBtn.addEventListener('click', async () => {
    saveBtn.disabled = true;
    saveBtn.textContent = 'Saving...';
    
    try {
        const dataToSave = {
            date: formatDate(),
            ...timeData
        };
        
        await saveToGoogleSheets(dataToSave);
        
        // Reset all fields
        timeData.arrivalTime = '';
        timeData.breakStartTime = '';
        timeData.breakEndTime = '';
        timeData.departureTime = '';
        
        arrivalTimeEl.textContent = '--:--';
        breakStartTimeEl.textContent = '--:--';
        breakEndTimeEl.textContent = '--:--';
        departureTimeEl.textContent = '--:--';
        
        arrivalBtn.disabled = false;
        breakStartBtn.disabled = true;
        breakEndBtn.disabled = true;
        departureBtn.disabled = true;
        saveBtn.disabled = true;
        
        alert('Enregistrer avec succès!');
    } catch (error) {
        alert('Erreur. Please try again.');
    } finally {
        saveBtn.textContent = 'Enregistrer avec succès';
    }
});