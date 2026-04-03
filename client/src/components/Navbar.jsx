import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/components/Navbar.css";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserMenuOpen]);

  // Close user and mobile menus when route changes
  useEffect(() => {
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`}>
      <div className="container">
        <div className="navbar-content">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <span className="logo-icon">🎯</span>
            <span className="logo-text">CareerGuide</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="navbar-links">
            <Link
              to="/"
              className={`nav-link ${isActive("/") ? "active" : ""}`}
            >
              Home
            </Link>
            <Link
              to="/explore"
              className={`nav-link ${isActive("/explore") ? "active" : ""}`}
            >
              Explore Careers
            </Link>
            <Link
              to="/courses"
              className={`nav-link ${isActive("/courses") ? "active" : ""}`}
            >
              Courses
            </Link>
            <Link
              to="/about"
              className={`nav-link ${isActive("/about") ? "active" : ""}`}
            >
              About
            </Link>
            <Link
              to="/pricing"
              className={`nav-link ${isActive("/pricing") ? "active" : ""}`}
            >
              Pricing
            </Link>
          </div>

          {/* Auth Section */}
          <div className="navbar-auth">
            {isAuthenticated ? (
              <div className="user-menu-container" ref={userMenuRef}>
                <button
                  className="user-menu-trigger"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <div className="user-avatar">
                    {user?.full_name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <span className="user-name">{user?.full_name}</span>
                  <svg
                    className="chevron-icon"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M4 6L8 10L12 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {isUserMenuOpen && (
                  <div className="user-dropdown">
                    <Link to="/dashboard" className="dropdown-item">
                      Dashboard
                    </Link>
                    <Link to="/counselling" className="dropdown-item">
                      Counselling
                    </Link>
                    <Link to="/settings" className="dropdown-item">
                      Settings
                    </Link>
                    {!!user?.is_admin && (
                      <Link
                        to="/admin"
                        className="dropdown-item dropdown-item-admin"
                      >
                        ⚙️ Admin Panel
                      </Link>
                    )}
                    <div className="dropdown-divider"></div>
                    <button onClick={handleLogout} className="dropdown-item">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="btn btn-secondary btn-sm">
                  Login
                </Link>
                <Link to="/register" className="btn    btn-sm">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-menu">
            <Link to="/" className="mobile-nav-link">
              Home
            </Link>
            <Link to="/explore" className="mobile-nav-link">
              Explore Careers
            </Link>
            <Link to="/courses" className="mobile-nav-link">
              Courses
            </Link>
            <Link to="/about" className="mobile-nav-link">
              About
            </Link>
            <Link to="/pricing" className="mobile-nav-link">
              Pricing
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="mobile-nav-link">
                  Dashboard
                </Link>
                <Link to="/counselling" className="mobile-nav-link">
                  Counselling
                </Link>
                {!!user?.is_admin && (
                  <Link
                    to="/admin"
                    className="mobile-nav-link mobile-nav-link-admin"
                  >
                    ⚙️ Admin Panel
                  </Link>
                )}
                <button onClick={handleLogout} className="mobile-nav-link">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="mobile-nav-link">
                  Login
                </Link>
                <Link to="/register" className="mobile-nav-link">
                  Get Started
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
