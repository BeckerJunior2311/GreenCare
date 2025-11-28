document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const notificationItems = document.querySelectorAll('.notification-item');
    const markAllReadBtn = document.getElementById('mark-all-read');
    const settingsBtn = document.getElementById('settings-btn');
    const settingsModal = document.getElementById('settings-modal');
    const closeSettings = document.getElementById('close-settings');
    const cancelSettings = document.getElementById('cancel-settings');
    const saveSettings = document.getElementById('save-settings');
    const emptyState = document.getElementById('empty-state');
    const notificationsList = document.querySelector('.notifications-list');
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.getAttribute('data-filter');
                filterNotifications(filter);
            });
        });
    }
    function filterNotifications(filter) {
        let visibleCount = 0;
        notificationItems.forEach(item => {
            const type = item.getAttribute('data-type');
            const isUnread = item.classList.contains('unread');
            let shouldShow = false;
            if (filter === 'all') {
                shouldShow = true;
            } else if (filter === 'unread') {
                shouldShow = isUnread;
            } else {
                shouldShow = type === filter;
            }
            if (shouldShow) {
                item.style.display = 'flex';
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        });
        if (visibleCount === 0) {
            emptyState.style.display = 'block';
            notificationsList.style.display = 'none';
        } else {
            emptyState.style.display = 'none';
            notificationsList.style.display = 'flex';
        }
    }
    if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', () => {
            const unreadItems = document.querySelectorAll('.notification-item.unread');
            unreadItems.forEach(item => {
                item.classList.remove('unread');
                item.classList.add('read');
            });
            const badge = document.querySelector('.notification-badge');
            if (badge) {
                badge.textContent = '0';
                badge.style.display = 'none';
            }
            updateFilterCounts();
        });
    }
    const actionButtons = document.querySelectorAll('.notification-actions .btn-icon');
    actionButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const title = btn.getAttribute('title');
            const notificationItem = btn.closest('.notification-item');
            const notificationTitle = notificationItem.querySelector('h4').textContent;
            if (title === 'Marcar como leída') {
                notificationItem.classList.remove('unread');
                notificationItem.classList.add('read');
                updateFilterCounts();
            } else if (title === 'Eliminar') {
                if (confirm(`¿Eliminar notificación "${notificationTitle}"?`)) {
                    notificationItem.remove();
                    updateFilterCounts();
                    checkIfEmpty();
                }
            } else if (title.includes('Ver')) {
            } else if (title === 'Completar tarea') {
                notificationItem.classList.remove('unread');
                notificationItem.classList.add('read');
            }
        });
    });
    notificationItems.forEach(item => {
        item.addEventListener('click', () => {
            if (item.classList.contains('unread')) {
                item.classList.remove('unread');
                item.classList.add('read');
                updateFilterCounts();
            }
        });
    });
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            settingsModal.classList.add('active');
            settingsModal.style.display = 'flex';
        });
    }
    const closeModalHandler = () => {
        settingsModal.classList.remove('active');
        settingsModal.style.display = 'none';
    };
    if (closeSettings) {
        closeSettings.addEventListener('click', closeModalHandler);
    }
    if (cancelSettings) {
        cancelSettings.addEventListener('click', closeModalHandler);
    }
    if (saveSettings) {
        saveSettings.addEventListener('click', () => {
            closeModalHandler();
        });
    }
    settingsModal?.addEventListener('click', (e) => {
        if (e.target === settingsModal || e.target.classList.contains('modal-overlay')) {
            closeModalHandler();
        }
    });
    function updateFilterCounts() {
        const allCount = document.querySelectorAll('.notification-item').length;
        const unreadCount = document.querySelectorAll('.notification-item.unread').length;
        const alertsCount = document.querySelectorAll('.notification-item[data-type="alerts"]').length;
        const remindersCount = document.querySelectorAll('.notification-item[data-type="reminders"]').length;
        const updatesCount = document.querySelectorAll('.notification-item[data-type="updates"]').length;
        filterBtns.forEach(btn => {
            const filter = btn.getAttribute('data-filter');
            const countSpan = btn.querySelector('.count');
            if (countSpan) {
                switch (filter) {
                    case 'all':
                        countSpan.textContent = allCount;
                        break;
                    case 'unread':
                        countSpan.textContent = unreadCount;
                        break;
                    case 'alerts':
                        countSpan.textContent = alertsCount;
                        break;
                    case 'reminders':
                        countSpan.textContent = remindersCount;
                        break;
                    case 'updates':
                        countSpan.textContent = updatesCount;
                        break;
                }
            }
        });
    }
    function checkIfEmpty() {
        const remainingItems = document.querySelectorAll('.notification-item').length;
        if (remainingItems === 0) {
            emptyState.style.display = 'block';
            notificationsList.style.display = 'none';
        }
    }
});