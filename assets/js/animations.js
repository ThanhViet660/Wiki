// wiki2/assets/js/animations.js — Premium Animation System

// =========================================================
// 1. PAGE TRANSITION — Anti-FOUC + Smooth Reveal
// =========================================================
const initPageTransition = () => {
    let readyId = setTimeout(() => {
        document.body.classList.add('page-ready');
    }, 2000);

    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
            clearTimeout(readyId);
            requestAnimationFrame(() => {
                document.body.classList.add('page-ready');
            });
        });
    } else {
        window.addEventListener('load', () => {
            clearTimeout(readyId);
            document.body.classList.add('page-ready');
        });
    }
};

// =========================================================
// 2. INTERSECTION OBSERVER — Multi-Direction Reveals
// =========================================================
const initScrollAnimations = () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.08
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const mainArea = document.querySelector('main');
    if (!mainArea) return;

    // A. Headers — reveal-up
    mainArea.querySelectorAll('h1, h2, h3').forEach((el) => {
        if (!el.classList.contains('reveal-up') && !el.classList.contains('reveal-left')) {
            el.classList.add('reveal-up');
            revealObserver.observe(el);
        }
    });

    // B. Header descriptions
    mainArea.querySelectorAll('header > p, header + p, .text-on-surface-variant.text-lg').forEach((el) => {
        if (!el.closest('footer') && !el.classList.contains('reveal-up')) {
            el.classList.add('reveal-up');
            el.classList.add('stagger-1');
            revealObserver.observe(el);
        }
    });

    // C. Cards / Grid Items — Staggered reveal
    mainArea.querySelectorAll('.bg-surface-container, .bg-surface-container-low, .bg-surface-container-lowest, .bg-surface-container-high, .bg-surface-container-highest, .glass-card, .glass-panel').forEach((card, index) => {
        if (card.closest('footer') || card.closest('.search-results-dropdown')) return;

        // Premium hover
        if (card.classList.contains('group') || card.closest('.grid')) {
            card.classList.add('premium-card');
        }

        card.classList.add('reveal-up');
        // Stagger based on position in parent grid
        const gridParent = card.closest('.grid');
        if (gridParent) {
            const siblings = Array.from(gridParent.children);
            const siblingIdx = siblings.indexOf(card);
            const staggerClass = `stagger-${Math.min(siblingIdx + 1, 8)}`;
            card.classList.add(staggerClass);
        } else {
            if (index % 3 === 1) card.classList.add('stagger-1');
            if (index % 3 === 2) card.classList.add('stagger-2');
        }

        revealObserver.observe(card);
    });

    // D. Code blocks — reveal-scale
    mainArea.querySelectorAll('pre, .code-block').forEach((el) => {
        if (!el.classList.contains('reveal-scale')) {
            el.classList.add('reveal-scale');
            revealObserver.observe(el);
        }
    });

    // E. Sections
    mainArea.querySelectorAll('section').forEach((el) => {
        if (!el.querySelector('.reveal-up') && !el.classList.contains('reveal-up')) {
            el.classList.add('reveal-up');
            revealObserver.observe(el);
        }
    });

    // F. Nav links premium
    document.querySelectorAll('aside nav a, .nav-bottom-mobile button').forEach(el => {
        el.classList.add('nav-link');
    });
};

// =========================================================
// 3. MAGNETIC HOVER — Cards tilt toward cursor
// =========================================================
const initMagneticHover = () => {
    const cards = document.querySelectorAll('.premium-card, .glow-hover');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -4;
            const rotateY = ((x - centerX) / centerX) * 4;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px) scale(1.01)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
};

// =========================================================
// 4. CURSOR GLOW — Subtle ambient light on hero sections
// =========================================================
const initCursorGlow = () => {
    const heroes = document.querySelectorAll('main > div > header, main > section:first-child header');
    if (!heroes.length) return;

    heroes.forEach(hero => {
        const glow = document.createElement('div');
        glow.style.cssText = `
            position: absolute;
            width: 300px;
            height: 300px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255,143,115,0.08) 0%, transparent 70%);
            pointer-events: none;
            transform: translate(-50%, -50%);
            opacity: 0;
            transition: opacity 0.4s ease;
            z-index: 0;
        `;
        hero.style.position = 'relative';
        hero.style.overflow = 'hidden';
        hero.appendChild(glow);

        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            glow.style.left = (e.clientX - rect.left) + 'px';
            glow.style.top = (e.clientY - rect.top) + 'px';
            glow.style.opacity = '1';
        });

        hero.addEventListener('mouseleave', () => {
            glow.style.opacity = '0';
        });
    });
};

// =========================================================
// 5. PARALLAX — Subtle depth on hero images
// =========================================================
const initParallax = () => {
    const parallaxEls = document.querySelectorAll('.absolute.inset-0 img');
    if (!parallaxEls.length) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                parallaxEls.forEach(el => {
                    const rect = el.getBoundingClientRect();
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        const speed = 0.03;
                        el.style.transform = `translateY(${scrollY * speed}px)`;
                    }
                });
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
};

// =========================================================
// 6. COUNTER ANIMATION — Count up for stats
// =========================================================
const initCounters = () => {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.count || el.textContent.replace(/\D/g, ''));
                if (isNaN(target)) return;

                const suffix = el.textContent.replace(/[\d,]/g, '');
                const duration = 1500;
                const startTime = performance.now();

                function updateCounter(now) {
                    const elapsed = now - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    // Ease-out cubic
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = Math.round(target * eased);
                    el.textContent = current + suffix;

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    }
                }
                requestAnimationFrame(updateCounter);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-count]').forEach(el => {
        counterObserver.observe(el);
    });
};

// =========================================================
// 7. SMOOTH SIDEBAR DROPDOWN
// =========================================================
const initSidebarDropdown = () => {
    const menu = document.getElementById('features-menu');
    if (!menu) return;

    // Add smooth height transition
    menu.style.overflow = 'hidden';
    menu.style.transition = 'max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease';

    if (menu.classList.contains('hidden')) {
        menu.style.maxHeight = '0';
        menu.style.opacity = '0';
        menu.classList.remove('hidden');
        menu.style.display = 'flex';
    } else {
        menu.style.maxHeight = menu.scrollHeight + 'px';
        menu.style.opacity = '1';
    }

    // Override the inline onclick
    const btn = menu.previousElementSibling;
    if (btn && btn.tagName === 'BUTTON') {
        const icon = document.getElementById('features-icon');

        // Remove old onclick
        btn.removeAttribute('onclick');

        btn.addEventListener('click', () => {
            const isOpen = menu.style.maxHeight !== '0px';

            if (isOpen) {
                menu.style.maxHeight = '0';
                menu.style.opacity = '0';
                if (icon) icon.style.transform = 'rotate(0deg)';
            } else {
                menu.style.maxHeight = menu.scrollHeight + 'px';
                menu.style.opacity = '1';
                if (icon) icon.style.transform = 'rotate(180deg)';
            }
        });
    }
};

// =========================================================
// RUNNER — Initialize all systems
// =========================================================
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initSidebarDropdown();

    // Delay non-critical animations
    requestAnimationFrame(() => {
        setTimeout(() => {
            initMagneticHover();
            initCursorGlow();
            initParallax();
            initCounters();
        }, 300);
    });
});

// Run page transition immediately (before DOMContentLoaded)
initPageTransition();
