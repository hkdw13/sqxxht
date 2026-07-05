document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    const welcomePopup = document.getElementById('welcomePopup');
    const popupCloseBtn = document.getElementById('popupCloseBtn');
    
    setTimeout(() => {
        welcomePopup.classList.add('active');
    }, 300);

    popupCloseBtn.addEventListener('click', () => {
        welcomePopup.classList.remove('active');
    });

    welcomePopup.addEventListener('click', (e) => {
        if (e.target === welcomePopup) {
            welcomePopup.classList.remove('active');
        }
    });

    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    const subscribeForm = document.querySelector('input[type="email"]');
    const subscribeBtn = subscribeForm?.nextElementSibling;
    
    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', () => {
            const email = subscribeForm.value;
            if (email && isValidEmail(email)) {
                showNotification('订阅成功！感谢您的关注');
                subscribeForm.value = '';
            } else {
                showNotification('请输入有效的邮箱地址', true);
            }
        });
    }

    subscribeForm?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            subscribeBtn.click();
        }
    });

    const heroButtons = document.querySelectorAll('section:first-of-type button');
    heroButtons[1]?.addEventListener('click', () => {
        document.getElementById('values').scrollIntoView({ behavior: 'smooth' });
    });

    const newsCards = document.querySelectorAll('.news-card');
    newsCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.comment-toggle') || e.target.closest('.comments-section')) {
                return;
            }
            const title = card.querySelector('h3').textContent;
            showNotification(`即将打开：${title}`);
        });
    });

    const commentToggles = document.querySelectorAll('.comment-toggle');
    commentToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const targetId = toggle.getAttribute('data-target');
            const commentsSection = document.getElementById(targetId);
            if (commentsSection) {
                commentsSection.classList.toggle('hidden');
                lucide.createIcons();
            }
        });
    });

    const commentSendButtons = document.querySelectorAll('.comment-input button');
    commentSendButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const input = button.previousElementSibling;
            const text = input.value.trim();
            if (text) {
                const commentsContainer = button.closest('.comments-section').querySelector('.space-y-4');
                const newComment = document.createElement('div');
                newComment.className = 'comment-item flex gap-3';
                newComment.innerHTML = `
                    <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                        <i data-lucide="user" class="w-4 h-4 text-gray-500"></i>
                    </div>
                    <div class="flex-1">
                        <div class="flex items-center gap-2 mb-1">
                            <span class="text-sm font-semibold text-gray-800">我</span>
                            <span class="text-xs text-gray-400">刚刚</span>
                        </div>
                        <p class="text-sm text-gray-600">${text}</p>
                    </div>
                `;
                const commentInput = button.closest('.comment-input');
                commentsContainer.insertBefore(newComment, commentInput);
                input.value = '';
                lucide.createIcons();
                showNotification('评论发布成功！');
            }
        });
    });

    const commentInputs = document.querySelectorAll('.comment-input input');
    commentInputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.stopPropagation();
                const button = input.nextElementSibling;
                button.click();
            }
        });
        
        input.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });

    const likeButtons = document.querySelectorAll('.like-btn');
    likeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const isLiked = button.getAttribute('data-liked') === 'true';
            const likeCountEl = button.querySelector('.like-count');
            let likes = parseInt(button.getAttribute('data-likes'));
            
            if (isLiked) {
                likes--;
                button.setAttribute('data-liked', 'false');
                button.classList.remove('liked');
            } else {
                likes++;
                button.setAttribute('data-liked', 'true');
                button.classList.add('liked');
            }
            
            button.setAttribute('data-likes', likes);
            likeCountEl.textContent = likes;
            lucide.createIcons();
        });
    });

    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showNotification(message, isError = false) {
        const notification = document.createElement('div');
        notification.className = `fixed top-20 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl shadow-lg z-[100] transition-all duration-300 ${
            isError ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
        }`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translate(-50%, -20px)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    let lastScrollY = window.scrollY;
    const nav = document.querySelector('nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        lastScrollY = window.scrollY;
    });

    nav.style.transition = 'transform 0.3s ease';

    const mouseGlow = document.createElement('div');
    mouseGlow.className = 'mouse-glow';
    document.body.appendChild(mouseGlow);

    let glowX = 0;
    let glowY = 0;
    let targetX = 0;
    let targetY = 0;
    let animationFrameId;

    function updateGlow() {
        glowX += (targetX - glowX) * 0.5;
        glowY += (targetY - glowY) * 0.5;
        
        mouseGlow.style.left = `${glowX}px`;
        mouseGlow.style.top = `${glowY}px`;
        
        animationFrameId = requestAnimationFrame(updateGlow);
    }

    updateGlow();

    document.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
        mouseGlow.classList.add('visible');
    });

    document.addEventListener('mouseleave', () => {
        mouseGlow.classList.remove('visible');
    });
});