// Afficher/Masquer le mot de passe
    const passwordField = document.getElementById("password");
    const togglePasswordButton = document.getElementById("toggle-password");

    togglePasswordButton.addEventListener("click", () => {
        if (passwordField.type === "password") {
            passwordField.type = "text";
            togglePasswordButton.textContent = "🙈"; // Icône œil barré
        } else {
            passwordField.type = "password";
            togglePasswordButton.textContent = "👁️"; // Icône œil
        }
    });

// Connexion
document.getElementById('login-btn').addEventListener('click', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Vérifiez si les champs ne sont pas vides
    if (email === "" || password === "") {
        alert("Veuillez remplir tous les champs");
        return;
    }

    if (email === "banhelyengo242@gmail.com" && password === "eeeeeeee") {
        alert("Connexion réussie");
        window.location.replace("horaire.html");
    } else {
        alert("Informations d'identification incorrectes");
    }
});

