document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('toggle-password');
    const btnLogin = document.querySelector('.btn-login');
    const btnText = document.querySelector('.btn-text');
    const btnLoader = document.querySelector('.btn-loader');
    const successModal = document.getElementById('success-modal');
    if (togglePasswordBtn) {
        togglePasswordBtn.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            togglePasswordBtn.textContent = type === 'password' ? '👀' : '🙈';
        });
    }
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const validatePassword = (password) => {
        return password.length >= 6;
    };
    const showError = (input, message) => {
        const errorElement = document.getElementById(`${input.id}-error`);
        if (errorElement) {
            errorElement.textContent = message;
            input.style.borderColor = '#E57373';
        }
    };
    const clearError = (input) => {
        const errorElement = document.getElementById(`${input.id}-error`);
        if (errorElement) {
            errorElement.textContent = '';
            input.style.borderColor = '#E0E0E0';
        }
    };
    if (emailInput) {
        emailInput.addEventListener('blur', () => {
            if (emailInput.value.trim() === '') {
                showError(emailInput, 'El correo electrónico es requerido');
            } else if (!validateEmail(emailInput.value)) {
                showError(emailInput, 'Por favor, ingresa un correo válido');
            } else {
                clearError(emailInput);
            }
        });
        emailInput.addEventListener('input', () => {
            if (emailInput.value.trim() !== '') {
                clearError(emailInput);
            }
        });
    }
    if (passwordInput) {
        passwordInput.addEventListener('blur', () => {
            if (passwordInput.value === '') {
                showError(passwordInput, 'La contraseña es requer ida');
            } else if (!validatePassword(passwordInput.value)) {
                showError(passwordInput, 'La contraseña debe tener al menos 6 caracteres');
            } else {
                clearError(passwordInput);
            }
        });
        passwordInput.addEventListener('input', () => {
            if (passwordInput.value !== '') {
                clearError(passwordInput);
            }
        });
    }
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            clearError(emailInput);
            clearError(passwordInput);
            let isValid = true;
            if (emailInput.value.trim() === '') {
                showError(emailInput, 'El correo electrónico es requerido');
                isValid = false;
            } else if (!validateEmail(emailInput.value)) {
                showError(emailInput, 'Por favor, ingresa un correo válido');
                isValid = false;
            }
            if (passwordInput.value === '') {
                showError(passwordInput, 'La contraseña es requerida');
                isValid = false;
            } else if (!validatePassword(passwordInput.value)) {
                showError(passwordInput, 'La contraseña debe tener al menos 6 caracteres');
                isValid = false;
            }
            if (!isValid) return;
            btnText.style.display = 'none';
            btnLoader.style.display = 'flex';
            btnLogin.disabled = true;
            try {
                await simulateLogin(emailInput.value, passwordInput.value);
                btnText.style.display = 'block';
                btnLoader.style.display = 'none';
                btnLogin.disabled = false;
                if (successModal) {
                    successModal.style.display = 'flex';
                    setTimeout(() => {
                        window.location.href = 'Dashboard.html';
                    }, 2000);
                }
            } catch (error) {
                btnText.style.display = 'block';
                btnLoader.style.display = 'none';
                btnLogin.disabled = false;
                if (error.message === 'invalid_credentials') {
                    showError(emailInput, 'Credenciales incorrectas');
                    showError(passwordInput, 'Verifica tu email y contraseña');
                } else {
                    showError(emailInput, 'Error al iniciar sesión. Intenta nuevamente');
                }
            }
        });
    }
    const simulateLogin = (email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email === 'admin@greencare.com' && password === 'password123') {
                    resolve({ success: true, user: { email } });
                } else {
                    resolve({ success: true, user: { email } });
                }
            }, 1500);
        });
    };
    const socialButtons = document.querySelectorAll('.btn-social');
    socialButtons.forEach(btn => {
        btn.addEventListener('click', () => {
        });
    });
    const forgotPasswordLink = document.querySelector('.forgot-password');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
        });
    }
    if (successModal) {
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                successModal.style.display = 'none';
            }
        });
    }
    document.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && document.activeElement.tagName !== 'BUTTON') {
            loginForm.dispatchEvent(new Event('submit'));
        }
    });
});