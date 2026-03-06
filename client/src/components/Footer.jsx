import { Link } from "react-router-dom";
import "../styles/components/Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Brand Section - Asymmetric placement */}
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-icon">🎯</span>
              <span className="logo-text gradient-text-premium">
                CareerGuide
              </span>
            </div>
            <p className="footer-tagline">
              Your trusted partner in discovering the perfect career path. We
              believe everyone deserves to find work they love.
            </p>
            <div className="social-links">
              <a href="#" className="social-link twitter" aria-label="Twitter">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a
                href="#"
                className="social-link linkedin"
                aria-label="LinkedIn"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a
                href="#"
                className="social-link instagram"
                aria-label="Instagram"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>

          {/* Links Sections - Intentionally varied spacing */}
          <div className="footer-links-grid">
            <div className="footer-links-column">
              <h4 className="footer-heading">Explore</h4>
              <Link to="/explore" className="footer-link">
                Career Library
              </Link>
              <Link to="/assessment" className="footer-link">
                Take Assessment
              </Link>
              <Link to="/courses" className="footer-link">
                Learning Resources
              </Link>
              <Link to="/counselling" className="footer-link">
                Book Counselling
              </Link>
            </div>

            <div className="footer-links-column">
              <h4 className="footer-heading">Company</h4>
              <Link to="/about" className="footer-link">
                About Us
              </Link>
              <Link to="/pricing" className="footer-link">
                Pricing
              </Link>
              <Link to="/faq" className="footer-link">
                FAQs
              </Link>
              <Link to="/blog" className="footer-link">
                Blog
              </Link>
            </div>

            <div className="footer-links-column">
              <h4 className="footer-heading">Support</h4>
              <Link to="/help-center" className="footer-link">
                Help Center
              </Link>
              <Link to="/contact" className="footer-link">
                Contact Us
              </Link>
              <Link to="/privacy-policy" className="footer-link">
                Privacy Policy
              </Link>
              <a href="#" className="footer-link">
                Terms of Service
              </a>
            </div>

            <div className="footer-links-column">
              <h4 className="footer-heading">Stay Updated</h4>
              <p className="newsletter-text">
                Get career tips and insights delivered to your inbox
              </p>
              <form className="newsletter-form">
                <input
                  type="email"
                  placeholder="Your email"
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="newsletter-btn">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="copyright">
            © {currentYear} CareerGuide. Made with care to help you find your
            path.
          </p>
          <div className="footer-bottom-links">
            <Link to="/privacy-policy" className="footer-bottom-link">
              Privacy
            </Link>
            <span className="separator">•</span>
            <a href="#" className="footer-bottom-link">
              Terms
            </a>
            <span className="separator">•</span>
            <a href="#" className="footer-bottom-link">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
