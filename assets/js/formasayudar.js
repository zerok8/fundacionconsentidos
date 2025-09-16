document.addEventListener('DOMContentLoaded', function () {
  const volunteerForm = document.getElementById('volunteerForm');
  const volunteerModal = document.getElementById('volunteerModal');
  const confirmationModal = document.getElementById('confirmationModal');
  const submitBtn = document.querySelector('.btn-volunteer-submit');

  if (!volunteerForm || !volunteerModal || !confirmationModal || !submitBtn) {
    console.warn('Elementos del formulario de voluntariado no encontrados.');
    return;
  }

  // Validación del formulario
  function validateForm() {
    let isValid = true;
    const requiredFields = volunteerForm.querySelectorAll('[required]');

    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        field.classList.add('is-invalid');
        field.classList.remove('is-valid');
        isValid = false;
      } else {
        field.classList.remove('is-invalid');
        field.classList.add('is-valid');
      }
    });

    // Validar email
    const emailField = document.getElementById('email');
    const emailPattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    if (emailField.value && !emailPattern.test(emailField.value)) {
      emailField.classList.add('is-invalid');
      emailField.classList.remove('is-valid');
      isValid = false;
    }

    return isValid;
  }

  // Envío del formulario
//   volunteerForm.addEventListener('submit', function (e) {
//     e.preventDefault();

//     if (!validateForm()) return;

//     submitBtn.classList.add('loading');
//     submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-1"></i>Enviando...';

//     setTimeout(() => {
//   try {
//     // Cerrar modal de formulario
//     const modalInstance = bootstrap.Modal.getOrCreateInstance(volunteerModal);
//     modalInstance.hide();

//     // Mostrar modal de confirmación
//     const confirmModal = new bootstrap.Modal(confirmationModal);
//     confirmModal.show();

//     // Limpiar formulario
//     volunteerForm.reset();
//     volunteerForm.querySelectorAll('.is-valid, .is-invalid').forEach(field => {
//       field.classList.remove('is-valid', 'is-invalid');
//     });

//     // Restaurar botón
//     submitBtn.classList.remove('loading');
//     submitBtn.innerHTML = '<i class="bi bi-send me-1"></i>Enviar Solicitud';
//   } catch (error) {
//     console.error('Error al manejar los modales:', error);
//     submitBtn.classList.remove('loading');
//     submitBtn.innerHTML = '<i class="bi bi-send me-1"></i>Enviar Solicitud';
//   }
// }, 2000);

//   });

//   // Validación en tiempo real
//   volunteerForm.addEventListener('input', function (e) {
//     const field = e.target;
//     if (field.required && field.value.trim()) {
//       field.classList.remove('is-invalid');
//       field.classList.add('is-valid');
//     }
//   });

//   // Limpiar al cerrar el modal
//   volunteerModal.addEventListener('hidden.bs.modal', function () {
//     volunteerForm.reset();
//     volunteerForm.querySelectorAll('.is-valid, .is-invalid').forEach(field => {
//       field.classList.remove('is-valid', 'is-invalid');
//     });
//   });

  console.log('formasayudar.js cargado correctamente');
  
    document.addEventListener('DOMContentLoaded', function() {
      const contactForm = document.getElementById('contact-form');
      const submitBtn = document.getElementById('submit-btn');
      const successMessage = document.getElementById('success-message');

      contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevenir el envío real del formulario

        // Cambiar el estado del botón a "enviando"
        submitBtn.textContent = 'Enviando...';
        submitBtn.classList.add('btn-sending');
        submitBtn.disabled = true;

        // Simular tiempo de envío
        setTimeout(function() {
          // Mostrar mensaje de éxito
          successMessage.classList.add('show');
          
          // Limpiar todos los campos del formulario
          contactForm.reset();

          // Restaurar el botón a su estado original
          submitBtn.textContent = 'Enviar mensaje';
          submitBtn.classList.remove('btn-sending');
          submitBtn.disabled = false;

          // Ocultar el mensaje de éxito después de 5 segundos
          setTimeout(function() {
            successMessage.classList.remove('show');
          }, 5000);

          // Scroll suave hacia el mensaje de éxito
          successMessage.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }, 1500); // Simula 1.5 segundos de envío
      });
    });


       // Variables globales
        const mobileToggle = document.getElementById('mobile-nav-toggle');
        const navMenu = document.getElementById('navmenu');
        const menuStatus = document.getElementById('menu-status');
        const screenSize = document.getElementById('screen-size');

        // Función principal para toggle del menú móvil
        function toggleMobileMenu() {
            console.log('Toggle menú móvil clicked');
            
            const isActive = navMenu.classList.contains('mobile-nav-active');
            
            if (isActive) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        }

        function openMobileMenu() {
            // console.log('Abriendo menú móvil');
            navMenu.classList.add('mobile-nav-active');
            mobileToggle.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevenir scroll
            updateStatus('Menú abierto');
        }

        function closeMobileMenu() {
            //console.log('Cerrando menú móvil');
            navMenu.classList.remove('mobile-nav-active');
            mobileToggle.classList.remove('active');
            document.body.style.overflow = '';
            updateStatus('Menú cerrado');
        }

        function updateStatus(status) {
            if (menuStatus) {
                menuStatus.textContent = status;
            }
        }

        function updateScreenSize() {
            const width = window.innerWidth;
            let size = 'Desktop';
            
            if (width <= 480) {
                size = 'Móvil pequeño';
            } else if (width <= 768) {
                size = 'Móvil';
            } else if (width <= 1024) {
                size = 'Tablet';
            }
            
            if (screenSize) {
                screenSize.textContent = `${size} (${width}px)`;
            }
        }

        // Event Listeners
        document.addEventListener('DOMContentLoaded', function() {
            console.log('DOM cargado - Iniciando menú móvil');
            
            // Click en botón hamburguesa
            if (mobileToggle) {
                mobileToggle.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleMobileMenu();
                });
            }

            // Click en enlaces del menú (cerrar en móvil)
            const menuLinks = document.querySelectorAll('.menu a');
            menuLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    if (window.innerWidth <= 768) {
                        // En móvil, cerrar el menú al hacer click en un enlace
                        setTimeout(() => {
                            closeMobileMenu();
                        }, 100);
                    }
                });
            });

            // Cerrar menú al redimensionar
            window.addEventListener('resize', function() {
                updateScreenSize();
                
                if (window.innerWidth > 768) {
                    closeMobileMenu();
                }
            });

            // Inicializar
            updateScreenSize();
            updateStatus('Menú cerrado');
        });

        // Funciones de testing
        function testMobileMenu() {
            if (window.innerWidth > 768) {
                alert('Reduce el tamaño de la ventana a menos de 768px para probar el menú móvil');
            } else {
                toggleMobileMenu();
            }
        }

        function checkResponsive() {
            const width = window.innerWidth;
            const toggleVisible = window.getComputedStyle(mobileToggle).display !== 'none';
            
            let message = `Ancho de pantalla: ${width}px\n`;
            message += `Botón hamburguesa visible: ${toggleVisible ? 'Sí' : 'No'}\n`;
            message += `Estado del menú: ${navMenu.classList.contains('mobile-nav-active') ? 'Abierto' : 'Cerrado'}`;
            
            alert(message);
        }




});
