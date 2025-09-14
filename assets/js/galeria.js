

/**
 * GALERÍA SIMPLE - SIN CONFLICTOS
 * JavaScript específico para la página de galería
 */

// Ejecutar solo cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
  // Verificar que estamos en la página de galería
  if (!document.querySelector('.galeria-page')) {
      return; // Salir si no estamos en la página de galería
  }
  
  console.log('Inicializando galería...');
  
  // Inicializar funcionalidades
  initGalleryFilters();
  initGalleryModal();
  initLoadMore();
  handleImageErrors();
  
  // Inicializar AOS solo si existe
  if (typeof AOS !== 'undefined') {
      AOS.init({
          duration: 800,
          easing: 'ease-out',
          once: true
      });
  }
});

/**
* Sistema de filtros
*/
function initGalleryFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  if (!filterButtons.length || !galleryItems.length) return;
  
  filterButtons.forEach(button => {
      button.addEventListener('click', function() {
          const filter = this.getAttribute('data-filter');
          
          // Actualizar botón activo
          filterButtons.forEach(btn => btn.classList.remove('active'));
          this.classList.add('active');
          
          // Filtrar elementos
          galleryItems.forEach(item => {
              const categories = item.getAttribute('data-category') || '';
              const shouldShow = filter === 'all' || categories.includes(filter);
              
              if (shouldShow) {
                  item.style.display = 'block';
                  item.classList.remove('hidden');
              } else {
                  item.style.display = 'none';
                  item.classList.add('hidden');
              }
          });
          
          // Resetear "Cargar más"
          resetLoadMore();
      });
  });
}

/**
* Modal de galería
*/
function initGalleryModal() {
  const galleryCards = document.querySelectorAll('.gallery-card');
  const modal = document.getElementById('galleryModal');
  const modalContent = document.getElementById('modalContent');
  const modalTitle = document.getElementById('galleryModalLabel');
  
  if (!modal || !modalContent) return;
  
  let currentItems = [];
  let currentIndex = 0;
  
  galleryCards.forEach(card => {
      card.addEventListener('click', function() {
          // Obtener todos los elementos visibles
          currentItems = Array.from(document.querySelectorAll('.gallery-item:not(.hidden)'));
          const clickedItem = this.closest('.gallery-item');
          currentIndex = currentItems.indexOf(clickedItem);
          
          showInModal(currentIndex);
          
          // Mostrar modal
          if (typeof bootstrap !== 'undefined') {
              const bsModal = new bootstrap.Modal(modal);
              bsModal.show();
          }
      });
  });
  
  function showInModal(index) {
      if (!currentItems[index]) return;
      
      const item = currentItems[index];
      const img = item.querySelector('img');
      const video = item.querySelector('video');
      const title = item.querySelector('.overlay-content h3');
      
      modalContent.innerHTML = '';
      
      if (video) {
          const videoClone = video.cloneNode(true);
          videoClone.controls = true;
          videoClone.style.width = '100%';
          videoClone.style.height = 'auto';
          videoClone.style.maxHeight = '70vh';
          modalContent.appendChild(videoClone);
      } else if (img) {
          const imgClone = img.cloneNode(true);
          imgClone.style.width = '100%';
          imgClone.style.height = 'auto';
          imgClone.style.maxHeight = '70vh';
          modalContent.appendChild(imgClone);
      }
      
      if (title && modalTitle) {
          modalTitle.textContent = title.textContent;
      }
  }
}

/**
* Funcionalidad "Cargar más"
*/
function initLoadMore() {
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  if (!loadMoreBtn) return;
  
  let itemsShown = 6; // Mostrar 6 inicialmente
  
  // Ocultar elementos extras inicialmente
  galleryItems.forEach((item, index) => {
      if (index >= itemsShown) {
          item.style.display = 'none';
      }
  });
  
  // Si hay pocos elementos, ocultar botón
  if (galleryItems.length <= itemsShown) {
      loadMoreBtn.style.display = 'none';
  }
  
  loadMoreBtn.addEventListener('click', function() {
      const hiddenItems = Array.from(galleryItems).filter(item => 
          item.style.display === 'none' && !item.classList.contains('hidden')
      );
      
      // Mostrar los siguientes 3 elementos
      const itemsToShow = hiddenItems.slice(0, 3);
      
      itemsToShow.forEach((item, index) => {
          setTimeout(() => {
              item.style.display = 'block';
          }, index * 100);
      });
      
      // Ocultar botón si no hay más elementos
      setTimeout(() => {
          const stillHidden = Array.from(galleryItems).filter(item => 
              item.style.display === 'none' && !item.classList.contains('hidden')
          );
          
          if (stillHidden.length === 0) {
              loadMoreBtn.style.display = 'none';
          }
      }, 300);
  });
}

/**
* Resetear "Cargar más" después de filtrar
*/
function resetLoadMore() {
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  const visibleItems = document.querySelectorAll('.gallery-item:not(.hidden)');
  
  if (!loadMoreBtn) return;
  
  // Mostrar solo los primeros 6 elementos visibles
  visibleItems.forEach((item, index) => {
      if (index < 6) {
          item.style.display = 'block';
      } else {
          item.style.display = 'none';
      }
  });
  
  // Mostrar/ocultar botón según sea necesario
  if (visibleItems.length > 6) {
      loadMoreBtn.style.display = 'block';
  } else {
      loadMoreBtn.style.display = 'none';
  }
}

/**
* Manejar errores de imágenes
*/
function handleImageErrors() {
  const images = document.querySelectorAll('.gallery-card img');
  
  images.forEach(img => {
      img.addEventListener('error', function() {
          // Crear placeholder visual
          const placeholder = document.createElement('div');
          placeholder.style.cssText = `
              width: 100%;
              height: 250px;
              background: linear-gradient(135deg, #f8f9fa, #e9ecef);
              display: flex;
              align-items: center;
              justify-content: center;
              color: #6c757d;
              font-size: 14px;
              text-align: center;
              border-radius: 15px;
          `;
          placeholder.innerHTML = `
              <div>
                  <div style="font-size: 2rem; margin-bottom: 10px;">📷</div>
                  <div>Imagen no disponible</div>
              </div>
          `;
          
          this.parentNode.replaceChild(placeholder, this);
      });
  });
}

// Prevenir conflictos con main.js
window.galleryInitialized = true;


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
