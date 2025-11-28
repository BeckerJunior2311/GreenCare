document.addEventListener('DOMContentLoaded', () => {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const postCards = document.querySelectorAll('.post-card');
    const newPostBtn = document.getElementById('new-post-btn');
    const newPostModal = document.getElementById('new-post-modal');
    const closePostModal = document.getElementById('close-post-modal');
    const cancelPost = document.getElementById('cancel-post');
    const newPostForm = document.getElementById('new-post-form');
    if (categoryBtns.length > 0) {
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                categoryBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
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
    const statBtns = document.querySelectorAll('.stat-btn');
    statBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const actionText = btn.textContent.trim();
            if (actionText.includes('👍')) {
                const countSpan = btn.querySelector('span:last-child');
                const currentCount = parseInt(countSpan.textContent);
                countSpan.textContent = currentCount + 1;
                btn.style.color = 'var(--primary-color)';
            } else if (actionText.includes('💬')) {
            } else if (actionText.includes('Guardar')) {
                btn.innerHTML = '<span>✅</span><span>Guardado</span>';
                btn.style.color = 'var(--success-color)';
            } else if (actionText.includes('Compartir')) {
            }
        });
    });
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
    newPostModal?.addEventListener('click', (e) => {
        if (e.target === newPostModal || e.target.classList.contains('modal-overlay')) {
            closeModalHandler();
        }
    });
    if (newPostForm) {
        newPostForm.addEventListener('submit', (e) => {
            e.preventDefault();
            closeModalHandler();
        });
    }
    postCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.stat-btn')) return;
            const title = card.querySelector('h3').textContent;
        });
    });
    const trendingItems = document.querySelectorAll('.trending-item');
    trendingItems.forEach(item => {
        item.addEventListener('click', () => {
            const tag = item.querySelector('.tag').textContent;
        });
    });
});