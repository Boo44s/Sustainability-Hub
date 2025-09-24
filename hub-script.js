document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

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
        const countdownInterval = setInterval(updateCountdown, 1000);
    }

    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Grazie per esserti iscritto alla newsletter! Riceverai una conferma via email.');
            newsletterForm.reset();
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

        proposalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Proposta inviata con successo! Ti contatteremo entro 1 settimana.');
            proposalForm.reset();
            if (charCount) charCount.textContent = '0/500';
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
});