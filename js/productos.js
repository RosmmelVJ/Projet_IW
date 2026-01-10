// ============================================
// SECCIÓN PRODUCTOS - JAVASCRIPT INDEPENDIENTE
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const productosSection = document.getElementById('productos');
    const productosHeader = document.querySelector('.productos-header');
    const productosTabs = document.querySelector('.productos-tabs');
    const productosContent = document.querySelector('.productos-content');
    const tabButtons = document.querySelectorAll('.productos-tab');
    const tabContents = document.querySelectorAll('.productos-tab-content');
    
    if (!productosSection || !productosHeader || !productosTabs || !productosContent) {
        return;
    }

    // Función para activar las animaciones
    function activateAnimations() {
        productosHeader.classList.add('animate');
        productosTabs.classList.add('animate');
        setTimeout(() => {
            productosContent.classList.add('animate');
        }, 300);
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
        if (isElementInViewport(productosSection)) {
            activateAnimations();
            window.removeEventListener('scroll', handleScroll);
        }
    }

    // Verificar al cargar la página
    if (isElementInViewport(productosSection)) {
        activateAnimations();
    } else {
        window.addEventListener('scroll', handleScroll);
    }

    // Manejar clic en el enlace de navegación
    const productosLink = document.querySelector('a[href="#productos"]');
    if (productosLink) {
        productosLink.addEventListener('click', function(e) {
            setTimeout(() => {
                if (isElementInViewport(productosSection)) {
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

    observer.observe(productosSection);

    // ============================================
    // FUNCIONALIDAD DE TABS
    // ============================================
    
    // Función para cambiar de tab
    function switchTab(tabId) {
        // Remover clase active de todos los tabs y contenidos
        tabButtons.forEach(button => {
            button.classList.remove('active');
        });
        
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        
        // Agregar clase active al tab seleccionado y su contenido
        const selectedTab = document.querySelector(`[data-tab="${tabId}"]`);
        const selectedContent = document.getElementById(tabId);
        
        if (selectedTab && selectedContent) {
            selectedTab.classList.add('active');
            selectedContent.classList.add('active');
        }
    }

    // Event listeners para los tabs
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            if (tabId) {
                switchTab(tabId);
            }
        });
    });

    // Inicializar con el primer tab activo
    if (tabButtons.length > 0 && tabContents.length > 0) {
        const firstTab = tabButtons[0];
        const firstTabId = firstTab.getAttribute('data-tab');
        if (firstTabId) {
            switchTab(firstTabId);
        }
    }
});
