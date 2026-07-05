document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    // 鼠标光圈效果
    const mouseGlow = document.createElement('div');
    mouseGlow.className = 'mouse-glow';
    document.body.appendChild(mouseGlow);

    let glowX = 0;
    let glowY = 0;
    let targetX = 0;
    let targetY = 0;

    function updateGlow() {
        glowX += (targetX - glowX) * 0.5;
        glowY += (targetY - glowY) * 0.5;
        
        mouseGlow.style.left = `${glowX}px`;
        mouseGlow.style.top = `${glowY}px`;
        
        requestAnimationFrame(updateGlow);
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

    // 滚动渐入动画
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

    const animatedElements = document.querySelectorAll('.group, .bg-white.p-8');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // 数字滚动动画
    const numbers = document.querySelectorAll('.text-4xl, .text-5xl');
    const numberObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const text = el.textContent;
                const hasPercent = text.includes('%');
                const hasTimes = text.includes('倍');
                const num = parseInt(text);
                
                if (!isNaN(num)) {
                    let current = 0;
                    const increment = num / 30;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= num) {
                            current = num;
                            clearInterval(timer);
                        }
                        el.textContent = Math.floor(current) + (hasPercent ? '%' : '') + (hasTimes ? '倍' : '');
                    }, 30);
                }
                numberObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    numbers.forEach(num => numberObserver.observe(num));
});