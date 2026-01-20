// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Navegación suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Cerrar navbar en móviles
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
                
                // Scroll suave
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Actualizar nav activo según scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    function updateActiveNav() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Llamar una vez al cargar

    // Animación de barras de habilidades
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.progress-bar');
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 300);
        });
    }

    // Observer para animaciones
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                
                // Animar barras de habilidades si es la sección de habilidades
                if (entry.target.id === 'habilidades') {
                    setTimeout(animateSkillBars, 500);
                }
            }
        });
    }, observerOptions);

    // Observar elementos
    document.querySelectorAll('.skill-card, .project-card, .study-item').forEach(el => {
        observer.observe(el);
    });

    // Manejo del formulario de contacto
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            // Cambiar texto del botón
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Enviando...';
            submitButton.disabled = true;
            
            // Simular envío (en producción usaría fetch real)
            setTimeout(() => {
                formStatus.innerHTML = '<div class="alert alert-success">¡Mensaje enviado exitosamente! Te responderé pronto.</div>';
                contactForm.reset();
                
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                // Ocultar mensaje después de 5 segundos
                setTimeout(() => {
                    formStatus.innerHTML = '';
                }, 5000);
            }, 1500);
        });
    }

    // Tooltips para badges
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    if (tooltipTriggerList.length > 0) {
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    }

    // Configurar carruseles
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => {
        // Pausar carrusel al pasar el mouse
        carousel.addEventListener('mouseenter', () => {
            carousel.setAttribute('data-bs-ride', 'false');
        });
        
        carousel.addEventListener('mouseleave', () => {
            carousel.setAttribute('data-bs-ride', 'carousel');
        });
    });

    // Efecto de escritura para el hero (opcional)
    function typeWriterEffect() {
        const heroTitle = document.querySelector('.hero-section h1');
        if (heroTitle) {
            const text = heroTitle.textContent;
            heroTitle.textContent = '';
            
            let i = 0;
            const speed = 50; // velocidad en ms
            
            function typeWriter() {
                if (i < text.length) {
                    heroTitle.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, speed);
                }
            }
            
            // Iniciar efecto después de un breve retraso
            setTimeout(typeWriter, 500);
        }
    }
    
    // Iniciar efecto de escritura solo si no hay movimiento de scroll rápido
    let isScrolling;
    window.addEventListener('scroll', function() {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(function() {
            if (window.scrollY === 0) {
                typeWriterEffect();
            }
        }, 100);
    });

    // Año actual en el footer
    const yearSpan = document.querySelector('footer .container .row .col-md-6 p');
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.textContent = yearSpan.textContent.replace('2025', currentYear);
    }

    // Preloader simple (opcional)
    function hidePreloader() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 300);
            }, 500);
        }
    }
    
    // Llamar al preloader cuando la página esté cargada
    window.addEventListener('load', hidePreloader);
});