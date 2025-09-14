// /**
//  * GALERÍA DINÁMICA - FUNDACIÓN CON SENTIDOS
//  * JavaScript para funcionalidad completa de galería
//  */

// document.addEventListener('DOMContentLoaded', function() {
//   // Inicialización
//   initializeGallery();
//   setupFilterButtons();
//   setupGalleryModal();
//   setupLoadMore();
  
//   // Inicializar AOS si está disponible
//   if (typeof AOS !== 'undefined') {
//       AOS.init({
//           duration: 800,
//           easing: 'ease-out',
//           once: true
//       });
//   }
// });

// /**
// * Inicialización de la galería
// */
// function initializeGallery() {
//   const galleryItems = document.querySelectorAll('.gallery-item');
//   const loadMoreBtn = document.getElementById('loadMoreBtn');
  
//   // Configurar visualización inicial
//   let itemsToShow = getItemsToShow();
//   showItems(itemsToShow);
  
//   // Ocultar botón "Cargar más" si no hay más elementos
//   if (galleryItems.length <= itemsToShow) {
//       if (loadMoreBtn) {
//           loadMoreBtn.style.display = 'none';
//       }
//   }
// }

// /**
// * Obtener número de elementos a mostrar según el tamaño de pantalla
// */
// function getItemsToShow() {
//   const screenWidth = window.innerWidth;
//   if (screenWidth < 768) {
//       return 4; // Móvil
//   } else if (screenWidth < 1200) {
//       return 6; // Tablet
//   } else {
//       return 8; // Desktop
//   }
// }

// /**
// * Mostrar elementos de la galería
// */
// function showItems(count) {
//   const galleryItems = document.querySelectorAll('.gallery-item:not(.hidden)');
  
//   galleryItems.forEach((item, index) => {
//       if (index < count) {
//           item.style.display = 'block';
//       } else {
//           item.style.display = 'none';
//       }
//   });
// }

// /**
// * Configurar botones de filtro
// */
// function setupFilterButtons() {
//   const filterButtons = document.querySelectorAll('.filter-btn');
  
//   filterButtons.forEach(button => {
//       button.addEventListener('click', function() {
//           const filter = this.getAttribute('data-filter');
          
//           // Actualizar botón activo
//           filterButtons.forEach(btn => btn.classList.remove('active'));
//           this.classList.add('active');
          
//           // Filtrar elementos
//           filterItems(filter);
          
//           // Reiniciar funcionalidad "Cargar más"
//           resetLoadMore();
//       });
//   });
// }

// /**
// * Filtrar elementos de la galería
// */
// function filterItems(filter) {
//   const galleryItems = document.querySelectorAll('.gallery-item');
  
//   galleryItems.forEach((item, index) => {
//       const categories = item.getAttribute('data-category').split(' ');
//       const shouldShow = filter === 'all' || categories.includes(filter);
      
//       if (shouldShow) {
//           // Mostrar con animación
//           setTimeout(() => {
//               item.classList.remove('hidden');
//               item.classList.add('animate-in');
//               item.style.display = 'block';
              
//               // Remover clase de animación después de completarse
//               setTimeout(() => {
//                   item.classList.remove('animate-in');
//               }, 600);
//           }, index * 100);
//       } else {
//           // Ocultar elemento
//           item.classList.add('hidden');
//           item.style.display = 'none';
//       }
//   });
  
//   // Actualizar visualización después del filtrado
//   setTimeout(() => {
//       const itemsToShow = getItemsToShow();
//       showItems(itemsToShow);
//   }, 500);
// }

// /**
// * Configurar modal de galería
// */
// function setupGalleryModal() {
//   const galleryItems = document.querySelectorAll('.gallery-card');
//   const modal = document.getElementById('galleryModal');
//   const modalContent = document.getElementById('modalContent');
//   const modalTitle = document.getElementById('galleryModalLabel');
//   const prevBtn = document.getElementById('prevBtn');
//   const nextBtn = document.getElementById('nextBtn');
  
//   let currentIndex = 0;
//   let currentItems = [];
  
//   if (!modal || !modalContent) return;
  
