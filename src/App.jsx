import { useEffect, useMemo, useState } from 'react';
import GradientText from './components/react-bits/GradientText';
import MagicBento from './components/react-bits/MagicBento';
import MagicBentoCard from './components/react-bits/MagicBentoCard';
import Plasma from './components/react-bits/Plasma';
import TargetCursor from './components/react-bits/TargetCursor/TargetCursor';

// CHANGE: Business name, your name, email address, WhatsApp number, and social links here.
const businessName = 'Northbound Digital';
const myName = 'Monica';
const emailAddress = 'hello@northbounddigital.com';
const whatsappNumber = '076 611 5666';

// CHANGE: Portfolio projects, screenshots, and website links here.
const portfolioItems = [
  {
    image: '/images/Project Images/Screenshot 2026-07-15 215743.png',
    title: 'Sample Business 1',
    category: 'E-Commerce Store',
    description: 'A premium shopping experience designed to feel elevated, clear, and easy to browse on every device.',
    href: 'https://www.northbounddigital.com',
  },
  {
    image: '/images/Project Images/Screenshot 2026-07-15 215903.png',
    title: 'Sample Business 2',
    category: 'Professional Services',
    description: 'A refined service website with crystal-clear messaging, trust-building sections, and effortless contact flow.',
    href: 'https://www.northbounddigital.com',
  },
  {
    image: '/images/hero.svg',
    title: 'Sample Business 3',
    category: 'Creative Portfolio',
    description: 'A polished, editorial style website for a client who wanted a memorable online presence.',
    href: 'https://www.northbounddigital.com',
  },
  {
    image: '/images/about.svg',
    title: 'Sample Business 4',
    category: 'Consulting Firm',
    description: 'A strategic, high-trust layout that balances authority, clarity, and strong calls to action.',
    href: 'https://www.northbounddigital.com',
  },
];

// CHANGE: Services offered here.
const services = [
  'One-page business websites',
  'Multi-page websites',
  'Website redesigns',
  'Mobile-friendly design',
  'Basic SEO setup',
  'Hosting and domain setup',
  'Website maintenance',
];

const processSteps = ['Consultation', 'Design', 'Development', 'Review', 'Launch'];

const whyChooseMe = [
  'Premium professional design',
  'Mobile-friendly websites',
  'Personal service',
  'Clear pricing',
  'Fast turnaround',
  'Ongoing support',
];

// CHANGE: Reviews here.
const reviews = [
  {
    name: 'Alicia M.',
    business: 'Boutique Studio',
    quote: 'The new site feels elevated, calm, and unmistakably premium. Clients instantly understand our value.',
  },
  {
    name: 'Daniel R.',
    business: 'Luxury Consultancy',
    quote: 'Everything felt thoughtful and polished. The process was calm, clear, and incredibly professional.',
  },
  {
    name: 'Sophie T.',
    business: 'Wellness Practice',
    quote: 'The redesign gave our business a fresh identity and helped us feel more confident online.',
  },
];

