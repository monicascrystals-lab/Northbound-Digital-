document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navLinksItems = Array.from(document.querySelectorAll('.nav-link'));
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  const serviceCards = Array.from(document.querySelectorAll('.service-card'));
  const processCards = Array.from(document.querySelectorAll('.process-card'));
  const revealItems = Array.from(document.querySelectorAll('.reveal'));
  const reviewSlides = Array.from(document.querySelectorAll('.review-slide'));
  const reviewDots = Array.from(document.querySelectorAll('.dot'));
  const prevButton = document.getElementById('prevReview');
  const nextButton = document.getElementById('nextReview');
  const backToTopButton = document.getElementById('backToTop');
  const form = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  const year = document.getElementById('year');

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinksItems.forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const setActiveLink = (id) => {
    navLinksItems.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  };

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    },
    { threshold: 0.35 }
  );

  sections.forEach((section) => sectionObserver.observe(section));

  const toggleAccordion = (button, card) => {
    const isActive = card.classList.toggle('active');
    button.setAttribute('aria-expanded', String(isActive));
  };

  serviceCards.forEach((card) => {
    const button = card.querySelector('.toggle-btn');
    if (button) {
      button.addEventListener('click', () => toggleAccordion(button, card));
    }
  });

  processCards.forEach((card) => {
    const button = card.querySelector('.toggle-btn');
    if (button) {
      button.addEventListener('click', () => toggleAccordion(button, card));
    }
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  let activeReview = 0;
  const showReview = (index) => {
    reviewSlides.forEach((slide, slideIndex) => {
      slide.classList.toggle('active', slideIndex === index);
    });
    reviewDots.forEach((dot, dotIndex) => {
      dot.classList.toggle('active', dotIndex === index);
    });
    activeReview = index;
  };

  const nextReview = () => {
    const nextIndex = (activeReview + 1) % reviewSlides.length;
    showReview(nextIndex);
  };

  const prevReview = () => {
    const prevIndex = (activeReview - 1 + reviewSlides.length) % reviewSlides.length;
    showReview(prevIndex);
  };

  if (reviewSlides.length) {
    showReview(0);

    if (prevButton) {
      prevButton.addEventListener('click', prevReview);
    }

    if (nextButton) {
      nextButton.addEventListener('click', nextReview);
    }

    reviewDots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const index = Number(dot.getAttribute('data-slide'));
        showReview(index);
      });
    });

    setInterval(nextReview, 6000);
  }

  const handleScroll = () => {
    if (window.scrollY > 600) {
      backToTopButton.style.display = 'inline-flex';
    } else {
      backToTopButton.style.display = 'none';
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll();

  if (backToTopButton) {
    backToTopButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetId = anchor.getAttribute('href');
      if (targetId && targetId !== '#') {
        const target = document.querySelector(targetId);
        if (target) {
          event.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const name = form.querySelector('#name');
      const email = form.querySelector('#email');
      const message = form.querySelector('#message');
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      let isValid = true;

      if (!name.value.trim()) {
        name.setCustomValidity('Please enter your name.');
        isValid = false;
      } else {
        name.setCustomValidity('');
      }

      if (!email.value.trim() || !emailPattern.test(email.value.trim())) {
        email.setCustomValidity('Please enter a valid email address.');
        isValid = false;
      } else {
        email.setCustomValidity('');
      }

      if (!message.value.trim()) {
        message.setCustomValidity('Please include a message.');
        isValid = false;
      } else {
        message.setCustomValidity('');
      }

      if (!isValid) {
        form.reportValidity();
        formMessage.textContent = 'Please complete the required fields.';
        return;
      }

      formMessage.textContent = 'Thanks for your enquiry. This demo form validates locally. Connect Formspree or Netlify later to send real submissions.';
      form.reset();
    });
  }
});
