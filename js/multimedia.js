// ============================================
// SECCIÓN MULTIMEDIA - SWIPER CARRUSEL
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const multimediaSection = document.getElementById('multimedia');
    const multimediaHeader = document.querySelector('.multimedia-header');
    
    if (!multimediaSection || !multimediaHeader) {
        return;
    }

    // Función para activar las animaciones del header
    function activateAnimations() {
        multimediaHeader.classList.add('animate');
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
    if (isElementInViewport(multimediaSection)) {
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

    observer.observe(multimediaSection);

    // Inicializar Swiper - Triple Slider (UI Initiative Style)
    const multimediaSwiper = new Swiper('.multimedia-swiper', {
        // Triple Slider: mostrar 3 slides con el central destacado
        slidesPerView: 'auto', // Usar 'auto' para mejor control del tamaño
        spaceBetween: 40,
        centeredSlides: true,
        
        // Bucle infinito
        loop: true,
        loopAdditionalSlides: 2,
        loopedSlides: 3,
        
        // Efecto de transición suave
        effect: 'slide',
        speed: 800,
        
        // Transiciones más suaves
        grabCursor: true,
        
        // Mejorar el rendimiento
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        
        // Navegación
        navigation: {
            nextEl: '.multimedia-swiper-next',
            prevEl: '.multimedia-swiper-prev',
        },
        
        // Breakpoints responsive
        breakpoints: {
            // Desktop - Triple Slider
            1024: {
                slidesPerView: 'auto',
                spaceBetween: 40,
                centeredSlides: true,
            },
            // Tablet - Double Slider
            768: {
                slidesPerView: 'auto',
                spaceBetween: 30,
                centeredSlides: true,
            },
            // Móvil - Single Slider
            320: {
                slidesPerView: 1,
                spaceBetween: 20,
                centeredSlides: true,
            }
        }
    });
});
