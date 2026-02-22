// Theme Toggle
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const toggleSlider = themeToggle.querySelector('.toggle-slider');
    const body = document.body;

    const currentTheme = localStorage.getItem('theme') || 'dark';
    if (currentTheme === 'light') {
        body.classList.add('light-mode');
        themeToggle.classList.add('active');
        toggleSlider.textContent = '☀️';
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        themeToggle.classList.toggle('active');
        
        if (body.classList.contains('light-mode')) {
            toggleSlider.textContent = '☀️';
            localStorage.setItem('theme', 'light');
        } else {
            toggleSlider.textContent = '🌙';
            localStorage.setItem('theme', 'dark');
        }
    });
}

// Navbar scroll effect
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinksContainer = document.getElementById('navLinks');
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinksContainer.classList.remove('active');
        });
    });

    // Active link on scroll
    const sections = document.querySelectorAll('section, header[id], footer[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Modal functionality
function initModal() {
    const modal = document.getElementById('projectModal');
    const closeBtn = document.querySelector('.modal-close');
    const modalTitle = document.querySelector('.modal-title');
    const modalDescription = document.querySelector('.modal-description');
    const modalImage = document.querySelector('.modal-image');
    const modalFeatures = document.querySelector('.modal-features');
    const modalChallenges = document.querySelector('.modal-challenges');
    const modalTech = document.querySelector('.modal-tech');
    const modalDemo = document.querySelector('.modal-demo');
    const modalSource = document.querySelector('.modal-source');

    function parseList(value) {
        if (!value) return [];
        return value
            .split('|')
            .map(item => item.trim())
            .filter(Boolean);
    }

    function renderList(container, items, fallbackText) {
        if (!container) return;
        if (!items.length) {
            container.innerHTML = `<li>${fallbackText}</li>`;
            return;
        }
        container.innerHTML = items.map(item => `<li>${item}</li>`).join('');
    }

    function setModalLink(linkElement, href, text) {
        if (!linkElement) return;
        linkElement.textContent = text;
        if (!href || href === '#') {
            linkElement.style.display = 'none';
            linkElement.removeAttribute('href');
            return;
        }
        linkElement.style.display = 'inline-flex';
        linkElement.setAttribute('href', href);
    }

    // Ouvrir modal au clic sur la card
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.project-link')) {
                const title = card.querySelector('.project-title').textContent;
                const description = card.dataset.detail || card.querySelector('.project-description').textContent;
                const image = card.querySelector('.project-image img')?.src || '';
                const featureList = parseList(card.dataset.features);
                const challengeList = parseList(card.dataset.challenges);
                const techTags = Array.from(card.querySelectorAll('.tech-tag')).map(tag => tag.textContent.trim());
                const primaryLink = card.querySelector('.link-primary');
                const secondaryLink = card.querySelector('.link-secondary');
                
                modalTitle.textContent = title;
                modalDescription.textContent = description;
                
                if (image) {
                    modalImage.src = image;
                    modalImage.style.display = 'block';
                } else {
                    modalImage.style.display = 'none';
                }

                renderList(modalFeatures, featureList, 'Fonctionnalités détaillées bientôt disponibles.');
                renderList(modalChallenges, challengeList, 'Détails techniques à venir.');

                modalTech.innerHTML = techTags
                    .map(tag => `<span class="modal-tech-tag">${tag}</span>`)
                    .join('');

                setModalLink(
                    modalDemo,
                    primaryLink?.getAttribute('href') || '',
                    primaryLink?.textContent.trim() || 'Voir le projet'
                );

                setModalLink(
                    modalSource,
                    secondaryLink?.getAttribute('href') || '',
                    secondaryLink?.textContent.trim() || 'Code source'
                );
                
                modal.classList.add('active');
            }
        });
    });

    // Fermer modal
    closeBtn?.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal?.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Fermer au clavier
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modal.classList.remove('active');
        }
    });
}

// Animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.project-card').forEach(card => {
        observer.observe(card);
    });

    // // Parallax effect
    // window.addEventListener('scroll', () => {
    //     const scrolled = window.pageYOffset;
    //     const rate = scrolled * -0.3;
        
    //     document.querySelectorAll('.project-image').forEach((image, index) => {
    //         const rect = image.getBoundingClientRect();
    //         if (rect.top < window.innerHeight && rect.bottom > 0) {
    //             image.style.transform = `translateY(${rate * 0.1}px)`;
    //         }
    //     });
    // });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavbar();
    initModal();
    initAnimations();
});