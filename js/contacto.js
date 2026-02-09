/* ============================================
   SCRIPT para SECCIÓN CONTACTO
   ============================================ */

(function () {
    'use strict';

    // Seleccionar el formulario
    const contactoForm = document.getElementById('contactoForm');

    if (contactoForm) {
        // Evento al enviar el formulario
        contactoForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Obtener los valores del formulario
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const mensaje = document.getElementById('mensaje').value.trim();

            // Validación de campos
            if (!nombre || !email || !mensaje) {
                mostrarMensaje('Por favor, completa todos los campos.', 'error');
                return;
            }

            // Validación de email
            if (!esEmailValido(email)) {
                mostrarMensaje('Por favor, ingresa un correo electrónico válido.', 'error');
                return;
            }

            // Si todas las validaciones pasan, simular envío
            enviarFormulario(nombre, email, mensaje);
        });

        /**
         * Validar formato de email
         */
        function esEmailValido(email) {
            const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return patron.test(email);
        }

        /**
         * Simular envío del formulario
         */
        function enviarFormulario(nombre, email, mensaje) {
            // Deshabilitar el botón durante el envío
            const btnEnviar = contactoForm.querySelector('.btn-enviar');
            const textoOriginal = btnEnviar.textContent;
            
            btnEnviar.disabled = true;
            btnEnviar.textContent = 'ENVIANDO...';

            // Simular espera de 1.5 segundos (en producción, aquí iría el fetch)
            setTimeout(() => {
                // En un proyecto real, aquí harías:
                // fetch('/api/contacto', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify({ nombre, email, mensaje })
                // })
                
                // Por ahora, simulamos un envío exitoso
                mostrarMensaje(
                    `¡Gracias ${nombre}! Hemos recibido tu mensaje. Nos pondremos en contacto pronto.`,
                    'exito'
                );

                // Limpiar el formulario
                contactoForm.reset();

                // Restaurar el botón
                btnEnviar.disabled = false;
                btnEnviar.textContent = textoOriginal;

                // Log en consola (útil para debugging)
                console.log('Formulario enviado:', { nombre, email, mensaje });
            }, 1500);
        }

        /**
         * Mostrar mensaje de feedback
         */
        function mostrarMensaje(texto, tipo) {
            // Eliminar mensaje anterior si existe
            const mensajeAnterior = contactoForm.querySelector('.mensaje-feedback');
            if (mensajeAnterior) {
                mensajeAnterior.remove();
            }

            // Crear el elemento del mensaje
            const mensaje = document.createElement('div');
            mensaje.className = `mensaje-feedback mensaje-${tipo}`;
            mensaje.textContent = texto;

            // Insertar al inicio del formulario
            contactoForm.insertBefore(mensaje, contactoForm.firstChild);

            // Remover automáticamente después de 5 segundos
            setTimeout(() => {
                mensaje.style.opacity = '0';
                setTimeout(() => mensaje.remove(), 300);
            }, 5000);
        }
    }

    // Smooth scroll para los links de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const destino = document.querySelector(href);
                if (destino) {
                    destino.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

})();
