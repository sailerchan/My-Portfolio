/* =============================================
   SCROLL TO ABOUT — for hero landing button
   ============================================= */
function scrollToAbout() {
    const aboutSection = document.getElementById('about') 
                      || document.querySelector('.about-card-section');
    if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}


/* =============================================
   MODAL / LIGHTBOX FUNCTIONS
   ============================================= */

// Open a specific modal by ID
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Close a specific modal by ID
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Lightbox for zooming images
function openLightbox(src) {
    event.stopPropagation();
    document.getElementById('lightbox-img').src = src;
    document.getElementById('lightbox').style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

// Close modal when clicking the dark backdrop
document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});


/* =============================================
   CONTACT SECTION — Interactions
   ============================================= */

// Copy email to clipboard + show toast
function copyEmail(email) {
    navigator.clipboard.writeText(email).then(() => {
        showToast('📋 Email copied to clipboard!');
    }).catch(() => {
        // Fallback for older browsers
        const temp = document.createElement('textarea');
        temp.value = email;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
        showToast('📋 Email copied!');
    });
}

// Toast notification helper
function showToast(message) {
    let toast = document.querySelector('.copy-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'copy-toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');

    clearTimeout(window._toastTimeout);
    window._toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 2200);
}


/* =============================================
   SCROLL REVEAL — fade-in elements on scroll
   ============================================= */
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('[data-reveal]');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        revealElements.forEach(el => observer.observe(el));
    } else {
        // Fallback: just show them
        revealElements.forEach(el => el.classList.add('is-visible'));
    }
});