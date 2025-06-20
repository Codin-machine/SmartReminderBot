document.addEventListener('DOMContentLoaded', () => {
    // 1. Инициализация плавной прокрутки
    initSmoothScroll();
    
    // 2. Инициализация отслеживания секций для активной ссылки в навбаре
    initNavbarScroll();
    
    // 3. Инициализация анимации появления элементов
    initAnimations();
});

function initSmoothScroll() {
    // Используем библиотеку Lenis для плавной прокрутки
    const lenis = new Lenis({
        lerp: 0.08, // Коэффициент плавности (меньше = более плавно)
        wheelMultiplier: 0.9, // Чувствительность колеса мыши
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    
    // Интеграция с якорными ссылками
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            lenis.scrollTo(this.getAttribute('href'));
        });
    });
}

function initNavbarScroll() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    const sections = document.querySelectorAll('section[id]');
    const headerOffset = 150;

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const fromTop = window.scrollY + headerOffset;
        
        sections.forEach(section => {
            if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
                currentSectionId = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });
}

function initAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    if (!animatedElements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Не убираем observer, чтобы анимация могла повторяться, если нужно
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}