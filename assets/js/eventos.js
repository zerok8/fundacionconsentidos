// Datos de eventos
const eventosData = {
    evento1: {
        titulo: "Workshop de Innovación Digital",
        fecha: "15 de Enero, 2025",
        hora: "9:00 AM - 5:00 PM",
        lugar: "Centro de Convenciones Principal",
        categoria: "Taller",
        precio: "$150",
        descripcion: `
            <p><strong>¿Estás listo para transformar tu negocio con las últimas innovaciones digitales?</strong></p>
            <p>Este workshop intensivo te proporcionará las herramientas y conocimientos necesarios para:</p>
            <ul>
                <li>Implementar estrategias de transformación digital</li>
                <li>Utilizar herramientas de automatización</li>
                <li>Desarrollar productos digitales innovadores</li>
                <li>Crear experiencias de usuario excepcionales</li>
            </ul>
            <h5>Incluye:</h5>
            <ul>
                <li>Material didáctico completo</li>
                <li>Almuerzo y coffee breaks</li>
                <li>Certificado de participación</li>
                <li>Acceso a comunidad exclusiva</li>
            </ul>
        `,
        instructor: "Dr. María González - Experta en Transformación Digital"
    },
    evento2: {
        titulo: "Conferencia de Liderazgo",
        fecha: "22 de Enero, 2025",
        hora: "7:00 PM - 9:30 PM",
        lugar: "Auditorio Empresarial",
        categoria: "Conferencia",
        precio: "$75",
        descripcion: `
            <p><strong>Descubre los secretos del liderazgo efectivo</strong></p>
            <p>Una conferencia magistral que incluye:</p>
            <ul>
                <li>Estrategias de liderazgo moderno</li>
                <li>Gestión de equipos remotos</li>
                <li>Comunicación efectiva</li>
                <li>Toma de decisiones estratégicas</li>
            </ul>
            <h5>Ponentes confirmados:</h5>
            <ul>
                <li>Carlos Ruiz - CEO de TechCorp</li>
                <li>Ana Martínez - Directora de RRHH Global Inc.</li>
                <li>Panel de discusión con líderes locales</li>
            </ul>
        `,
        instructor: "Ponentes internacionales reconocidos"
    },
    evento3: {
        titulo: "Meetup de Networking",
        fecha: "5 de Febrero, 2025",
        hora: "6:00 PM - 9:00 PM",
        lugar: "Hotel Plaza Central",
        categoria: "Networking",
        precio: "$50",
        descripcion: `
            <p><strong>Conecta, aprende y crece con profesionales de tu industria</strong></p>
            <p>Una velada perfecta para:</p>
            <ul>
                <li>Expandir tu red de contactos profesionales</li>
                <li>Intercambiar experiencias y mejores prácticas</li>
                <li>Descubrir oportunidades de colaboración</li>
                <li>Disfrutar en un ambiente relajado y profesional</li>
            </ul>
            <h5>La velada incluye:</h5>
            <ul>
                <li>Cocktail de bienvenida</li>
                <li>Cena tipo buffet</li>
                <li>Actividades de networking estructuradas</li>
                <li>Sorteos y premios sorpresa</li>
            </ul>
        `,
        instructor: "Facilitado por expertos en networking"
    },
    evento4: {
        titulo: "Curso de Marketing Digital",
        fecha: "18 de Febrero, 2025",
        hora: "8:00 AM - 6:00 PM",
        lugar: "Campus Universitario",
        categoria: "Curso",
        precio: "$200",
        descripcion: `
            <p><strong>Domina el marketing digital desde cero hasta nivel avanzado</strong></p>
            <p>Un curso completo que cubre:</p>
            <ul>
                <li>Fundamentos del marketing digital</li>
                <li>SEO y SEM avanzado</li>
                <li>Social Media Marketing</li>
                <li>Email marketing y automatización</li>
                <li>Analytics y métricas de conversión</li>
            </ul>
            <h5>Metodología práctica:</h5>
            <ul>
                <li>Casos de estudio reales</li>
                <li>Ejercicios hands-on</li>
                <li>Herramientas profesionales</li>
                <li>Proyecto final personalizado</li>
            </ul>
        `,
        instructor: "Equipo de especialistas en Marketing Digital"
    }
};

// Datos del calendario con eventos
const eventosCalendario = {
    2025: {
        0: { // Enero
            15: { titulo: "Workshop de Innovación Digital", tipo: "taller" },
            22: { titulo: "Conferencia de Liderazgo", tipo: "conferencia" }
        },
        1: { // Febrero
            5: { titulo: "Meetup de Networking", tipo: "networking" },
            18: { titulo: "Curso de Marketing Digital", tipo: "curso" }
        }
    }
};

