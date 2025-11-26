// Comunidad Functionality
document.addEventListener('DOMContentLoaded', () => {
    // ===== ELEMENTS =====
    const categoryBtns = document.querySelectorAll('.category-btn');
    const postCards = document.querySelectorAll('.post-card');
    const newPostBtn = document.getElementById('new-post-btn');
    const newPostModal = document.getElementById('new-post-modal');
    const closePostModal = document.getElementById('close-post-modal');
    const cancelPost = document.getElementById('cancel-post');
    const newPostForm = document.getElementById('new-post-form');
    // ===== CATEGORY FILTER =====
    if (categoryBtns.length > 0) {
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active state
                categoryBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                // Get category
                const category = btn.getAttribute('data-category');
                filterPosts(category);
            });
        });
    }
    function filterPosts(category) {
        postCards.forEach(post => {
            const postCategory = post.getAttribute('data-category');
            if (category === 'all' || postCategory === category) {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }
        });
    }
    // ===== POST INTERACTION =====
    const statBtns = document.querySelectorAll('.stat-btn');
    statBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const actionText = btn.textContent.trim();
            if (actionText.includes('👍')) {
                // Like button
                const countSpan = btn.querySelector('span:last-child');
                const currentCount = parseInt(countSpan.textContent);
                countSpan.textContent = currentCount + 1;
                btn.style.color = 'var(--primary-color)';
            } else if (actionText.includes('💬')) {
                // Comment button
                alert('Funcionalidad de comentarios próximamente disponible');
            } else if (actionText.includes('Guardar')) {
                // Save button
                btn.innerHTML = '<span>✅</span><span>Guardado</span>';
                btn.style.color = 'var(--success-color)';
            } else if (actionText.includes('Compartir')) {
                // Share button
                alert('📤 Compartir en redes sociales (próximamente)');
            }
        });
    });
    // ===== NEW POST MODAL =====
    if (newPostBtn) {
        newPostBtn.addEventListener('click', () => {
            newPostModal.classList.add('active');
            newPostModal.style.display = 'flex';
        });
    }
    const closeModalHandler = () => {
        newPostModal.classList.remove('active');
        newPostModal.style.display = 'none';
        newPostForm?.reset();
    };
    if (closePostModal) {
        closePostModal.addEventListener('click', closeModalHandler);
    }
    if (cancelPost) {
        cancelPost.addEventListener('click', closeModalHandler);
    }
    // Close on overlay click
    newPostModal?.addEventListener('click', (e) => {
        if (e.target === newPostModal || e.target.classList.contains('modal-overlay')) {
            closeModalHandler();
        }
    });
    // ===== NEW POST FORM SUBMIT =====
    if (newPostForm) {
        newPostForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('✅ ¡Publicación creada exitosamente!\n\n(Funcionalidad completa próximamente)');
            closeModalHandler();
        });
    }
    // ===== POST CARD CLICK =====
    postCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't trigger if clicking on buttons
            if (e.target.closest('.stat-btn')) return;
            const title = card.querySelector('h3').textContent;
            alert(`Abriendo publicación completa:\n"${title}"\n\n(Vista detallada próximamente)`);
        });
    });
    // ===== TRENDING TAGS =====
    const trendingItems = document.querySelectorAll('.trending-item');
    trendingItems.forEach(item => {
        item.addEventListener('click', () => {
            const tag = item.querySelector('.tag').textContent;
            alert(`Buscando publicaciones con ${tag}\n\n(Funcionalidad próximamente)`);
        });
    });
    console.log('✅ Comunidad initialized');
});
