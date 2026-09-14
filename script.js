/* ==========================================================================
   PADALA TEJASWINI - PORTFOLIO INTERACTIVE SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initTypewriter();
    initNavbarScroll();
    initMobileMenu();
    initProjectFilters();
    initScrollSpy();
});

/* --------------------------------------------------------------------------
   1. Typewriter Effect
   -------------------------------------------------------------------------- */
const phrases = [
    "ML-Powered Applications",
    "Real-Time Computer Vision Tools",
    "Interactive Power BI Dashboards",
    "Full-Stack Web Solutions"
];

let phraseIndex = 0;
let letterIndex = 0;
let isDeleting = false;
const typingSpeed = 90;
const deletingSpeed = 45;
const pauseDelay = 2000;

function initTypewriter() {
    const targetEl = document.getElementById('typing-text');
    if (!targetEl) return;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            targetEl.textContent = currentPhrase.substring(0, letterIndex - 1);
            letterIndex--;
        } else {
            targetEl.textContent = currentPhrase.substring(0, letterIndex + 1);
            letterIndex++;
        }

        let timeout = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && letterIndex === currentPhrase.length) {
            timeout = pauseDelay;
            isDeleting = true;
        } else if (isDeleting && letterIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            timeout = 400;
        }

        setTimeout(type, timeout);
    }

    type();
}

/* --------------------------------------------------------------------------
   2. Sticky Navbar Effect
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/* --------------------------------------------------------------------------
   3. Mobile Menu Toggle
   -------------------------------------------------------------------------- */
function initMobileMenu() {
    const toggleBtn = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!toggleBtn || !navMenu) return;

    toggleBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = toggleBtn.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.className = 'fa-solid fa-xmark';
        } else {
            icon.className = 'fa-solid fa-bars';
        }
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = toggleBtn.querySelector('i');
            if (icon) icon.className = 'fa-solid fa-bars';
        });
    });
}

/* --------------------------------------------------------------------------
   4. Project Category Filtering
   -------------------------------------------------------------------------- */
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (!filterBtns.length || !projectCards.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filterValue === 'all' || filterValue === category) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/* --------------------------------------------------------------------------
   5. ScrollSpy (Active Navigation Highlight)
   -------------------------------------------------------------------------- */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSection = '';
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}

/* --------------------------------------------------------------------------
   6. Copy Text Helper
   -------------------------------------------------------------------------- */
function copyText(text, btnElement) {
    navigator.clipboard.writeText(text).then(() => {
        const originalIcon = btnElement.innerHTML;
        btnElement.innerHTML = '<i class="fa-solid fa-check" style="color:#00F5A0;"></i>';
        btnElement.title = "Copied!";

        setTimeout(() => {
            btnElement.innerHTML = originalIcon;
            btnElement.title = "Copy";
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

/* --------------------------------------------------------------------------
   7. Contact Form Simulation
   -------------------------------------------------------------------------- */
function handleFormSubmit(event) {
    event.preventDefault();

    const form = document.getElementById('contact-form');
    const toast = document.getElementById('form-toast');
    const nameInput = document.getElementById('name');

    if (!form || !toast) return;

    const senderName = nameInput.value || 'Friend';

    toast.className = 'form-toast success';
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you, <strong>${senderName}</strong>! Your message has been sent successfully. Tejaswini will get back to you soon.`;

    form.reset();

    setTimeout(() => {
        toast.style.display = 'none';
        toast.className = 'form-toast';
    }, 5000);
}