const initialFormState = {
  name: '',
  email: '',
  business: '',
  websiteType: '',
  budget: '',
  message: '',
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [formStatus, setFormStatus] = useState('');

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const currentReview = useMemo(() => reviews[reviewIndex], [reviewIndex]);

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.name.trim()) nextErrors.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) nextErrors.email = 'Please enter a valid email address.';
    if (!formData.business.trim()) nextErrors.business = 'Please add your business name.';
    if (!formData.websiteType) nextErrors.websiteType = 'Please choose a website type.';
    if (!formData.budget) nextErrors.budget = 'Please select a budget range.';
    if (formData.message.trim().length < 10) nextErrors.message = 'Please share a few more details.';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) {
      setFormStatus('Please fix the highlighted fields before sending.');
      return;
    }

    setFormStatus('Thanks for reaching out. This demo form is ready to connect to Formspree, Netlify Forms, or EmailJS when you add a real endpoint.');
    setFormData(initialFormState);
    setErrors({});
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'services', label: 'Services' },
    { id: 'process', label: 'Process' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      <TargetCursor cursorColor="#C18D52" cursorColorOnTarget="#C18D52" />
      <header className="site-header">
        <nav className="navbar" aria-label="Primary navigation">
          <div className="container nav-shell">
            <a className="brand" href="#home" onClick={() => setMenuOpen(false)}>
              {/* CHANGE: Business name here */}
              {businessName}
            </a>
            <button
              className={`menu-toggle ${menuOpen ? 'open' : ''}`}
              type="button"
              aria-label="Toggle navigation"
              aria-expanded={menuOpen}
              aria-controls="primary-nav"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span />
              <span />
              <span />
            </button>
            <div id="primary-nav" className={`nav-links ${menuOpen ? 'open' : ''}`}>
              {navLinks.map((link) => (
                <a key={link.id} href={`#${link.id}`} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <Plasma />
          <div className="hero-overlay" />
          <div className="container hero-content">
            <MagicBentoCard variant="hero" interactive={false} spotlight={false} className="hero-card">
              <p className="eyebrow">Luxury web design for ambitious small businesses</p>
              <GradientText as="h1" className="hero-title">
                Premium websites designed to make your business stand out
              </GradientText>
              <p className="hero-copy">
                I create refined, mobile-friendly websites that build trust, elevate your brand, and help visitors take the next step with confidence.
              </p>
              <div className="button-row">
                <a className="btn btn-primary" href="#portfolio">View My Work</a>
                <a className="btn btn-secondary" href="#contact">Request a Website</a>
              </div>
            </MagicBentoCard>
          </div>
        </section>

        <section className="section" id="about">
          <div className="container section-grid">
            <MagicBentoCard variant="about" interactive={true} spotlight={true} className="image-card">
              <img src="/images/Project Images/Image2/20240214_192719fgdgdfg.png" alt="Monica as a website designer" />
            </MagicBentoCard>
            <MagicBentoCard variant="about" interactive={true} spotlight={true} className="content-card">
              <p className="eyebrow">About</p>
              <h2>Professional websites for businesses that want to feel exceptional</h2>
              <p>
                Hi, I’m <strong>{myName}</strong>, the designer behind {businessName}. I create professional, mobile-friendly websites for small businesses that want their online presence to feel as polished as their services.
              </p>
              <p>
                Every site is designed with clarity, calm elegance, and conversion in mind so your visitors feel confident from the first click.
              </p>
              <a className="text-link" href="#contact">Let’s build something beautiful</a>
            </MagicBentoCard>
          </div>
        </section>

        <section className="section section-alt" id="portfolio">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Portfolio</p>
              <h2>Selected work with a polished, premium feel</h2>
              <p>Each project reflects a thoughtful blend of strategy, typography, and elegant user experience.</p>
            </div>
            <MagicBento items={portfolioItems} />
          </div>
        </section>

        <section className="section" id="services">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Services</p>
              <h2>Web services designed to make your business easier to trust</h2>
            </div>
            <div className="card-grid">
              {services.map((service) => (
                <MagicBentoCard key={service} variant="service" interactive={true} spotlight={true}>
                  <h3>{service}</h3>
                  <p>Thoughtful digital experiences tailored to growing businesses and professional brands.</p>
                </MagicBentoCard>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-alt" id="process">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Process</p>
              <h2>A calm, streamlined path from idea to launch</h2>
            </div>
            <div className="process-list">
              {processSteps.map((step, index) => (
                <MagicBentoCard key={step} variant="soft" interactive={true} spotlight={false} className="process-step">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{step}</h3>
                </MagicBentoCard>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="why-choose-me">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Why choose me</p>
              <h2>Luxury standards without the overwhelm</h2>
            </div>
            <div className="card-grid">
              {whyChooseMe.map((item) => (
                <MagicBentoCard key={item} variant="soft" interactive={true} spotlight={false}>
                  <h3>{item}</h3>
                </MagicBentoCard>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-alt" id="reviews">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Reviews</p>
              <h2>Placeholder testimonials ready for your real client feedback</h2>
            </div>
            <MagicBentoCard variant="soft" interactive={true} spotlight={false} className="review-card" aria-live="polite">
              <p>“{currentReview.quote}”</p>
              <strong>{currentReview.name}</strong>
              <span>{currentReview.business}</span>
              <div className="review-controls">
                <button type="button" onClick={() => setReviewIndex((index) => (index === 0 ? reviews.length - 1 : index - 1))}>
                  Previous
                </button>
                <button type="button" onClick={() => setReviewIndex((index) => (index === reviews.length - 1 ? 0 : index + 1))}>
                  Next
                </button>
              </div>
            </MagicBentoCard>
          </div>
        </section>

        <section className="section" id="contact">
          <div className="container contact-grid">
            <MagicBentoCard variant="soft" interactive={true} spotlight={false} className="section-card content-card">
              <p className="eyebrow">Contact</p>
              <h2>Let’s create a website your clients will remember</h2>
              <p>
                Email me at <a href={`mailto:${emailAddress}`}>{emailAddress}</a> or reach out on WhatsApp at <a href={`https://wa.me/${whatsappNumber.replace(/\D/g, '')}`}>{whatsappNumber}</a>.
              </p>
              <div className="contact-links">
                <a className="btn btn-primary" href={`mailto:${emailAddress}`}>Email Me</a>
                <a className="btn btn-secondary" href={`https://wa.me/${whatsappNumber.replace(/\D/g, '')}`}>WhatsApp</a>
              </div>
            </MagicBentoCard>
            <MagicBentoCard variant="soft" interactive={false} spotlight={false} className="section-card form-card">
              <form onSubmit={handleSubmit} noValidate>
                <label>
                  Name
                  <input value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} />
                  {errors.name && <span className="field-error">{errors.name}</span>}
                </label>
                <label>
                  Email
                  <input type="email" value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} />
                  {errors.email && <span className="field-error">{errors.email}</span>}
                </label>
                <label>
                  Business name
                  <input value={formData.business} onChange={(event) => setFormData({ ...formData, business: event.target.value })} />
                  {errors.business && <span className="field-error">{errors.business}</span>}
                </label>
                <label>
                  Type of website
                  <select value={formData.websiteType} onChange={(event) => setFormData({ ...formData, websiteType: event.target.value })}>
                    <option value="">Select one</option>
                    <option value="One-page">One-page</option>
                    <option value="Multi-page">Multi-page</option>
                    <option value="Redesign">Redesign</option>
                  </select>
                  {errors.websiteType && <span className="field-error">{errors.websiteType}</span>}
                </label>
                <label>
                  Budget
                  <select value={formData.budget} onChange={(event) => setFormData({ ...formData, budget: event.target.value })}>
                    <option value="">Select one</option>
                    <option value="Under $1,500">Under $1,500</option>
                    <option value="$1,500 - $3,000">$1,500 - $3,000</option>
                    <option value="$3,000+">$3,000+</option>
                  </select>
                  {errors.budget && <span className="field-error">{errors.budget}</span>}
                </label>
                <label>
                  Message
                  <textarea value={formData.message} onChange={(event) => setFormData({ ...formData, message: event.target.value })} rows="5" />
                  {errors.message && <span className="field-error">{errors.message}</span>}
                </label>
                <button className="btn btn-primary" type="submit">Send Inquiry</button>
                {formStatus && <p className="form-status">{formStatus}</p>}
                <p className="form-note">To connect this form, add a Formspree, Netlify Forms, or EmailJS endpoint in the submit handler inside App.jsx.</p>
              </form>
            </MagicBentoCard>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-shell">
          <MagicBentoCard variant="soft" interactive={false} spotlight={false} className="footer-card">
            <h3>{businessName}</h3>
            <p>{emailAddress}</p>
            <p>{whatsappNumber}</p>
          </MagicBentoCard>
          <MagicBentoCard variant="soft" interactive={false} spotlight={false} className="footer-card">
            <div className="footer-links">
              <a href="#home">Home</a>
              <a href="#portfolio">Portfolio</a>
              <a href="#contact">Contact</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms &amp; Conditions</a>
            </div>
          </MagicBentoCard>
          <MagicBentoCard variant="soft" interactive={false} spotlight={false} className="footer-card">
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
          </MagicBentoCard>
        </div>
      </footer>
    </>
  );
}

export default App;