//   // Configurar clicks en elementos de galería
//   galleryItems.forEach((item, index) => {
//       item.addEventListener('click', function() {
//           // Obtener elementos visibles actuales
//           currentItems = Array.from(document.querySelectorAll('.gallery-item:not(.hidden)'));
//           currentIndex = currentItems.indexOf(this.closest('.gallery-item'));
          
//           showModalContent(currentIndex);
          
//           // Mostrar modal usando Bootstrap
//           const bsModal = new bootstrap.Modal(modal);
//           bsModal.show();
//       });
//   });
  
//   // Botones de navegación
//   if (prevBtn) {
//       prevBtn.addEventListener('click', () => {
//           currentIndex = (currentIndex - 1 + currentItems.length) % currentItems.length;
//           showModalContent(currentIndex);
//       });
//   }
  
//   if (nextBtn) {
//       nextBtn.addEventListener('click', () => {
//           currentIndex = (currentIndex + 1) % currentItems.length;
//           showModalContent(currentIndex);
//       });
//   }
  
//   // Navegación con teclado
//   document.addEventListener('keydown', function(e) {
//       if (modal.classList.contains('show')) {
//           if (e.key === 'ArrowLeft' && prevBtn) {
//               prevBtn.click();
//           } else if (e.key === 'ArrowRight' && nextBtn) {
//               nextBtn.click();
//           } else if (e.key === 'Escape') {
//               bootstrap.Modal.getInstance(modal).hide();
//           }
//       }
//   });
  
//   /**
//    * Mostrar contenido en el modal
//    */
//   function showModalContent(index) {
//       if (!currentItems[index]) return;
      
//       const item = currentItems[index];
//       const img = item.querySelector('img');
//       const video = item.querySelector('video');
//       const title = item.querySelector('.overlay-content h3');
//       const description = item.querySelector('.overlay-content p');
      
//       // Limpiar contenido anterior
//       modalContent.innerHTML = '';
      
//       if (video) {
//           // Mostrar video
//           const videoClone = video.cloneNode(true);
//           videoClone.controls = true;
//           videoClone.autoplay = true;
//           videoClone.style.width = '100%';
//           videoClone.style.height = 'auto';
//           videoClone.style.maxHeight = '70vh';
//           modalContent.appendChild(videoClone);
//       } else if (img) {
//           // Mostrar imagen
//           const imgClone = img.cloneNode(true);
//           imgClone.style.width = '100%';
//           imgClone.style.height = 'auto';
//           imgClone.style.maxHeight = '70vh';
//           imgClone.style.objectFit = 'contain';
//           modalContent.appendChild(imgClone);
//       }
      
//       // Actualizar título del modal
//       if (title && modalTitle) {
//           modalTitle.textContent = title.textContent;
//       }
      
//       // Agregar descripción si existe
//       if (description) {
//           const descDiv = document.createElement('div');
//           descDiv.className = 'modal-description mt-3 p-3';
//           descDiv.innerHTML = `<p class="mb-0 text-muted">${description.textContent}</p>`;
//           modalContent.appendChild(descDiv);
//       }
      
//       // Actualizar estado de botones de navegación
//       if (prevBtn) {
//           prevBtn.style.visibility = currentItems.length > 1 ? 'visible' : 'hidden';
//       }
//       if (nextBtn) {
//           nextBtn.style.visibility = currentItems.length > 1 ? 'visible' : 'hidden';
//       }
//   }
// }

// /**
// * Configurar funcionalidad "Cargar más"
// */
// function setupLoadMore() {
//   const loadMoreBtn = document.getElementById('loadMoreBtn');
  
//   if (!loadMoreBtn) return;
  
//   loadMoreBtn.addEventListener('click', function() {
//       const hiddenItems = document.querySelectorAll('.gallery-item:not(.hidden)[style*="display: none"]');
//       const itemsToLoad = Math.min(getItemsToShow(), hiddenItems.length);
      
//       // Mostrar elementos adicionales con animación
//       for (let i = 0; i < itemsToLoad; i++) {
//           setTimeout(() => {
//               hiddenItems[i].style.display = 'block';
//               hiddenItems[i].classList.add('animate-in');
              
