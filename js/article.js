// JavaScript específico para páginas de artículos

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling para tabla de contenidos
    initTableOfContents();
    
    // Funciones de compartir en redes sociales
    initSocialSharing();
    
    // Newsletter del sidebar
    initSidebarNewsletter();
    
    // Galería de fotos con lightbox
    initPhotoGallery();
    
    // Scroll progress indicator
    initScrollProgress();
});

// Tabla de contenidos con scroll suave
function initTableOfContents() {
    const tocLinks = document.querySelectorAll('.toc-link');
    
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Actualizar enlace activo
                tocLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Highlight automático basado en scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.article-section');
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && 
                window.pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.id;
            }
        });
        
        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    });
}

// Funciones de compartir en redes sociales
function initSocialSharing() {
    // Las funciones se definen globalmente para poder ser llamadas desde los botones
    window.shareOnFacebook = function() {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(document.title);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
    };
    
    window.shareOnTwitter = function() {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(document.title);
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank', 'width=600,height=400');
    };
    
    window.shareOnPinterest = function() {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(document.title);
        const image = encodeURIComponent(document.querySelector('.hero-img').src);
        window.open(`https://pinterest.com/pin/create/button/?url=${url}&description=${title}&media=${image}`, '_blank', 'width=600,height=400');
    };
    
    window.shareOnWhatsApp = function() {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(document.title);
        window.open(`https://wa.me/?text=${title} ${url}`, '_blank');
    };
}

// Newsletter del sidebar
function initSidebarNewsletter() {
    const sidebarForm = document.querySelector('.sidebar-newsletter-form');
    
    if (sidebarForm) {
        sidebarForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('.newsletter-input');
            const email = emailInput.value.trim();
            
            if (email && isValidEmail(email)) {
                showNotification('¡Gracias por suscribirte! Te mantendremos informado sobre París y otros destinos increíbles.', 'success');
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
}

// Galería de fotos con efecto lightbox simple
function initPhotoGallery() {
    const galleryImages = document.querySelectorAll('.gallery-image');
    
    galleryImages.forEach(image => {
        image.addEventListener('click', function() {
            openLightbox(this);
        });
        
        // Agregar cursor pointer
        image.style.cursor = 'pointer';
    });
    
    function openLightbox(image) {
        // Crear overlay del lightbox
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox-overlay';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="${image.src}" alt="${image.alt}" class="lightbox-image">
                <div class="lightbox-caption">${image.nextElementSibling?.textContent || image.alt}</div>
                <button class="lightbox-close">&times;</button>
            </div>
        `;
        
        // Agregar estilos si no existen
        if (!document.querySelector('#lightbox-styles')) {
            const styles = document.createElement('style');
            styles.id = 'lightbox-styles';
            styles.textContent = `
                .lightbox-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    animation: fadeIn 0.3s ease-out;
                }
                
                .lightbox-content {
                    position: relative;
                    max-width: 90%;
                    max-height: 90%;
                    text-align: center;
                }
                
                .lightbox-image {
                    max-width: 100%;
                    max-height: 80vh;
                    object-fit: contain;
                    border-radius: 10px;
                }
                
                .lightbox-caption {
                    color: white;
                    margin-top: 1rem;
                    font-size: 1.1rem;
                }
                
                .lightbox-close {
                    position: absolute;
                    top: -40px;
                    right: -40px;
                    background: none;
                    border: none;
                    color: white;
                    font-size: 2rem;
                    cursor: pointer;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .lightbox-close:hover {
                    background: rgba(255,255,255,0.3);
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `;
            document.head.appendChild(styles);
        }
        
        // Agregar al DOM
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        // Manejar cierre
        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.addEventListener('click', closeLightbox);
        
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // Cerrar con ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeLightbox();
            }
        });
        
        function closeLightbox() {
            lightbox.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => {
                if (document.body.contains(lightbox)) {
                    document.body.removeChild(lightbox);
                    document.body.style.overflow = '';
                }
            }, 300);
        }
    }
}

// Indicador de progreso de lectura
function initScrollProgress() {
    // Crear barra de progreso
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
    
    // Agregar estilos
    if (!document.querySelector('#scroll-progress-styles')) {
        const styles = document.createElement('style');
        styles.id = 'scroll-progress-styles';
        styles.textContent = `
            .scroll-progress {
                position: fixed;
                top: 80px;
                left: 0;
                width: 100%;
                height: 4px;
                background: rgba(44, 90, 160, 0.1);
                z-index: 999;
            }
            
            .scroll-progress-bar {
                height: 100%;
                background: #2c5aa0;
                width: 0%;
                transition: width 0.1s ease-out;
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Agregar al DOM
    document.body.appendChild(progressBar);
    
    const progressBarFill = progressBar.querySelector('.scroll-progress-bar');
    
    // Actualizar progreso en scroll
    window.addEventListener('scroll', function() {
        const article = document.querySelector('.article-main');
        if (!article) return;
        
        const articleTop = article.offsetTop;
        const articleHeight = article.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollTop = window.pageYOffset;
        
        const articleStart = articleTop - windowHeight / 2;
        const articleEnd = articleTop + articleHeight - windowHeight / 2;
        
        if (scrollTop < articleStart) {
            progressBarFill.style.width = '0%';
        } else if (scrollTop > articleEnd) {
            progressBarFill.style.width = '100%';
        } else {
            const progress = ((scrollTop - articleStart) / (articleEnd - articleStart)) * 100;
            progressBarFill.style.width = Math.min(100, Math.max(0, progress)) + '%';
        }
    });
}

// Función para copiar URL del artículo
function copyArticleURL() {
    navigator.clipboard.writeText(window.location.href).then(function() {
        showNotification('URL copiada al portapapeles', 'success');
    }).catch(function() {
        // Fallback para navegadores que no soportan clipboard API
        const textArea = document.createElement('textarea');
        textArea.value = window.location.href;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('URL copiada al portapapeles', 'success');
    });
}

// Lazy loading mejorado para imágenes del artículo
function initArticleLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px'
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Función para imprimir artículo
function printArticle() {
    const printWindow = window.open('', '_blank');
    const articleContent = document.querySelector('.article-main').innerHTML;
    const articleTitle = document.querySelector('.article-hero-title').textContent;
    
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>${articleTitle} - Travel Explorer</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                h1, h2, h3 { color: #2c5aa0; }
                img { max-width: 100%; height: auto; }
                .article-section { margin-bottom: 2rem; }
                @media print {
                    .no-print { display: none; }
                }
            </style>
        </head>
        <body>
            <h1>${articleTitle}</h1>
            ${articleContent}
        </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.print();
}

// Inicializar funciones adicionales
document.addEventListener('DOMContentLoaded', function() {
    initArticleLazyLoading();
    
    // Agregar botón de copiar URL si no existe
    const shareButtons = document.querySelector('.share-buttons');
    if (shareButtons) {
        const copyButton = document.createElement('button');
        copyButton.className = 'share-btn copy-url';
        copyButton.innerHTML = '🔗 Copiar URL';
        copyButton.style.background = '#666';
        copyButton.style.color = 'white';
        copyButton.addEventListener('click', copyArticleURL);
        shareButtons.appendChild(copyButton);
    }
});