document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024) {
            if (!sidebar.contains(e.target) && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
            }
        }
    });
    const navItems = document.querySelectorAll('.nav-item');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    const clearActiveStates = () => {
        navItems.forEach(item => item.classList.remove('active'));
        mobileNavItems.forEach(item => item.classList.remove('active'));
    };
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            if (window.innerWidth <= 1024) {
                sidebar.classList.remove('active');
            }
        });
    });
    mobileNavItems.forEach(item => {
        item.addEventListener('click', (e) => {
            if (window.innerWidth <= 1024) {
                sidebar.classList.remove('active');
            }
        });
    });
    const addPlantBtn = document.getElementById('add-plant-btn');
    if (addPlantBtn) {
        addPlantBtn.addEventListener('click', () => {
        });
    }
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const query = e.target.value;
            if (query.length >= 3) {
                searchTimeout = setTimeout(() => {
                }, 500);
            }
        });
    }
    const userProfile = document.querySelector('.user-profile');
    if (userProfile) {
        userProfile.addEventListener('click', () => {
        });
    }
    const diagnosticItems = document.querySelectorAll('.diagnostic-item');
    diagnosticItems.forEach(item => {
        item.addEventListener('click', () => {
            const plantName = item.querySelector('h4').textContent;
        });
    });
    const alertItems = document.querySelectorAll('.alert-item');
    alertItems.forEach(item => {
        item.addEventListener('click', () => {
            const alertTitle = item.querySelector('h4').textContent;
        });
    });
    const cardActions = document.querySelectorAll('.card-action');
    cardActions.forEach(action => {
        action.addEventListener('click', (e) => {
            const actionText = action.textContent;
        });
    });
    const tipButton = document.querySelector('.tip-card .btn-secondary');
    if (tipButton) {
        tipButton.addEventListener('click', () => {
        });
    }
    const updateGreeting = () => {
        const hour = new Date().getHours();
        const subtitle = document.querySelector('.page-subtitle');
        if (subtitle) {
            let greeting;
            if (hour < 12) {
                greeting = 'Buenos días, Usuario';
            } else if (hour < 19) {
                greeting = 'Buenas tardes, Usuario';
            } else {
                greeting = 'Buenas noches, Usuario';
            }
            subtitle.textContent = greeting;
        }
    };
    updateGreeting();
    const handleResize = () => {
        const width = window.innerWidth;
        if (width > 1024) {
            sidebar.classList.remove('active');
        }
    };
    window.addEventListener('resize', handleResize);
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    const cards = document.querySelectorAll('.card, .stat-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
    const updateNotificationCount = (count) => {
        const badge = document.querySelector('.notification-badge');
        if (badge) {
            if (count > 0) {
                badge.textContent = count > 99 ? '99+' : count;
                badge.style.display = 'block';
            } else {
                badge.style.display = 'none';
            }
        }
    };
    const simulateRealTimeUpdates = () => {
        setInterval(() => {
            const currentCount = parseInt(document.querySelector('.notification-badge')?.textContent || '0');
        }, 30000);
    };
});