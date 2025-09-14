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

});
