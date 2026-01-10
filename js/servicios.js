// ============================================
// SECCIÓN SERVICIOS - JAVASCRIPT INDEPENDIENTE
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const serviciosSection = document.getElementById('servicios');
    const serviciosHeader = document.querySelector('.servicios-header');
    const serviciosGrid = document.querySelector('.servicios-grid');
    const serviciosFooter = document.querySelector('.servicios-footer');
    
    if (!serviciosSection || !serviciosHeader || !serviciosGrid || !serviciosFooter) {
        return;
    }

    // Función para activar las animaciones
    function activateAnimations() {
        serviciosHeader.classList.add('animate');
        serviciosGrid.classList.add('animate');
        setTimeout(() => {
            serviciosFooter.classList.add('animate');
        }, 600);
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
        if (isElementInViewport(serviciosSection)) {
            activateAnimations();
            window.removeEventListener('scroll', handleScroll);
        }
    }

    // Verificar al cargar la página
    if (isElementInViewport(serviciosSection)) {
        activateAnimations();
    } else {
        window.addEventListener('scroll', handleScroll);
    }

    // Manejar clic en el enlace de navegación
    const serviciosLink = document.querySelector('a[href="#servicios"]');
    if (serviciosLink) {
        serviciosLink.addEventListener('click', function(e) {
            setTimeout(() => {
                if (isElementInViewport(serviciosSection)) {
                    activateAnimations();
                }
            }, 500);
        });
    }

    // Usar Intersection Observer para mejor rendimiento
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                activateAnimations();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    observer.observe(serviciosSection);
});