// Estado actual del calendario
let fechaActual = new Date();
let mesActual = fechaActual.getMonth();
let añoActual = fechaActual.getFullYear();

// Nombres de los meses
const nombresMeses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

// Días de la semana
const diasSemana = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

// Inicializar la página cuando se carga
document.addEventListener('DOMContentLoaded', function() {
    inicializarCalendario();
    configurarEventListeners();
    animarElementos();
});

// Función para abrir modal con detalles del evento
function abrirModal(eventoId) {
    const evento = eventosData[eventoId];
    if (!evento) return;

    const modal = new bootstrap.Modal(document.getElementById('eventoModal'));
    
    // Llenar el contenido del modal
    document.getElementById('modalTitle').textContent = evento.titulo;
    document.getElementById('modalContent').innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <h6><i class="fas fa-calendar"></i> Fecha</h6>
                <p>${evento.fecha}</p>
                
                <h6><i class="fas fa-clock"></i> Horario</h6>
                <p>${evento.hora}</p>
                
                <h6><i class="fas fa-map-marker-alt"></i> Lugar</h6>
                <p>${evento.lugar}</p>
            </div>
            <div class="col-md-6">
                <h6><i class="fas fa-tag"></i> Categoría</h6>
                <p><span class="badge bg-primary">${evento.categoria}</span></p>
                
                <h6><i class="fas fa-dollar-sign"></i> Precio</h6>
                <p class="h5 text-success">${evento.precio}</p>
                
                <h6><i class="fas fa-user"></i> Instructor</h6>
                <p><small>${evento.instructor}</small></p>
            </div>
        </div>
        <hr>
        <div class="evento-descripcion">
            ${evento.descripcion}
        </div>
    `;
    
    modal.show();
}

// Configurar event listeners
function configurarEventListeners() {
    // Navegación del calendario
    document.getElementById('prevMonth').addEventListener('click', function() {
        mesActual--;
        if (mesActual < 0) {
            mesActual = 11;
            añoActual--;
        }
        generarCalendario(mesActual, añoActual);
    });

    document.getElementById('nextMonth').addEventListener('click', function() {
        mesActual++;
        if (mesActual > 11) {
            mesActual = 0;
            añoActual++;
        }
        generarCalendario(mesActual, añoActual);
    });

    // Scroll suave para navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Efectos de hover en tarjetas
    document.querySelectorAll('.evento-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Inicializar calendario
function inicializarCalendario() {
    generarCalendario(mesActual, añoActual);
}

// Generar calendario
function generarCalendario(mes, año) {
    const calendario = document.getElementById('calendar');
    const mesNombre = document.getElementById('currentMonth');
    
    // Actualizar título del mes
    mesNombre.textContent = `${nombresMeses[mes]} ${año}`;
    
    // Limpiar calendario
    calendario.innerHTML = '';
    
    // Crear encabezados de días
    diasSemana.forEach(dia => {
        const diaElemento = document.createElement('div');
        diaElemento.className = 'calendar-day calendar-header-day';
        diaElemento.textContent = dia;
        calendario.appendChild(diaElemento);
    });
    
    // Primer día del mes y número de días
    const primerDia = new Date(año, mes, 1).getDay();
    const diasEnMes = new Date(año, mes + 1, 0).getDate();
    
    // Agregar días vacíos al principio
    for (let i = 0; i < primerDia; i++) {
        const diaVacio = document.createElement('div');
        diaVacio.className = 'calendar-day';
        calendario.appendChild(diaVacio);
    }
    
    // Agregar días del mes
    for (let dia = 1; dia <= diasEnMes; dia++) {
        const diaElemento = document.createElement('div');
        diaElemento.className = 'calendar-day';
        diaElemento.textContent = dia;
        
        // Verificar si hay eventos en este día
        const tieneEvento = eventosCalendario[año] && 
                           eventosCalendario[año][mes] && 
                           eventosCalendario[año][mes][dia];
        
        if (tieneEvento) {
            diaElemento.classList.add('has-event');
            diaElemento.title = tieneEvento.titulo;
            
            // Agregar click event para mostrar información del evento
            diaElemento.addEventListener('click', function() {
                mostrarInfoEvento(tieneEvento, dia, mes, año);
            });
        }
        
        // Resaltar día actual
        const hoy = new Date();
        if (año === hoy.getFullYear() && 
            mes === hoy.getMonth() && 
            dia === hoy.getDate()) {
            diaElemento.classList.add('today');
            diaElemento.style.background = 'var(--accent-color)';
            diaElemento.style.color = 'white';
            diaElemento.style.fontWeight = 'bold';
        }
        
        calendario.appendChild(diaElemento);
    }
}

// Mostrar información del evento en el calendario
function mostrarInfoEvento(evento, dia, mes, año) {
    const fechaFormateada = `${dia} de ${nombresMeses[mes]}, ${año}`;
    
    // Crear tooltip o modal simple
    const tooltip = document.createElement('div');
    tooltip.style.position = 'fixed';
    tooltip.style.background = 'var(--accent-color)';
    tooltip.style.color = 'white';
    tooltip.style.padding = '10px';
    tooltip.style.borderRadius = '5px';
    tooltip.style.zIndex = '9999';
    tooltip.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    tooltip.innerHTML = `
        <strong>${evento.titulo}</strong><br>
        <small>${fechaFormateada}</small>
    `;
    
    document.body.appendChild(tooltip);
    
    // Posicionar tooltip
    const rect = event.target.getBoundingClientRect();
    tooltip.style.left = (rect.left + rect.width/2 - tooltip.offsetWidth/2) + 'px';
    tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
    
    // Remover tooltip después de 3 segundos
    setTimeout(() => {
        if (document.body.contains(tooltip)) {
            document.body.removeChild(tooltip);
        }
    }, 3000);
}

// Animaciones de entrada
function animarElementos() {
    // Animación de entrada para elementos del timeline
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos del timeline
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });

    // Animación para tarjetas de eventos pasados
    document.querySelectorAll('.evento-pasado-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
}

// Función para filtrar eventos (funcionalidad adicional)
function filtrarEventos(categoria) {
    const eventos = document.querySelectorAll('.timeline-item');
    
    eventos.forEach(evento => {
        if (categoria === 'todos' || evento.dataset.categoria === categoria) {
            evento.style.display = 'flex';
            evento.style.animation = 'fadeInUp 0.5s ease-out';
        } else {
            evento.style.display = 'none';
        }
    });
}

// Función para reservar evento
function reservarEvento(eventoId) {
    // Aquí iría la lógica para procesar la reserva
    alert(`Reserva iniciada para el evento: ${eventosData[eventoId].titulo}`);
    
    // En una implementación real, aquí se haría:
    // - Validar disponibilidad
    // - Procesar pago
    // - Enviar confirmación
    // - Actualizar base de datos
}

// Funciones utilitarias
function formatearFecha(fecha) {
    const opciones = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return fecha.toLocaleDateString('es-ES', opciones);
}

function contarDiasHastaEvento(fechaEvento) {
    const hoy = new Date();
    const diferencia = fechaEvento.getTime() - hoy.getTime();
    return Math.ceil(diferencia / (1000 * 3600 * 24));
}

// Exportar funciones para uso global
window.abrirModal = abrirModal;
window.reservarEvento = reservarEvento;
window.filtrarEventos = filtrarEventos;

// Efecto de loading (opcional)
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// Agregar funcionalidad de búsqueda (bonus)
function buscarEventos(termino) {
    const eventos = document.querySelectorAll('.evento-card h3');
    const contenedores = document.querySelectorAll('.timeline-item');
    
    contenedores.forEach((contenedor, index) => {
        const titulo = eventos[index].textContent.toLowerCase();
        if (titulo.includes(termino.toLowerCase()) || termino === '') {
            contenedor.style.display = 'flex';
        } else {
            contenedor.style.display = 'none';
        }
    });
}

// Crear barra de búsqueda dinámicamente (opcional)
function agregarBarraBusqueda() {
    const seccionEventos = document.querySelector('#proximos-eventos .section-title');
    
    const barraBusqueda = document.createElement('div');
    barraBusqueda.className = 'search-container mt-3';
    barraBusqueda.innerHTML = `
        <div class="input-group" style="max-width: 400px; margin: 0 auto;">
            <input type="text" class="form-control" placeholder="Buscar eventos..." id="searchInput">
            <button class="btn btn-outline-primary" type="button">
                <i class="fas fa-search"></i>
            </button>
        </div>
    `;
    
    seccionEventos.appendChild(barraBusqueda);
    
    // Agregar funcionalidad de búsqueda
    const inputBusqueda = document.getElementById('searchInput');
    inputBusqueda.addEventListener('input', function(e) {
        buscarEventos(e.target.value);
    });
}

// Llamar funciones adicionales si es necesario
// agregarBarraBusqueda();

console.log('Sistema de eventos cargado correctamente ✓');