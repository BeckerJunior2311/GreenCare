document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const fullnameInput = document.getElementById('fullname');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const termsCheckbox = document.getElementById('terms');
    const togglePasswordBtn = document.getElementById('toggle-password');
    const toggleConfirmPasswordBtn = document.getElementById('toggle-confirm-password');
    const btnRegister = document.querySelector('.btn-register');
    const btnText = document.querySelector('.btn-text');
    const btnLoader = document.querySelector('.btn-loader');
    const successModal = document.getElementById('success-modal');
    const strengthFill = document.getElementById('strength-fill');
    const strengthText = document.getElementById('strength-text');
    if (togglePasswordBtn) {
        togglePasswordBtn.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            togglePasswordBtn.textContent = type === 'password' ? '👀' : '🙈';
        });
    }
    if (toggleConfirmPasswordBtn) {
        toggleConfirmPasswordBtn.addEventListener('click', () => {
            const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            confirmPasswordInput.setAttribute('type', type);
            toggleConfirmPasswordBtn.textContent = type === 'password' ? '👀' : '🙈';
        });
    }
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const validatePhone = (phone) => {
        if (phone.trim() === '') return true;
        const phoneRegex = /^[\d\s\+\-\(\)]+$/;
        return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 9;
    };
    const validatePassword = (password) => {
        return password.length >= 8;
    };
    const checkPasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[^a-zA-Z0-9]/.test(password)) strength++;
        return strength;
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
    if (passwordInput && strengthFill && strengthText) {
        passwordInput.addEventListener('input', () => {
            const strength = checkPasswordStrength(passwordInput.value);
            strengthFill.className = 'strength-fill';
            if (passwordInput.value.length === 0) {
                strengthFill.style.width = '0%';
                strengthText.textContent = '';
            } else if (strength <= 2) {
                strengthFill.classList.add('weak');
                strengthText.textContent = 'Débil';
                strengthText.style.color = '#E57373';
            } else if (strength <= 4) {
                strengthFill.classList.add('medium');
                strengthText.textContent = 'Media';
                strengthText.style.color = '#FFA726';
            } else {
                strengthFill.classList.add('strong');
                strengthText.textContent = 'Fuerte';
                strengthText.style.color = '#4CAF50';
            }
        });
    }
    if (fullnameInput) {
        fullnameInput.addEventListener('blur', () => {
            if (fullnameInput.value.trim().length < 3) {
                showError(fullnameInput, 'El nombre debe tener al menos 3 caracteres');
            } else {
                clearError(fullnameInput);
            }
        });
        fullnameInput.addEventListener('input', () => {
            if (fullnameInput.value.trim().length >= 3) {
                clearError(fullnameInput);
            }
        });
    }
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
    if (phoneInput) {
        phoneInput.addEventListener('blur', () => {
            if (phoneInput.value.trim() !== '' && !validatePhone(phoneInput.value)) {
                showError(phoneInput, 'Por favor, ingresa un teléfono válido');
            } else {
                clearError(phoneInput);
            }
        });
        phoneInput.addEventListener('input', () => {
            clearError(phoneInput);
        });
    }
    if (passwordInput) {
        passwordInput.addEventListener('blur', () => {
            if (passwordInput.value === '') {
                showError(passwordInput, 'La contraseña es requerida');
            } else if (!validatePassword(passwordInput.value)) {
                showError(passwordInput, 'La contraseña debe tener al menos 8 caracteres');
            } else {
                clearError(passwordInput);
            }
        });
    }
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('blur', () => {
            if (confirmPasswordInput.value === '') {
                showError(confirmPasswordInput, 'Debes confirmar tu contraseña');
            } else if (passwordInput.value !== confirmPasswordInput.value) {
                showError(confirmPasswordInput, 'Las contraseñas no coinciden');
            } else {
                clearError(confirmPasswordInput);
            }
        });
        confirmPasswordInput.addEventListener('input', () => {
            if (confirmPasswordInput.value === passwordInput.value) {
                clearError(confirmPasswordInput);
            }
        });
    }
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            [fullnameInput, emailInput, phoneInput, passwordInput, confirmPasswordInput].forEach(input => {
                if (input) clearError(input);
            });
            let isValid = true;
            if (fullnameInput.value.trim().length < 3) {
                showError(fullnameInput, 'El nombre debe tener al menos 3 caracteres');
                isValid = false;
            }
            if (emailInput.value.trim() === '') {
                showError(emailInput, 'El correo electrónico es requerido');
                isValid = false;
            } else if (!validateEmail(emailInput.value)) {
                showError(emailInput, 'Por favor, ingresa un correo válido');
                isValid = false;
            }
            if (phoneInput.value.trim() !== '' && !validatePhone(phoneInput.value)) {
                showError(phoneInput, 'Por favor, ingresa un teléfono válido');
                isValid = false;
            }
            if (passwordInput.value === '') {
                showError(passwordInput, 'La contraseña es requerida');
                isValid = false;
            } else if (!validatePassword(passwordInput.value)) {
                showError(passwordInput, 'La contraseña debe tener al menos 8 caracteres');
                isValid = false;
            }
            if (confirmPasswordInput.value === '') {
                showError(confirmPasswordInput, 'Debes confirmar tu contraseña');
                isValid = false;
            } else if (passwordInput.value !== confirmPasswordInput.value) {
                showError(confirmPasswordInput, 'Las contraseñas no coinciden');
                isValid = false;
            }
            if (!termsCheckbox.checked) {
                showError(termsCheckbox, 'Debes aceptar los términos y condiciones');
                isValid = false;
            } else {
                clearError(termsCheckbox);
            }
            if (!isValid) return;
            btnText.style.display = 'none';
            btnLoader.style.display = 'flex';
            btnRegister.disabled = true;
            try {
                const userType = document.querySelector('input[name="user-type"]:checked').value;
                const newsletter = document.getElementById('newsletter').checked;
                await simulateRegistration({
                    fullname: fullnameInput.value,
                    email: emailInput.value,
                    phone: phoneInput.value,
                    password: passwordInput.value,
                    userType: userType,
                    newsletter: newsletter
                });
                btnText.style.display = 'block';
                btnLoader.style.display = 'none';
                btnRegister.disabled = false;
                if (successModal) {
                    successModal.style.display = 'flex';
                    setTimeout(() => {
                        window.location.href = 'Login.html';
                    }, 2500);
                }
            } catch (error) {
                btnText.style.display = 'block';
                btnLoader.style.display = 'none';
                btnRegister.disabled = false;
                if (error.message === 'email_exists') {
                    showError(emailInput, 'Este email ya está registrado');
                } else {
                    showError(emailInput, 'Error al crear la cuenta. Intenta nuevamente');
                }
            }
        });
    }
    const simulateRegistration = (userData) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({ success: true, user: userData });
            }, 1800);
        });
    };
    const socialButtons = document.querySelectorAll('.btn-social');
    socialButtons.forEach(btn => {
        btn.addEventListener('click', () => {
        });
    });
    const termsLinks = document.querySelectorAll('.link');
    termsLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
        });
    });
    if (successModal) {
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                successModal.style.display = 'none';
            }
        });
    }
});