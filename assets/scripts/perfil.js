document.addEventListener('DOMContentLoaded', () => {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab') + '-tab';
            document.getElementById(tabId).classList.add('active');
        });
    });
    const personalForm = document.getElementById('personal-form');
    if (personalForm) {
        personalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            modal.success('Información personal actualizada correctamente');
        });
    }
    const passwordForm = document.getElementById('password-form');
    if (passwordForm) {
        passwordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            modal.success('Contraseña actualizada correctamente');
        });
    }
    const changePhotoBtn = document.querySelector('.btn-change-photo');
    if (changePhotoBtn) {
        changePhotoBtn.addEventListener('click', () => {
            modal.info('Selector de foto próximamente');
        });
    }
    const toggles = document.querySelectorAll('.switch input');
    toggles.forEach(toggle => {
        toggle.addEventListener('change', (e) => {
            const preference = e.target.closest('.preference-item').querySelector('h4').textContent;
            const status = e.target.checked ? 'activada' : 'desactivada';
        });
    });
    const selects = document.querySelectorAll('.preference-select');
    selects.forEach(select => {
        select.addEventListener('change', (e) => {
            const preference = e.target.closest('.preference-item').querySelector('h4').textContent;
        });
    });
    const closeSessions = document.querySelectorAll('.btn-text-danger');
    closeSessions.forEach(btn => {
        btn.addEventListener('click', async () => {
            const confirmed = await modal.confirm({
                title: '¿Cerrar sesión?',
                message: '¿Estás seguro de que quieres cerrar sesión en este dispositivo?',
                icon: '🔒',
                type: 'warning',
                confirmText: 'Cerrar sesión',
                cancelText: 'Cancelar'
            });
            if (confirmed) {
                modal.success('Sesión cerrada en el dispositivo');
            }
        });
    });
    const downloadDataBtn = document.querySelector('.danger-actions .btn-secondary');
    if (downloadDataBtn) {
        downloadDataBtn.addEventListener('click', () => {
            modal.info('Preparando descarga de datos...');
        });
    }
    const deleteAccountBtn = document.querySelector('.btn-danger');
    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener('click', async () => {
            const confirmed = await modal.confirm({
                title: '¿Eliminar cuenta?',
                message: 'Esta acción es IRREVERSIBLE y se eliminarán:',
                icon: '⚠️',
                type: 'danger',
                list: [
                    'Todas tus plantas',
                    'Todo tu historial',
                    'Todos tus diagnósticos'
                ],
                confirmText: 'Eliminar cuenta',
                cancelText: 'Cancelar'
            });
            if (confirmed) {
                const doubleConfirm = await modal.confirm({
                    title: 'ÚLTIMA ADVERTENCIA',
                    message: '¿Realmente quieres eliminar tu cuenta para siempre?',
                    icon: '🚨',
                    type: 'danger',
                    confirmText: 'Sí, eliminar',
                    cancelText: 'No, conservar'
                });
                if (doubleConfirm) {
                    modal.info('Funcionalidad de eliminación deshabilitada para protección de datos');
                }
            }
        });
    }
});