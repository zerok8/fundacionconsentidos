/**
* Template Name: Mentor
* Template URL: https://bootstrapmade.com/mentor-free-education-bootstrap-theme/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  //mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

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
            console.log('Abriendo menú móvil');
            navMenu.classList.add('mobile-nav-active');
            mobileToggle.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevenir scroll
            updateStatus('Menú abierto');
        }

        function closeMobileMenu() {
            console.log('Cerrando menú móvil');
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

})();