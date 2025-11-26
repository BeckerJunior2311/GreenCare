// Dashboard Functionality
document.addEventListener('DOMContentLoaded', () => {
    // ===== SIDEBAR TOGGLE =====
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024) {
            if (!sidebar.contains(e.target) && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
            }
        }
    });
    // ===== NAVIGATION HIGHLIGHTING =====
    const navItems = document.querySelectorAll('.nav-item');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    // Remove active class from all nav items
    const clearActiveStates = () => {
        navItems.forEach(item => item.classList.remove('active'));
        mobileNavItems.forEach(item => item.classList.remove('active'));
    };
    // Add click handlers to nav items - SIMPLIFIED VERSION
    // Just close mobile sidebar, let links work naturally
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Close mobile sidebar when clicking any nav item
            if (window.innerWidth <= 1024) {
                sidebar.classList.remove('active');
            }
        });
    });
    // Mobile nav items - also simplified
    mobileNavItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Just close sidebar if needed, let navigation work
            if (window.innerWidth <= 1024) {
                sidebar.classList.remove('active');
            }
        });
    });
    // ===== ADD PLANT BUTTON =====
    const addPlantBtn = document.getElementById('add-plant-btn');
    if (addPlantBtn) {
        addPlantBtn.addEventListener('click', () => {
            alert('Funcionalidad de agregar planta próximamente disponible');
            // Here you would open a modal or navigate to add plant page
        });
    }
    // ===== SEARCH FUNCTIONALITY =====
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const query = e.target.value;
            if (query.length >= 3) {
                searchTimeout = setTimeout(() => {
                    console.log(`Searching for: ${query}`);
                    // Here you would perform actual search
                }, 500);
            }
        });
    }
    // ===== USER PROFILE DROPDOWN ===== 
    const userProfile = document.querySelector('.user-profile');
    if (userProfile) {
        userProfile.addEventListener('click', () => {
            alert('Menú de perfil próximamente disponible');
            // Here you would show a dropdown menu
        });
    }
    // ===== DIAGNOSTIC ITEMS CLICK =====
    const diagnosticItems = document.querySelectorAll('.diagnostic-item');
    diagnosticItems.forEach(item => {
        item.addEventListener('click', () => {
            const plantName = item.querySelector('h4').textContent;
            console.log(`Viewing details for: ${plantName}`);
            alert(`Abriendo detalles de: ${plantName}`);
            // Here you would navigate to plant details page
        });
    });
    // ===== ALERT ITEMS CLICK =====
    const alertItems = document.querySelectorAll('.alert-item');
    alertItems.forEach(item => {
        item.addEventListener('click', () => {
            const alertTitle = item.querySelector('h4').textContent;
            console.log(`Alert clicked: ${alertTitle}`);
            alert(`Procesando alerta: ${alertTitle}`);
            // Here you would handle the alert action
        });
    });
    // ===== QUICK ACTIONS =====
    // Quick actions have onclick in HTML that already navigate
    // No need for additional handlers
    // ===== CARD ACTIONS =====
    const cardActions = document.querySelectorAll('.card-action');
    cardActions.forEach(action => {
        action.addEventListener('click', (e) => {
            // Let links navigate normally
            const actionText = action.textContent;
            console.log(`Card action: ${actionText}`);
        });
    });
    // ===== TIP CARD BUTTON =====
    const tipButton = document.querySelector('.tip-card .btn-secondary');
    if (tipButton) {
        tipButton.addEventListener('click', () => {
            console.log('Loading more tips...');
        });
    }
    // ===== DYNAMIC GREETING =====
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
    // ===== RESPONSIVE HANDLING =====
    const handleResize = () => {
        const width = window.innerWidth;
        if (width > 1024) {
            sidebar.classList.remove('active');
        }
    };
    window.addEventListener('resize', handleResize);
    // ===== ANIMATIONS ON SCROLL =====
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
    // Observe all cards
    const cards = document.querySelectorAll('.card, .stat-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
    // ===== NOTIFICATION COUNT UPDATE =====
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
    // Example: Update notification count
    // updateNotificationCount(3);
    // ===== SIMULATE REAL-TIME UPDATES =====
    // This would be replaced with actual WebSocket or polling
    const simulateRealTimeUpdates = () => {
        setInterval(() => {
            // Simulate receiving a new notification
            const currentCount = parseInt(document.querySelector('.notification-badge')?.textContent || '0');
            // You would update based on actual data
        }, 30000); // Check every 30 seconds
    };
    // Uncomment to enable simulated updates
    // simulateRealTimeUpdates();
    console.log('✅ GreenCare Dashboard initialized successfully');
});
