document.addEventListener('DOMContentLoaded', () => {
    const saveBtn = document.querySelector('.save-btn');
    const nombrePlantaInput = document.getElementById('nombre-planta');
    const especiePlantaInput = document.getElementById('especie-planta');
    const registroError = document.getElementById('registro-error');
    const plantaRegistradaCard = document.getElementById('planta-registrada');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            if (nombrePlantaInput.value.trim() === '' || especiePlantaInput.value.trim() === '') {
                registroError.style.display = 'flex';
                registroError.style.animation = 'shake 0.3s';
                plantaRegistradaCard.style.display = 'none';
                setTimeout(() => {
                    registroError.style.animation = '';
                }, 300);
            } else {
                registroError.style.display = 'none';
                const plantaInfo = plantaRegistradaCard.querySelector('.planta-info');
                plantaInfo.querySelector('h4').textContent = nombrePlantaInput.value;
                plantaInfo.querySelector('p').textContent = especiePlantaInput.value;
                plantaRegistradaCard.style.display = 'flex';
            }
        });
    }
    const analizarExitoBtn = document.getElementById('analizar-exito-btn');
    const analizarFallidoBtn = document.getElementById('analizar-fallido-btn');
    const resultadoDiagnostico = document.getElementById('resultado-diagnostico');
    const resultadoTratamiento = document.getElementById('resultado-tratamiento');
    const resultadoError = document.getElementById('resultado-error');
    if (analizarExitoBtn) {
        analizarExitoBtn.addEventListener('click', () => {
            resultadoDiagnostico.style.display = 'block';
            resultadoTratamiento.style.display = 'block';
            resultadoError.style.display = 'none';
        });
    }
    if (analizarFallidoBtn) {
        analizarFallidoBtn.addEventListener('click', () => {
            resultadoError.style.display = 'block';
            resultadoError.style.animation = 'shake 0.3s';
            resultadoDiagnostico.style.display = 'none';
            resultadoTratamiento.style.display = 'none';
            setTimeout(() => {
                resultadoError.style.animation = '';
            }, 300);
        });
    }
    const modal = document.getElementById('feature-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const downloadBtn = document.getElementById('download-btn');
    const openModal = () => {
        if (modal) modal.style.display = 'block';
    }
    const closeModal = () => {
        if (modal) modal.style.display = 'none';
    }
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            window.location.href = 'Login.html';
        });
    }
    if (registerBtn) {
        registerBtn.addEventListener('click', () => {
            window.location.href = 'Register.html';
        });
    }
    if (downloadBtn) downloadBtn.addEventListener('click', openModal);
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => { if (event.target == modal) closeModal(); });
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1
    });
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});