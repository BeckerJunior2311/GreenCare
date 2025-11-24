// Diagnostico Functionality
document.addEventListener('DOMContentLoaded', () => {
    // ===== ELEMENTS =====
    const uploadArea = document.getElementById('upload-area');
    const uploadPrompt = document.getElementById('upload-prompt');
    const imageInput = document.getElementById('image-input');
    const selectImageBtn = document.getElementById('select-image-btn');
    const imageUploaded = document.getElementById('image-uploaded');
    const uploadedImage = document.getElementById('uploaded-image');
    const changeImageBtn = document.getElementById('change-image-btn');
    const analyzeBtn = document.getElementById('analyze-btn');
    const resultsSection = document.getElementById('results-section');
    const analyzingState = document.getElementById('analyzing-state');
    const resultsDisplay = document.getElementById('results-display');
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    const newDiagnosisBtn = document.getElementById('new-diagnosis-btn');
    const saveResultBtn = document.getElementById('save-result-btn');
    const shareResultBtn = document.getElementById('share-result-btn');

    // ===== FILE UPLOAD =====
    if (selectImageBtn) {
        selectImageBtn.addEventListener('click', () => {
            imageInput.click();
        });
    }

    if (uploadPrompt) {
        uploadPrompt.addEventListener('click', () => {
            imageInput.click();
        });

        // Drag and drop
        uploadPrompt.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadPrompt.style.borderColor = 'var(--primary-color)';
            uploadPrompt.style.background = 'rgba(1, 196, 142, 0.05)';
        });

        uploadPrompt.addEventListener('dragleave', () => {
            uploadPrompt.style.borderColor = 'var(--gray-300)';
            uploadPrompt.style.background = 'transparent';
        });

        uploadPrompt.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadPrompt.style.borderColor = 'var(--gray-300)';
            uploadPrompt.style.background = 'transparent';

            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) {
                handleImageUpload(file);
            } else {
                alert('Por favor, sube una imagen válida (JPG, PNG o WEBP)');
            }
        });
    }

    if (imageInput) {
        imageInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                handleImageUpload(file);
            }
        });
    }

    function handleImageUpload(file) {
        // Validate file size (10MB max)
        if (file.size > 10 * 1024 * 1024) {
            alert('La imagen no debe superar los 10MB');
            return;
        }

        // Show image preview
        const reader = new FileReader();
        reader.onload = (e) => {
            uploadedImage.src = e.target.result;
            uploadPrompt.style.display = 'none';
            imageUploaded.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }

    // ===== CHANGE IMAGE =====
    if (changeImageBtn) {
        changeImageBtn.addEventListener('click', () => {
            imageInput.value = '';
            uploadPrompt.style.display = 'block';
            imageUploaded.style.display = 'none';
            resultsSection.style.display = 'none';
        });
    }

    // ===== ANALYZE IMAGE =====
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', async () => {
            // Show analyzing state
            resultsSection.style.display = 'block';
            analyzingState.style.display = 'block';
            resultsDisplay.style.display = 'none';

            // Simulate progress
            await simulateAnalysis();

            // Show results
            analyzingState.style.display = 'none';
            resultsDisplay.style.display = 'grid';

            // Scroll to results
            resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    async function simulateAnalysis() {
        // Simulate AI processing with progress bar
        return new Promise((resolve) => {
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 15;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    setTimeout(resolve, 500);
                }
                progressFill.style.width = `${progress}%`;
                progressText.textContent = `${Math.floor(progress)}%`;
            }, 200);
        });
    }

    // =====  NEW DIAGNOSIS =====
    if (newDiagnosisBtn) {
        newDiagnosisBtn.addEventListener('click', () => {
            // Reset everything
            imageInput.value = '';
            uploadPrompt.style.display = 'block';
            imageUploaded.style.display = 'none';
            resultsSection.style.display = 'none';
            progressFill.style.width = '0%';
            progressText.textContent = '0%';

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===== SAVE RESULT =====
    if (saveResultBtn) {
        saveResultBtn.addEventListener('click', () => {
            alert('✅ Resultado guardado en tu historial\n\n(Funcionalidad completa próximamente disponible)');
        });
    }

    // ===== SHARE RESULT =====
    if (shareResultBtn) {
        shareResultBtn.addEventListener('click', () => {
            alert('📤 Compartir en comunidad\n\n(Funcionalidad de comunidad próximamente disponible)');
        });
    }

    // ===== RECENT DIAGNOSTICS CLICK =====
    const diagnosticItems = document.querySelectorAll('.diagnostic-item-mini');

    diagnosticItems.forEach(item => {
        item.addEventListener('click', () => {
            const plantName = item.querySelector('h5').textContent;
            alert(`Ver detalles del diagnóstico: ${plantName}\n\n(Página de historial próximamente disponible)`);
        });
    });

    console.log('✅ Diagnóstico initialized');
});
