// ============================================
// SECCIÓN PRODUCTOS - TABS FUNCTIONALITY
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.productos-tab');
    const tabContents = document.querySelectorAll('.productos-tab-content');

    // Función para cambiar de tab
    function switchTab(tabIndex) {
        // Remover clase active de todos los tabs y contenidos
        tabs.forEach(tab => tab.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Agregar clase active al tab seleccionado y su contenido
        if (tabs[tabIndex] && tabContents[tabIndex]) {
            tabs[tabIndex].classList.add('active');
            tabContents[tabIndex].classList.add('active');
        }
    }

    // Agregar event listeners a los tabs
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            switchTab(index);
        });
    });

    // Activar el primer tab por defecto
    if (tabs.length > 0 && tabContents.length > 0) {
        switchTab(0);
    }
});
