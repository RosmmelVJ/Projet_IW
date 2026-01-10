// ============================================
// SECCIÓN NOSOTROS - JAVASCRIPT INDEPENDIENTE
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const nosotrosSection = document.getElementById('nosotros');
    const nosotrosHeader = document.querySelector('.nosotros-header');
    const nosotrosText = document.querySelector('.nosotros-text');
    const nosotrosImage = document.querySelector('.nosotros-image-wrapper');
    const nosotrosFooter = document.querySelector('.nosotros-footer');
    
    if (!nosotrosSection || !nosotrosHeader || !nosotrosText) {
        return;
    }

    // Función para activar las animaciones
    function activateAnimations() {
        nosotrosHeader.classList.add('animate');
        nosotrosText.classList.add('animate');
        if (nosotrosImage) {
            nosotrosImage.classList.add('animate');
        }
        if (nosotrosFooter) {
            setTimeout(() => {
                nosotrosFooter.style.opacity = '1';
                nosotrosFooter.style.transform = 'translateY(0)';
            }, 600);
        }
    }

    // Función para verificar si la sección está visible
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        return (
            rect.top <= windowHeight * 0.75 &&
            rect.bottom >= windowHeight * 0.25
        );
    }

    // Verificar al hacer scroll
    function handleScroll() {
        if (isElementInViewport(nosotrosSection)) {
            activateAnimations();
            // Remover el listener después de activar las animaciones
            window.removeEventListener('scroll', handleScroll);
        }
    }

    // Verificar al cargar la página (por si ya está visible)
    if (isElementInViewport(nosotrosSection)) {
        activateAnimations();
    } else {
        window.addEventListener('scroll', handleScroll);
    }

    // Manejar clic en el enlace de navegación
    const nosotrosLink = document.querySelector('a[href="#nosotros"]');
    if (nosotrosLink) {
        nosotrosLink.addEventListener('click', function(e) {
            // Pequeño delay para asegurar que el scroll termine antes de animar
            setTimeout(() => {
                if (isElementInViewport(nosotrosSection)) {
                    activateAnimations();
                }
            }, 500);
        });
    }

    // Usar Intersection Observer para mejor rendimiento
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                activateAnimations();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    observer.observe(nosotrosSection);
});

