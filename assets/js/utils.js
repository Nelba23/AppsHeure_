function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

function formatDate() {
    const now = new Date();
    return now.toISOString().split('T')[0];
}