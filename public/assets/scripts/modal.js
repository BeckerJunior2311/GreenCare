class ModalSystem {
    constructor() {
        this.createToastContainer();
    }
    createToastContainer() {
        if (!document.querySelector('.toast-container')) {
            const container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
    }
    confirm(options) {
        return new Promise((resolve) => {
            const modal = document.createElement('div');
            modal.className = 'custom-modal active';
            const iconClass = options.type === 'danger' ? 'danger' : options.type === 'warning' ? 'warning' : 'success';
            const icon = options.icon || '⚠️';
            let listHTML = '';
            if (options.list && options.list.length > 0) {
                listHTML = `
                    <ul class="custom-modal-list">
                        ${options.list.map(item => `<li>• ${item}</li>`).join('')}
                    </ul>
                `;
            }
            modal.innerHTML = `
                <div class="custom-modal-overlay"></div>
                <div class="custom-modal-content">
                    <div class="custom-modal-icon ${iconClass}">${icon}</div>
                    <h3>${options.title}</h3>
                    <p>${options.message}</p>
                    ${listHTML}
                    <div class="custom-modal-actions">
                        <button class="custom-modal-btn btn-cancel">${options.cancelText || 'Cancelar'}</button>
                        <button class="custom-modal-btn ${options.type === 'danger' ? 'btn-danger' : 'btn-confirm'}">
                            ${options.confirmText || 'Aceptar'}
                        </button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
            const confirmBtn = modal.querySelector('.btn-confirm, .btn-danger');
            const cancelBtn = modal.querySelector('.btn-cancel');
            const overlay = modal.querySelector('.custom-modal-overlay');
            const close = (result) => {
                modal.classList.remove('active');
                setTimeout(() => modal.remove(), 300);
                resolve(result);
            };
            confirmBtn.addEventListener('click', () => close(true));
            cancelBtn.addEventListener('click', () => close(false));
            overlay.addEventListener('click', () => close(false));
        });
    }
    toast(message, type = 'success') {
        const container = document.querySelector('.toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        const icons = {
            success: '✅',
            error: '❌',
            info: 'ℹ️',
            warning: '⚠️'
        };
        toast.innerHTML = `
            <span class="toast-icon">${icons[type]}</span>
            <span class="toast-message">${message}</span>
            <button class="toast-close">×</button>
        `;
        container.appendChild(toast);
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => this.closeToast(toast));
        setTimeout(() => this.closeToast(toast), 3000);
    }
    closeToast(toast) {
        toast.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }
    success(message) {
        this.toast(message, 'success');
    }
    error(message) {
        this.toast(message, 'error');
    }
    info(message) {
        this.toast(message, 'info');
    }
}
window.modal = new ModalSystem();