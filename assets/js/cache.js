const togglePasswordButton = document.querySelector('#togglePassword');
const password = document.querySelector('#password');

togglePasswordButton.addEventListener("click", function () {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
  
    password.setAttribute('type', type);
  
    togglePasswordButton.textContent = type === 'password' ? '👁️' : '🙈';
  });
  