document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    // Toast Notification System
    function showToast(message, type = 'info', duration = 5000) {
        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        const icons = {
            success: '✓',
            error: '✗',
            info: 'ℹ'
        };

        toast.innerHTML = `
            <div class="toast-icon">${icons[type] || icons.info}</div>
            <div class="toast-content">
                <p>${message}</p>
            </div>
            <button class="toast-close" onclick="this.parentElement.remove()">×</button>
        `;

        toastContainer.appendChild(toast);

        // Show toast
        setTimeout(() => toast.classList.add('show'), 10);

        // Auto remove
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }

    // Form Validation
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validateField(field) {
        const formGroup = field.closest('.form-group');
        const errorMessage = formGroup.querySelector('.error-message');
        let isValid = true;

        // Remove existing error states
        formGroup.classList.remove('has-error', 'has-success');

        if (field.hasAttribute('required') && !field.value.trim()) {
            isValid = false;
            showFieldError(formGroup, errorMessage, 'Questo campo è obbligatorio');
        } else if (field.type === 'email' && field.value && !validateEmail(field.value)) {
            isValid = false;
            showFieldError(formGroup, errorMessage, 'Inserisci un indirizzo email valido');
        } else if (field.hasAttribute('minlength') && field.value.length < field.getAttribute('minlength')) {
            isValid = false;
            showFieldError(formGroup, errorMessage, `Minimo ${field.getAttribute('minlength')} caratteri`);
        } else if (field.value.trim()) {
            formGroup.classList.add('has-success');
        }

        return isValid;
    }

    function showFieldError(formGroup, errorMessage, message) {
        formGroup.classList.add('has-error');
        if (!errorMessage) {
            errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            formGroup.appendChild(errorMessage);
        }
        errorMessage.textContent = message;
    }

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Scroll to Top Button
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    animateCounter(entry.target);
                    entry.target.classList.add('counted');
                }
            });
        }, observerOptions);

        statNumbers.forEach(stat => observer.observe(stat));
    }

    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        const targetDate = new Date('2026-03-09T00:00:00').getTime();

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = targetDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            const daysEl = document.getElementById('days');
            const hoursEl = document.getElementById('hours');
            const minutesEl = document.getElementById('minutes');
            const secondsEl = document.getElementById('seconds');

            if (daysEl) daysEl.textContent = String(days).padStart(3, '0');
            if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
            if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
            if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');

            if (distance < 0) {
                clearInterval(countdownInterval);
                if (daysEl) daysEl.textContent = '000';
                if (hoursEl) hoursEl.textContent = '00';
                if (minutesEl) minutesEl.textContent = '00';
                if (secondsEl) secondsEl.textContent = '00';
            }
        }

        updateCountdown();
        let countdownInterval = setInterval(updateCountdown, 1000);

        // Pause countdown when page is not visible (performance optimization)
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                if (countdownInterval) clearInterval(countdownInterval);
            } else {
                updateCountdown();
                countdownInterval = setInterval(updateCountdown, 1000);
            }
        });
    }

    // Lazy Loading for Images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        // Real-time validation
        const formFields = newsletterForm.querySelectorAll('input[required], select[required]');
        formFields.forEach(field => {
            field.addEventListener('blur', () => validateField(field));
            field.addEventListener('input', () => {
                if (field.classList.contains('error')) {
                    validateField(field);
                }
            });
        });

        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const submitBtn = this.querySelector('button[type="submit"]');

            // Validate all fields
            let isFormValid = true;
            formFields.forEach(field => {
                if (!validateField(field)) {
                    isFormValid = false;
                }
            });

            if (!isFormValid) {
                showToast('Per favore, correggi gli errori nel form', 'error');
                return;
            }

            // Loading state
            submitBtn.classList.add('btn-loading');

            // Simulate API call
            setTimeout(() => {
                submitBtn.classList.remove('btn-loading');
                showToast('Iscrizione completata! Riceverai il welcome kit digitale.', 'success');
                newsletterForm.reset();

                // Remove validation states
                formFields.forEach(field => {
                    field.closest('.form-group').classList.remove('has-success', 'has-error');
                });
            }, 2000);
        });
    }

    const proposalForm = document.getElementById('proposalForm');
    if (proposalForm) {
        const textarea = proposalForm.querySelector('textarea');
        const charCount = proposalForm.querySelector('.char-count');

        if (textarea && charCount) {
            textarea.addEventListener('input', function() {
                const length = this.value.length;
                charCount.textContent = `${length}/500`;
            });
        }

        // Real-time validation for proposal form
        const formFields = proposalForm.querySelectorAll('input[required], select[required], textarea[required]');
        formFields.forEach(field => {
            field.addEventListener('blur', () => validateField(field));
        });

        proposalForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const submitBtn = this.querySelector('button[type="submit"]');

            // Validate all fields
            let isFormValid = true;
            formFields.forEach(field => {
                if (!validateField(field)) {
                    isFormValid = false;
                }
            });

            if (!isFormValid) {
                showToast('Per favore, completa tutti i campi obbligatori', 'error');
                return;
            }

            // Loading state
            submitBtn.classList.add('btn-loading');

            // Simulate API call
            setTimeout(() => {
                submitBtn.classList.remove('btn-loading');
                showToast('Proposta inviata con successo! Ti contatteremo entro 1 settimana.', 'success');
                proposalForm.reset();
                if (charCount) charCount.textContent = '0/500';

                // Remove validation states
                formFields.forEach(field => {
                    field.closest('.form-group').classList.remove('has-success', 'has-error');
                });
            }, 2500);
        });
    }

    const carouselPrev = document.getElementById('carouselPrev');
    const carouselNext = document.getElementById('carouselNext');
    const carouselTrack = document.getElementById('carouselTrack');

    if (carouselPrev && carouselNext && carouselTrack) {
        let currentIndex = 0;
        const items = carouselTrack.querySelectorAll('.carousel-item');
        const totalItems = items.length;

        function updateCarousel() {
            const offset = -currentIndex * 100;
            carouselTrack.style.transform = `translateX(${offset}%)`;
        }

        carouselPrev.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalItems) % totalItems;
            updateCarousel();
        });

        carouselNext.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalItems;
            updateCarousel();
        });

        setInterval(() => {
            currentIndex = (currentIndex + 1) % totalItems;
            updateCarousel();
        }, 5000);
    }

    const roleData = {
        'coord-dfa': {
            title: 'Coordinatore Dipartimento DFA',
            desc: 'Coordina tutte le attività del team DFA, gestisce il budget e mantiene i rapporti con la direzione.',
            resp: ['Pianificazione strategica eventi', 'Gestione team di 5-8 persone', 'Report mensili alla direzione', 'Coordinamento con altri dipartimenti'],
            skills: 'Leadership, Project Management, Comunicazione efficace',
            time: '8-10 ore/settimana'
        },
        'comm-dfa': {
            title: 'Responsabile Comunicazione DFA',
            desc: 'Gestisce la comunicazione interna ed esterna del dipartimento, crea contenuti e gestisce i canali di comunicazione.',
            resp: ['Creazione contenuti per social e newsletter', 'Gestione comunicazione eventi', 'Coordinamento con ufficio stampa', 'Reportistica attività comunicazione'],
            skills: 'Copywriting, Social Media, Design grafico (plus)',
            time: '5-6 ore/settimana'
        },
        'event-dfa': {
            title: 'Organizzatore Eventi DFA',
            desc: 'Organizza e gestisce gli eventi del dipartimento, dalla pianificazione alla realizzazione.',
            resp: ['Pianificazione logistica eventi', 'Gestione fornitori e partner', 'Coordinamento volontari', 'Follow-up post-evento'],
            skills: 'Organizzazione, Problem solving, Gestione stress',
            time: '6-8 ore/settimana'
        }
    };

    const roleCells = document.querySelectorAll('.role-cell');
    const modal = document.getElementById('roleModal');
    const modalClose = document.querySelector('.modal-close');

    roleCells.forEach(cell => {
        cell.addEventListener('click', function() {
            if (this.classList.contains('occupied')) {
                return;
            }

            const roleKey = this.getAttribute('data-role');
            const data = roleData[roleKey] || {
                title: 'Ruolo disponibile',
                desc: 'Questo è un ruolo aperto nel nostro team. Candidati per saperne di più!',
                resp: ['Collaborare con il team', 'Partecipare alle riunioni', 'Contribuire agli obiettivi del dipartimento'],
                skills: 'Motivazione, Passione per la sostenibilità, Spirito di squadra',
                time: '4-6 ore/settimana'
            };

            document.getElementById('modalTitle').textContent = data.title;
            document.getElementById('roleDesc').textContent = data.desc;
            document.getElementById('roleSkills').textContent = data.skills;
            document.getElementById('roleTime').textContent = data.time;

            const respList = document.getElementById('roleResp');
            respList.innerHTML = '';
            data.resp.forEach(r => {
                const li = document.createElement('li');
                li.textContent = r;
                respList.appendChild(li);
            });

            modal.classList.add('active');
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', function() {
            modal.classList.remove('active');
        });
    }

    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    const applicationForm = document.getElementById('applicationForm');
    if (applicationForm) {
        applicationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Candidatura inviata con successo! Ti contatteremo entro 3 giorni.');
            modal.classList.remove('active');
            applicationForm.reset();
        });
    }

    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            faqItems.forEach(i => i.classList.remove('active'));

            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Messaggio inviato! Ti risponderemo entro 48 ore.');
            contactForm.reset();
        });
    }

    function switchLanguage(lang) {
        document.querySelectorAll('[data-it]').forEach(element => {
            if (lang === 'en' && element.dataset.en) {
                element.textContent = element.dataset.en;
            } else if (lang === 'it' && element.dataset.it) {
                element.textContent = element.dataset.it;
            }
        });

        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-lang="${lang}"]`).classList.add('active');

        localStorage.setItem('selectedLanguage', lang);
    }

    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });

    const savedLang = localStorage.getItem('selectedLanguage') || 'it';
    if (savedLang === 'en') {
        switchLanguage('en');
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    let lastScroll = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            if (header) header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
        } else if (currentScroll > lastScroll && currentScroll > 100) {
            if (header) header.style.transform = 'translateY(-100%)';
        } else {
            if (header) {
                header.style.transform = 'translateY(0)';
                header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.12)';
            }
        }

        lastScroll = currentScroll;
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.event-featured, .community-card, .planning-card, .testimonial-card, .benefit-card');
    fadeElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        fadeObserver.observe(el);
    });

    // Tab functionality for editions
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');

                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                // Add active class to clicked button and corresponding content
                this.classList.add('active');
                const targetContent = document.getElementById('tab-' + tabId);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }
});