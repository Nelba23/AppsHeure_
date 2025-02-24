const checkAuth = () => {
    const token = sessionStorage.getItem('token');
    const username = sessionStorage.getItem('username');
    
    if (!token || !username) {
        window.location.replace('/acceuil.html');
        return;
    }
    
    document.getElementById('username-display').textContent = username;
};

checkAuth();