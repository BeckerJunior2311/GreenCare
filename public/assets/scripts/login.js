// Login Form Validation and Interaction
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('toggle-password');
    const btnLogin = document.querySelector('.btn-login');
    const btnText = document.querySelector('.btn-text');
    const btnLoader = document.querySelector('.btn-loader');
    const successModal = document.getElementById('success-modal');
    // Toggle password visibility
    if (togglePasswordBtn) {
        togglePasswordBtn.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            togglePasswordBtn.textContent = type === 'password' ? '👀' : '🙈';
        });
    }
    // Email validation
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    // Password validation
    const validatePassword = (password) => {
        return password.length >= 6;
    };
    // Show error message
    const showError = (input, message) => {
        const errorElement = document.getElementById(`${input.id}-error`);
        if (errorElement) {
            errorElement.textContent = message;
            input.style.borderColor = '#E57373';
        }
    };
    // Clear error message
    const clearError = (input) => {
        const errorElement = document.getElementById(`${input.id}-error`);
        if (errorElement) {
            errorElement.textContent = '';
            input.style.borderColor = '#E0E0E0';
        }
    };
    // Real-time email validation
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
    // Real-time password validation
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
    // Form submission
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            // Clear previous errors
            clearError(emailInput);
            clearError(passwordInput);
            let isValid = true;
            // Validate email
            if (emailInput.value.trim() === '') {
                showError(emailInput, 'El correo electrónico es requerido');
                isValid = false;
            } else if (!validateEmail(emailInput.value)) {
                showError(emailInput, 'Por favor, ingresa un correo válido');
                isValid = false;
            }
            // Validate password
            if (passwordInput.value === '') {
                showError(passwordInput, 'La contraseña es requerida');
                isValid = false;
            } else if (!validatePassword(passwordInput.value)) {
                showError(passwordInput, 'La contraseña debe tener al menos 6 caracteres');
                isValid = false;
            }
            if (!isValid) return;
            // Show loading state
            btnText.style.display = 'none';
            btnLoader.style.display = 'flex';
            btnLogin.disabled = true;
            // Simulate API call (replace with actual API call in production)
            try {
                await simulateLogin(emailInput.value, passwordInput.value);
                // Success
                btnText.style.display = 'block';
                btnLoader.style.display = 'none';
                btnLogin.disabled = false;
                // Show success modal
                if (successModal) {
                    successModal.style.display = 'flex';
                    // Redirect to dashboard after 2 seconds
                    setTimeout(() => {
                        window.location.href = 'Dashboard.html';
                    }, 2000);
                }
            } catch (error) {
                // Error handling
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
    // Simulate login API call
    const simulateLogin = (email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Demo credentials: admin@greencare.com / password123
                if (email === 'admin@greencare.com' && password === 'password123') {
                    resolve({ success: true, user: { email } });
                } else {
                    // For demo purposes, accept any valid email/password
                    resolve({ success: true, user: { email } });
                    // Uncomment below to test error state:
                    // reject(new Error('invalid_credentials'));
                }
            }, 1500); // Simulate network delay
        });
    };
    // Social login buttons (for demonstration)
    const socialButtons = document.querySelectorAll('.btn-social');
    socialButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            alert('Función de login social próximamente disponible');
        });
    });
    // Forgot password link
    const forgotPasswordLink = document.querySelector('.forgot-password');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Función de recuperación de contraseña próximamente disponible');
        });
    }
    // Close modal on click outside
    if (successModal) {
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                successModal.style.display = 'none';
            }
        });
    }
    // Add enter key support
    document.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && document.activeElement.tagName !== 'BUTTON') {
            loginForm.dispatchEvent(new Event('submit'));
        }
    });
});
