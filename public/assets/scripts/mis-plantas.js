document.addEventListener('DOMContentLoaded', () => {
    const addPlantBtn = document.getElementById('add-plant-btn');
    const plantModal = document.getElementById('plant-modal');
    const closeModal = document.getElementById('close-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const plantForm = document.getElementById('plant-form');
    const searchInput = document.getElementById('search-plants');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const viewBtns = document.querySelectorAll('.view-btn');
    const plantsGrid = document.getElementById('plants-grid');
    const emptyState = document.getElementById('empty-state');
    const fileUpload = document.getElementById('file-upload');
    const plantImage = document.getElementById('plant-image');
    const uploadPlaceholder = document.getElementById('upload-placeholder');
    const imagePreview = document.getElementById('image-preview');
    const previewImg = document.getElementById('preview-img');
    const removeImageBtn = document.getElementById('remove-image');
    const cancelBtn = document.getElementById('cancel-btn');
    const openModal = () => {
        plantModal.classList.add('active');
        plantModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    };
    const closeModalHandler = () => {
        plantModal.classList.remove('active');
        plantModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        plantForm.reset();
        imagePreview.style.display = 'none';
        uploadPlaceholder.style.display = 'block';
    };
    if (addPlantBtn) {
        addPlantBtn.addEventListener('click', openModal);
    }
    if (closeModal) {
        closeModal.addEventListener('click', closeModalHandler);
    }
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModalHandler);
    }
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeModalHandler);
    }
    if (fileUpload) {
        uploadPlaceholder.addEventListener('click', () => {
            plantImage.click();
        });
        plantImage.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                handleFileUpload(file);
            }
        });
        fileUpload.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadPlaceholder.style.borderColor = 'var(--primary-color)';
            uploadPlaceholder.style.background = 'rgba(1, 196, 142, 0.05)';
        });
        fileUpload.addEventListener('dragleave', () => {
            uploadPlaceholder.style.borderColor = 'var(--gray-300)';
            uploadPlaceholder.style.background = 'transparent';
        });
        fileUpload.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadPlaceholder.style.borderColor = 'var(--gray-300)';
            uploadPlaceholder.style.background = 'transparent';
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) {
                handleFileUpload(file);
            } else {
            }
        });
        if (removeImageBtn) {
            removeImageBtn.addEventListener('click', () => {
                plantImage.value = '';
                imagePreview.style.display = 'none';
                uploadPlaceholder.style.display = 'block';
            });
        }
    }
    function handleFileUpload(file) {
        if (file.size > 5 * 1024 * 1024) {
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            previewImg.src = e.target.result;
            uploadPlaceholder.style.display = 'none';
            imagePreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
    if (plantForm) {
        plantForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const saveText = document.getElementById('save-text');
            const saveLoader = document.getElementById('save-loader');
            saveText.style.display = 'none';
            saveLoader.style.display = 'inline-block';
            const formData = {
                name: document.getElementById('plant-name').value,
                species: document.getElementById('plant-species').value,
                category: document.getElementById('plant-category').value,
                notes: document.getElementById('plant-notes').value,
                image: plantImage.files[0] || null
            };
            await simulateAddPlant(formData);
            saveText.style.display = 'inline';
            saveLoader.style.display = 'none';
            closeModalHandler();
        });
    }
    function simulateAddPlant(data) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true });
            }, 1500);
        });
    }
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.getAttribute('data-filter');
                filterPlants(filter);
            });
        });
    }
    function filterPlants(filter) {
        const plantCards = document.querySelectorAll('.plant-card:not(.placeholder)');
        let visibleCount = 0;
        plantCards.forEach(card => {
            const status = card.getAttribute('data-status');
            if (filter === 'all' || filter === status) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        if (visibleCount === 0) {
            emptyState.style.display = 'block';
            plantsGrid.style.display = 'none';
        } else {
            emptyState.style.display = 'none';
            plantsGrid.style.display = 'grid';
        }
    }
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const query = e.target.value.toLowerCase();
            searchTimeout = setTimeout(() => {
                const plantCards = document.querySelectorAll('.plant-card:not(.placeholder)');
                let visibleCount = 0;
                plantCards.forEach(card => {
                    const name = card.querySelector('h3').textContent.toLowerCase();
                    const type = card.querySelector('.plant-type').textContent.toLowerCase();
                    if (name.includes(query) || type.includes(query)) {
                        card.style.display = 'block';
                        visibleCount++;
                    } else {
                        card.style.display = 'none';
                    }
                });
                if (visibleCount === 0 && query.length > 0) {
                    emptyState.style.display = 'block';
                    plantsGrid.style.display = 'none';
                } else {
                    emptyState.style.display = 'none';
                    plantsGrid.style.display = 'grid';
                }
            }, 300);
        });
    }
    if (viewBtns.length > 0) {
        viewBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                viewBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const view = btn.getAttribute('data-view');
                if (view === 'list') {
                    plantsGrid.style.gridTemplateColumns = '1fr';
                } else {
                    plantsGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(280px, 1fr))';
                }
            });
        });
    }
    const actionIcons = document.querySelectorAll('.action-icon');
    actionIcons.forEach(icon => {
        icon.addEventListener('click', (e) => {
            e.stopPropagation();
            const title = icon.getAttribute('title');
            const plantName = icon.closest('.plant-card').querySelector('h3').textContent;
            switch (title) {
                case 'Ver detalles':
                    break;
                case 'Diagnosticar':
                    window.location.href = 'diagnostico.html';
                    break;
                case 'Editar':
                    openModal();
                    break;
                case 'Eliminar':
                    if (confirm(`¿Estás seguro de eliminar "${plantName}"?`)) {
                        icon.closest('.plant-card').remove();
                    }
                    break;
            }
        });
    });
    const plantCards = document.querySelectorAll('.plant-card:not(.placeholder)');
    plantCards.forEach(card => {
        card.addEventListener('click', () => {
            const plantName = card.querySelector('h3').textContent;
        });
    });
});