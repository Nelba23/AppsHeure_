document.addEventListener('DOMContentLoaded', function() {  
  const form = document.getElementById('loginform');  
  const loadingIndicator = document.getElementById('loading-indicator');  
  const errorMessage = document.getElementById('error-message');  

  // Fonction pour afficher/masquer le mot de passe  
  const togglePasswordButton = document.getElementById('toggle-password');  
  const passwordInput = document.getElementById('password');  

  togglePasswordButton.addEventListener('click', function() {  
    if (passwordInput.type === 'password') {  
      passwordInput.type = 'text';  
      togglePasswordButton.textContent = '🙈';  
    } else {  
      passwordInput.type = 'password';  
      togglePasswordButton.textContent = '👁️';  
    }  
  });  

  // Gestion du formulaire  
  form.addEventListener('submit', function(event) {  
    event.preventDefault();  

    // Récupération des données du formulaire  
    const username = document.getElementById('username').value;  
    const email = document.getElementById('email').value;  
    const password = document.getElementById('password').value;  

    // Afficher l'indicateur de chargement  
    loadingIndicator.style.display = 'block';  

    // URL du script Google Apps  
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbzgDHVwKQIGHhTg-LtPDkAfgT3oTXYXJYpl2Fp-QQWqb5mcep4c2HdtaaSqGNs394EALw/exec';  

    // Création d'un objet FormData  
    const formData = new URLSearchParams();  
    formData.append('username', username);  
    formData.append('email', email);  
    formData.append('password', password);  
    formData.append('action', 'login');  

    // Envoi des données au serveur  
    fetch(scriptUrl, {  
      method: 'POST',  
      body: formData  
    })  
    .then(response => {  
      if (!response.ok) { // Gérer une réponse non OK  
        throw new Error('Échec de la connexion');  
      }  
      return response.json();  
    })  
    .then(data => {  
      if (data.success) {  
        // Rediriger l'utilisateur vers la page d'accueil  
        window.location.href = '/horaire.html';  
      } else {  
        // Afficher un message d'erreur  
        errorMessage.textContent = data.message;  
        errorMessage.style.display = 'block';  
      }  
    })  
    .catch(error => {  
      // Afficher un message d'erreur générique  
      errorMessage.textContent = 'Une erreur s\'est produite. Veuillez réessayer : ' + error.message;  
      errorMessage.style.display = 'block';  
    })  
    .finally(() => {  
      // Masquer l'indicateur de chargement  
      loadingIndicator.style.display = 'none';  
    });  
  });  
});