//               setTimeout(() => {
//                   hiddenItems[i].classList.remove('animate-in');
//               }, 600);
//           }, i * 100);
//       }
      
//       // Ocultar botón si no hay más elementos
//       setTimeout(() => {
//           const remainingHidden = document.querySelectorAll('.gallery-item:not(.hidden)[style*="display: none"]');
//           if (remainingHidden.length === 0) {
//               loadMoreBtn.style.display = 'none';
//           }
//       }, 500);
//   });
// }

// /**
// * Reiniciar funcionalidad "Cargar más"
// */
// function resetLoadMore() {
//   const loadMoreBtn = document.getElementById('loadMoreBtn');
//   const visibleItems = document.querySelectorAll('.gallery-item:not(.hidden)');
//   const itemsToShow = getItemsToShow();
  
//   if (loadMoreBtn) {
//       if (visibleItems.length > itemsToShow) {
//           loadMoreBtn.style.display = 'block';
//       } else {
//           loadMoreBtn.style.display = 'none';
//       }
//   }
// }

// /**
// * Lazy loading para imágenes
// */
// function setupLazyLoading() {
//   if ('IntersectionObserver' in window) {
//       const imageObserver = new IntersectionObserver((entries, observer) => {
//           entries.forEach(entry => {
//               if (entry.isIntersecting) {
//                   const img = entry.target;
//                   img.src = img.dataset.src;
//                   img.classList.remove('lazy');
//                   imageObserver.unobserve(img);
//               }
//           });
//       });

//       document.querySelectorAll('img[data-src]').forEach(img => {
//           imageObserver.observe(img);
//       });
//   }
// }

// /**
// * Manejar cambios de tamaño de ventana
// */
// window.addEventListener('resize', function() {
//   // Debounce para optimizar rendimiento
//   clearTimeout(this.resizeTimeout);
//   this.resizeTimeout = setTimeout(() => {
//       resetLoadMore();
//   }, 250);
// });

// /**
// * Precargar imágenes para mejor rendimiento
// */
// function preloadImages() {
//   const images = document.querySelectorAll('.gallery-card img');
//   images.forEach(img => {
//       const imagePreloader = new Image();
//       imagePreloader.src = img.src;
//   });
// }

// /**
// * Manejo de errores de carga de medios
// */
// function setupErrorHandling() {
//   // Manejo de errores en imágenes
//   document.querySelectorAll('.gallery-card img').forEach(img => {
//       img.addEventListener('error', function() {
//           this.src = 'assets/img/placeholder.jpg'; // Imagen placeholder
//           this.alt = 'Imagen no disponible';
//       });
//   });
  
//   // Manejo de errores en videos
//   document.querySelectorAll('.gallery-card video').forEach(video => {
//       video.addEventListener('error', function() {
//           const placeholder = document.createElement('div');
//           placeholder.className = 'video-error-placeholder';
//           placeholder.innerHTML = '<i class="bi bi-camera-video-off"></i><p>Video no disponible</p>';
//           this.parentNode.replaceChild(placeholder, this);
//       });
//   });
// }

// // Inicializar funcionalidades adicionales
// document.addEventListener('DOMContentLoaded', function() {
//   setupLazyLoading();
//   setupErrorHandling();
//   preloadImages();
// });

// /**
// * Utilidades adicionales
// */
// const GalleryUtils = {
//   // Obtener elementos por categoría
//   getItemsByCategory: function(category) {
//       return document.querySelectorAll(`[data-category*="${category}"]`);
//   },
  
//   // Contar elementos visibles
//   countVisibleItems: function() {
//       return document.querySelectorAll('.gallery-item:not(.hidden)').length;
//   },
  
//   // Shuffle elementos (para funcionalidad aleatoria)
//   shuffleItems: function() {
//       const container = document.querySelector('.gallery-grid');
//       const items = Array.from(container.children);
      
//       // Algoritmo Fisher-Yates shuffle
//       for (let i = items.length - 1; i > 0; i--) {
//           const j = Math.floor(Math.random() * (i + 1));
//           [items[i], items[j]] = [items[j], items[i]];
//       }
      
//       // Reorganizar en el DOM
//       items.forEach(item => container.appendChild(item));
//   }
// };



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