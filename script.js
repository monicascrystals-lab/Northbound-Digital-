/* ============================================
   NORTHBOUND DIGITAL - JAVASCRIPT
   ============================================ */

// ============================================
// NAVIGATION & SCROLL EFFECTS
// ============================================

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Update active navigation link on scroll
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ============================================
// BACK TO TOP BUTTON
// ============================================

const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================

function revealOnScroll() {
    const elements = document.querySelectorAll('.portfolio-card, .service-card, .benefit-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Set initial state for animations
document.querySelectorAll('.portfolio-card, .service-card, .benefit-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ============================================
// REVIEW SLIDER
// ============================================

let currentReview = 0;
const reviewSlider = document.getElementById('reviewSlider');
const reviews = document.querySelectorAll('.review-card');
const reviewCount = reviews.length;

function showReview(index) {
    // Wrap around if necessary
    if (index >= reviewCount) {
        currentReview = 0;
    } else if (index < 0) {
        currentReview = reviewCount - 1;
    } else {
        currentReview = index;
    }

    // Hide all reviews
    reviews.forEach(review => {
        review.style.display = 'none';
        review.classList.remove('show');
    });

    // Show current review
    reviews[currentReview].style.display = 'block';
    reviews[currentReview].classList.add('show');
}

// Initialize first review
showReview(0);

// Review navigation buttons
document.getElementById('reviewPrev').addEventListener('click', () => {
    showReview(currentReview - 1);
});

document.getElementById('reviewNext').addEventListener('click', () => {
    showReview(currentReview + 1);
});

// Auto-advance reviews every 10 seconds
setInterval(() => {
    showReview(currentReview + 1);
}, 10000);

// Keyboard navigation for reviews
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        showReview(currentReview - 1);
    } else if (e.key === 'ArrowRight') {
        showReview(currentReview + 1);
    }
});

// ============================================
// CONTACT FORM VALIDATION
// ============================================

const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

// Validation rules
const validationRules = {
    name: {
        required: true,
        minLength: 2,
        pattern: /^[a-zA-Z\s]+$/,
        message: 'Please enter a valid name (letters only)'
    },
    email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Please enter a valid email address'
    },
    business: {
        required: true,
        minLength: 2,
        message: 'Please enter your business name'
    },
    'website-type': {
        required: true,
        message: 'Please select a website type'
    },
    budget: {
        required: true,
        message: 'Please select a budget range'
    },
    message: {
        required: true,
        minLength: 10,
        message: 'Please enter at least 10 characters'
    }
};

// Validate individual field
function validateField(fieldName, fieldValue) {
    const rules = validationRules[fieldName];
    const errorElement = document.getElementById(`${fieldName}Error`);

    if (!rules) return true;

    // Check if required
    if (rules.required && !fieldValue.trim()) {
        errorElement.textContent = `${fieldName.replace(/([A-Z])/g, ' $1').trim()} is required`;
        errorElement.classList.add('show');
        return false;
    }

    // Check minimum length
    if (rules.minLength && fieldValue.trim().length < rules.minLength) {
        errorElement.textContent = rules.message;
        errorElement.classList.add('show');
        return false;
    }

    // Check pattern
    if (rules.pattern && !rules.pattern.test(fieldValue.trim())) {
        errorElement.textContent = rules.message;
        errorElement.classList.add('show');
        return false;
    }

    // Clear error if validation passes
    errorElement.classList.remove('show');
    errorElement.textContent = '';
    return true;
}

// Real-time validation
contactForm.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('blur', () => {
        validateField(field.name, field.value);
    });

    field.addEventListener('input', () => {
        if (document.getElementById(`${field.name}Error`).textContent) {
            validateField(field.name, field.value);
        }
    });
});

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate all fields
    let isValid = true;
    const formData = new FormData(contactForm);

    for (let [name, value] of formData.entries()) {
        if (!validateField(name, value)) {
            isValid = false;
        }
    }

    if (isValid) {
        // Show success message
        successMessage.classList.add('show');

        // Prepare email details (for future integration with backend service)
        const emailData = {
            name: formData.get('name'),
            email: formData.get('email'),
            business: formData.get('business'),
            websiteType: formData.get('website-type'),
            budget: formData.get('budget'),
            message: formData.get('message'),
            timestamp: new Date().toLocaleString()
        };

        console.log('Form Data (Ready for backend integration):', emailData);

        // CHANGE: To integrate with email service, uncomment and configure:
        // Example with Formspree (https://formspree.io/):
        // fetch('https://formspree.io/f/YOUR_FORM_ID', {
        //     method: 'POST',
        //     body: JSON.stringify(emailData),
        //     headers: {
        //         'Accept': 'application/json'
        //     }
        // }).then(response => {
        //     if (response.ok) {
        //         successMessage.classList.add('show');
        //         contactForm.reset();
        //     }
        // });

        // OR Example with EmailJS (https://www.emailjs.com/):
        // emailjs.init('YOUR_PUBLIC_KEY');
        // emailjs.send('SERVICE_ID', 'TEMPLATE_ID', emailData)
        //     .then(function(response) {
        //         successMessage.classList.add('show');
        //         contactForm.reset();
        //     });

        // Reset form
        contactForm.reset();

        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);

        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
});

// ============================================
// PORTFOLIO CARD HOVER EFFECTS
// ============================================

const portfolioCards = document.querySelectorAll('.portfolio-card');

portfolioCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// ============================================
// SMOOTH SCROLL BEHAVIOR
// ============================================

// This is handled by CSS (scroll-behavior: smooth), but here's JavaScript backup
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// PAGE LOAD ANIMATIONS
// ============================================

window.addEventListener('load', () => {
    // Animate hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeInUp 1s ease 0.3s backwards';
    }

    // Reveal initial visible elements
    revealOnScroll();
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Debounce scroll events for better performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const debouncedScroll = debounce(() => {
    updateActiveNavLink();
    revealOnScroll();
}, 50);

window.removeEventListener('scroll', updateActiveNavLink);
window.removeEventListener('scroll', revealOnScroll);
window.addEventListener('scroll', debouncedScroll);

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

// Keyboard navigation for buttons
document.querySelectorAll('.btn, .portfolio-link').forEach(button => {
    button.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            button.click();
        }
    });
});

// Focus visible for keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// ============================================
// INITIALIZATION
// ============================================

console.log('Northbound Digital Portfolio - Loaded Successfully');
