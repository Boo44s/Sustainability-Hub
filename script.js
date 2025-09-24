document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const tabs = document.querySelectorAll('.tab');
    const eventCards = document.querySelectorAll('.event-card');
    const navLinks = document.querySelectorAll('.nav-menu a');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            const selectedDay = this.getAttribute('data-day');

            eventCards.forEach((card, index) => {
                const cardDates = card.getAttribute('data-date').split(',');

                if (selectedDay === 'all') {
                    card.style.display = 'block';
                    card.style.animation = 'none';
                    setTimeout(() => {
                        card.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s forwards`;
                    }, 10);
                } else {
                    if (cardDates.includes(selectedDay)) {
                        card.style.display = 'block';
                        card.style.animation = 'none';
                        setTimeout(() => {
                            card.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s forwards`;
                        }, 10);
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });

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

    const sections = document.querySelectorAll('.team-card, .contact-content > *');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

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
            header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            header.style.transform = 'translateY(0)';
        } else if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        }

        lastScroll = currentScroll;
    });
});