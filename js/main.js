// Navegación móvil
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Cerrar menú al hacer click en un enlace
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
});

// Búsqueda
document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function() {
            performSearch();
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    function performSearch() {
        const query = searchInput.value.trim();
        if (query) {
            // Simular búsqueda
            alert(`Buscando: "${query}". Esta funcionalidad se implementaría con una base de datos real.`);
            // En una implementación real, aquí harías una petición al servidor
            // window.location.href = `busqueda.html?q=${encodeURIComponent(query)}`;
        }
    }
});

// Filtros en páginas de destinos y artículos
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const destinationsGrid = document.getElementById('destinations-grid');
    const articlesGrid = document.getElementById('articles-grid');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remover clase active de todos los botones
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Agregar clase active al botón clickeado
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Filtrar destinos
                if (destinationsGrid) {
                    filterDestinations(filter);
                }
                
                // Filtrar artículos
                if (articlesGrid) {
                    filterArticles(filter);
                }
            });
        });
    }
    
    function filterDestinations(filter) {
        const destinationCards = document.querySelectorAll('.destination-card');
        
        destinationCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.6s ease-out';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    function filterArticles(filter) {
        const articleCards = document.querySelectorAll('.article-card');
        
        articleCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.6s ease-out';
            } else {
                card.style.display = 'none';
            }
        });
    }
});

// Newsletter
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email && isValidEmail(email)) {
                // Simular envío exitoso
                showNotification('¡Gracias por suscribirte! Te enviaremos nuestras mejores aventuras.', 'success');
                emailInput.value = '';
            } else {
                showNotification('Por favor, ingresa un email válido.', 'error');
            }
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});

// Formulario de contacto
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Validación básica
            if (!name || !email || !subject || !message) {
                showNotification('Por favor, completa todos los campos.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Por favor, ingresa un email válido.', 'error');
                return;
            }
            
            // Simular envío exitoso
            showNotification('¡Mensaje enviado exitosamente! Te responderemos pronto.', 'success');
            this.reset();
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});

// Paginación
document.addEventListener('DOMContentLoaded', function() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentPage = 1;
    const totalPages = 3;
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                updatePagination();
                loadPage(currentPage);
            }
        });
        
        nextBtn.addEventListener('click', function() {
            if (currentPage < totalPages) {
                currentPage++;
                updatePagination();
                loadPage(currentPage);
            }
        });
    }
    
    function updatePagination() {
        const paginationInfo = document.querySelector('.pagination-info');
        if (paginationInfo) {
            paginationInfo.textContent = `Página ${currentPage} de ${totalPages}`;
        }
        
        if (prevBtn) {
            prevBtn.disabled = currentPage === 1;
        }
        
        if (nextBtn) {
            nextBtn.disabled = currentPage === totalPages;
        }
    }
    
    function loadPage(page) {
        // Simular carga de nueva página
        showNotification(`Cargando página ${page}...`, 'info');
        
        // En una implementación real, aquí harías una petición AJAX
        // para cargar el contenido de la página correspondiente
    }
});

// Sistema de notificaciones
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span class="notification-message">${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Agregar estilos si no existen
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                color: white;
                font-weight: 500;
                z-index: 10000;
                display: flex;
                align-items: center;
                gap: 1rem;
                max-width: 400px;
                animation: slideInRight 0.3s ease-out;
            }
            
            .notification-success {
                background: #4caf50;
            }
            
            .notification-error {
                background: #f44336;
            }
            
            .notification-info {
                background: #2196f3;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.2rem;
                cursor: pointer;
                padding: 0;
                margin-left: auto;
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Manejar cierre
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', function() {
        closeNotification(notification);
    });
    
    // Auto-cerrar después de 5 segundos
    setTimeout(() => {
        if (document.body.contains(notification)) {
            closeNotification(notification);
        }
    }, 5000);
    
    function closeNotification(element) {
        element.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (document.body.contains(element)) {
                document.body.removeChild(element);
            }
        }, 300);
    }
}

// Scroll suave para enlaces internos
document.addEventListener('DOMContentLoaded', function() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Lazy loading para imágenes
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
});

// Animaciones al hacer scroll
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.destination-card, .article-card, .team-member, .value-item');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out';
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        animationObserver.observe(element);
    });
});

// Manejo de errores globales
window.addEventListener('error', function(e) {
    console.error('Error en la aplicación:', e.error);
    // En producción, aquí podrías enviar el error a un servicio de logging
});

// Funciones de utilidad
const utils = {
    // Debounce para optimizar eventos que se disparan frecuentemente
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Formatear fechas
    formatDate: function(date) {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        return new Date(date).toLocaleDateString('es-ES', options);
    },
    
    // Truncar texto
    truncateText: function(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    },
    
    // Validar formularios
    validateForm: function(formElement) {
        const inputs = formElement.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('error');
                isValid = false;
            } else {
                input.classList.remove('error');
            }
        });
        
        return isValid;
    }
};

// Hacer utils disponible globalmente
window.TravelExplorerUtils = utils;

// Inicialización final
document.addEventListener('DOMContentLoaded', function() {
    console.log('Travel Explorer Blog cargado correctamente');
    
    // Agregar clase para indicar que JavaScript está habilitado
    document.body.classList.add('js-enabled');
    
    // Inicializar tooltips si existen
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(element => {
        element.addEventListener('mouseenter', function() {
            // Implementar tooltip si es necesario
        });
    });
});