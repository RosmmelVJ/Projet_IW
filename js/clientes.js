// ============================================
// SECCIÓN CLIENTES - ANIMACIONES (SIN SWIPER)
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const clientesSection = document.getElementById('clientes');
    const clientesHeader = document.querySelector('.clientes-header');
    
    if (!clientesSection || !clientesHeader) {
        return;
    }

    // Función para activar las animaciones del header
    function activateAnimations() {
        clientesHeader.classList.add('animate');
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

    // Verificar al cargar la página
    if (isElementInViewport(clientesSection)) {
        activateAnimations();
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

    observer.observe(clientesSection);
});
