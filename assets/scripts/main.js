document.addEventListener('DOMContentLoaded', () => {
    // Header Login/Register Navigation
    const headerLogin = document.querySelector('.header_login');
    const headerSignup = document.querySelector('.header_signup');

    if (headerLogin) {
        headerLogin.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'Login.html';
        });
    }

    if (headerSignup) {
        headerSignup.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'Register.html';
        });
    }

    // Hero Download Button - Enhanced with animation feedback
    const heroDownloadBtn = document.querySelector('.hero_download');

    if (heroDownloadBtn) {
        heroDownloadBtn.addEventListener('click', () => {
            // Add a click animation effect
            heroDownloadBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                heroDownloadBtn.style.transform = '';
            }, 150);

            // You can add functionality here for download/redirect
            // For now, it just provides visual feedback
            console.log('Download button clicked');

            // Optional: Open a modal or redirect to download page
            // window.location.href = 'download.html';
        });

        // Enhanced hover effect with smooth transitions
        heroDownloadBtn.addEventListener('mouseenter', () => {
            heroDownloadBtn.style.transition = 'all 0.3s ease';
        });
    }

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav a, .footer_column a');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Only apply smooth scroll for anchor links (starting with #)
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});