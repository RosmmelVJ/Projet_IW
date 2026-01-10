// ============================================
// MENÚ HAMBURGUESA Y NAVEGACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const overlay = document.getElementById('overlay');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;

    // Toggle del menú hamburguesa
    hamburger.addEventListener('click', function() {
        const isActive = hamburger.classList.contains('active');
        
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', !isActive);
        
        // Prevenir scroll cuando el menú está abierto
        if (!isActive) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    });

    // Cerrar menú al hacer clic en el overlay
    overlay.addEventListener('click', function() {
        closeMenu();
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            closeMenu();
            
            // Smooth scroll a la sección
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const header = document.querySelector('.header');
                    const headerHeight = header ? header.offsetHeight : 0;
                    let targetPosition;
                    
                    // Si es la sección inicio (carrusel), ir exactamente al inicio de la página
                    if (targetId === '#inicio') {
                        targetPosition = 0;
                    } else {
                        // Verificar si estamos en móvil o tablet
                        const isMobileOrTablet = window.innerWidth <= 992;
                        const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
                        
                        // Usar offsetTop directamente
                        targetPosition = targetSection.offsetTop;
                        
                        // En móvil/tablet, cuando navegas desde inicio (scroll ≤ 100), 
                        // asegurar que la posición sea suficiente para ocultar completamente el carrusel
                        if (isMobileOrTablet && currentScrollY <= 100) {
                            const inicioSection = document.querySelector('#inicio');
                            if (inicioSection) {
                                const inicioHeight = inicioSection.offsetHeight;
                                // Calcular la posición mínima: altura de inicio - header
                                // Esto asegura que no se muestre parte del carrusel
                                const minSafePosition = inicioHeight - headerHeight;
                                
                                // Solo ajustar si la posición calculada es menor que la altura de inicio
                                if (targetPosition < inicioHeight) {
                                    // Usar la posición mínima segura
                                    targetPosition = minSafePosition;
                                } else {
                                    // Si la sección destino está después de inicio, restar solo el header
                                    targetPosition = targetPosition - headerHeight;
                                }
                            } else {
                                targetPosition = targetPosition - headerHeight;
                            }
                        } else {
                            // En desktop o cuando navegas entre secciones (no desde inicio)
                            // Simplemente restar el header - esto es el comportamiento estándar
                            targetPosition = targetPosition - headerHeight;
                        }
                        
                        // Asegurar que no sea negativo
                        if (targetPosition < 0) {
                            targetPosition = 0;
                        }
                        
                        // Redondear para evitar problemas de subpíxeles
                        targetPosition = Math.round(targetPosition);
                    }
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Cerrar menú al redimensionar la ventana (si se vuelve desktop)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            closeMenu();
        }
    });

    // Función para cerrar el menú
    function closeMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
    }

    // ============================================
    // EFECTO DE NAVEGACIÓN AL HACER SCROLL
    // ============================================
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        // Agregar sombra al header cuando se hace scroll
        if (currentScroll > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }

        lastScroll = currentScroll;
    });

    // ============================================
    // HIGHLIGHT ACTIVO EN NAVEGACIÓN
    // ============================================
    const sections = document.querySelectorAll('.section');

    function highlightActiveSection() {
        const scrollPosition = window.pageYOffset + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightActiveSection);
    highlightActiveSection(); // Llamar al cargar la página

    // ============================================
    // CARRUSEL DE IMÁGENES
    // ============================================
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-btn-prev');
    const nextBtn = document.querySelector('.carousel-btn-next');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;
    let autoSlideInterval;

    // Función para mostrar un slide específico
    function showSlide(index) {
        // Remover clase active de todos los slides
        carouselSlides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        // Asegurar que el índice esté dentro del rango válido
        if (index >= carouselSlides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = carouselSlides.length - 1;
        } else {
            currentSlide = index;
        }

        // Agregar clase active al slide actual
        carouselSlides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }

    // Función para ir al slide siguiente
    function nextSlide() {
        showSlide(currentSlide + 1);
        resetAutoSlide();
    }

    // Función para ir al slide anterior
    function prevSlide() {
        showSlide(currentSlide - 1);
        resetAutoSlide();
    }

    // Event listeners para los botones
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Event listeners para los indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
            resetAutoSlide();
        });
    });

    // Auto-slide cada 4 segundos
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 4000);
    }

    // Reiniciar auto-slide
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Pausar auto-slide al hacer hover sobre el carrusel
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });

        carouselContainer.addEventListener('mouseleave', () => {
            startAutoSlide();
        });
    }

    // Iniciar auto-slide
    startAutoSlide();

    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
});

