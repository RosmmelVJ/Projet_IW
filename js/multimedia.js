// ============================================
// SECCIÓN MULTIMEDIA - SWIPER CARRUSEL
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const multimediaSection = document.getElementById('multimedia');
    const multimediaHeader = document.querySelector('.multimedia-header');
    const multimediaSwiper = document.querySelector('.ironweldSwiper');
    
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

    if (multimediaSwiper && window.Swiper) {
        new Swiper('.ironweldSwiper', {
            loop: true,
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            loopedSlides: 7,
            spaceBetween: 20,
            speed: 600,
            effect: 'slide',
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                    centeredSlides: true
                },
                480: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                    centeredSlides: true
                },
                768: {
                    slidesPerView: 2.5,
                    spaceBetween: 18
                },
                992: {
                    slidesPerView: 3.5,
                    spaceBetween: 20
                },
                1200: {
                    slidesPerView: 'auto',
                    spaceBetween: 20
                }
            }
        });
    }
});
