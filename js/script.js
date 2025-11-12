// Smooth scrolling para los enlaces de navegación
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animación para las barras de progreso
function initSkillAnimations() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.progress-bar');
                progressBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 300);
                });
            }
        });
    }, { threshold: 0.5 });
    
    skillCards.forEach(card => {
        observer.observe(card);
    });
}

// Efecto de escritura en el hero
function initTypeWriter() {
    const heroText = document.querySelector('.hero-section h1');
    if (heroText) {
        const text = heroText.textContent;
        heroText.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Iniciar efecto después de 1 segundo
        setTimeout(typeWriter, 1000);
    }
}

// Formspree Integration - FUNCIONAL
function initContactForm() {
    const form = document.getElementById("contact");
    const status = document.getElementById("form-status");
    
    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            
            // Mostrar estado de carga
            status.innerHTML = '<div class="spinner-border spinner-border-sm" role="status"></div> Enviando mensaje...';
            status.className = 'mt-3 text-center text-info';
            
            const data = new FormData(form);
            
            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    body: data,
                    headers: { 
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    status.innerHTML = "✅ ¡Tu mensaje ha sido enviado con éxito! Te contactaré pronto.";
                    status.className = 'mt-3 text-center text-success';
                    form.reset();
                    
                    // Ocultar mensaje después de 5 segundos
                    setTimeout(() => {
                        status.innerHTML = '';
                    }, 5000);
                } else {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Error en la respuesta del servidor');
                }
            } catch (error) {
                console.error('Error completo:', error);
                status.innerHTML = "❌ Ocurrió un error al enviar el mensaje. Por favor, inténtalo de nuevo.";
                status.className = 'mt-3 text-center text-danger';
                
                // Mostrar detalles del error en consola
                if (error.message) {
                    console.error('Mensaje de error:', error.message);
                }
            }
        });
    }
}

// Inicializar todo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initSmoothScroll();
    initSkillAnimations();
    initTypeWriter();
    initContactForm();
});