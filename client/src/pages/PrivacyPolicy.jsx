import React from "react";
import { Link } from "react-router-dom";
import "../styles/pages/PrivacyPolicy.css";

const PrivacyPolicy = () => {
  const lastUpdated = "February 11, 2026"; // Current date or dynamic

  return (
    <div className="privacy-policy fade-in">
      <div className="container">
        <header className="privacy-header">
          {/* <span className="badge badge-primary mb-4">Legal</span> */}
          <h1 className="privacy-title">Privacy Policy</h1>
          <p className="privacy-intro">
            We value your trust and are committed to protecting your personal
            information. This policy outlines how we handle your data with care
            and respect.
          </p>
          <div className="last-updated">Last Updated: {lastUpdated}</div>
        </header>

        <div className="privacy-content">
          {/* Introduction */}
          <section className="privacy-section">
            <h2 className="section-title">
              <span className="section-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </span>
              Introduction
            </h2>
            <p>
              At CareerGuide ("we," "our," or "us"), we are dedicated to
              empowering your career journey. Trust is the foundation of our
              platform, and we believe in complete transparency regarding how we
              collect, use, and protect your information.
            </p>
            <p>
              By accessing or using our services, you agree to the terms of this
              Privacy Policy. If you have any questions, please don't hesitate
              to reach out to our team.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="privacy-section">
            <h2 className="section-title">
              <span className="section-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </span>
              Information We Collect
            </h2>
            <p>
              We collect information to provide you with a personalized and
              seamless experience:
            </p>
            <ul>
              <li>
                <strong>Personal Information:</strong> Name, email address, and
                profile details you provide during registration.
              </li>
              <li>
                <strong>Usage Data:</strong> Information about how you interact
                with our platform, such as courses viewed and assessments taken.
              </li>
              <li>
                <strong>Device Information:</strong> Browser type, IP address,
                and operating system for security and optimization.
              </li>
            </ul>
          </section>

          {/* How We Use Information */}
          <section className="privacy-section">
            <h2 className="section-title">
              <span className="section-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </span>
              How We Use Your Information
            </h2>
            <p>Your data fuels the personalized features of CareerGuide:</p>
            <ul>
              <li>
                <strong>Personalization:</strong> To recommend careers, courses,
                and resources tailored to your profile.
              </li>
              <li>
                <strong>Communication:</strong> To send important updates,
                newsletters (if opted-in), and support responses.
              </li>
              <li>
                <strong>Improvement:</strong> To analyze trends and enhance the
                functionality and user experience of our platform.
              </li>
              <li>
                <strong>Security:</strong> To detect and prevent fraudulent
                activities and unauthorized access.
              </li>
            </ul>
          </section>

          {/* Data Security */}
          <section className="privacy-section">
            <h2 className="section-title">
              <span className="section-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect
                    x="3"
                    y="11"
                    width="18"
                    height="11"
                    rx="2"
                    ry="2"
                  ></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </span>
              Data Protection & Security
            </h2>
            <p>
              We implement industry-standard security measures to safeguard your
              personal information. While no method of transmission over the
              internet is 100% secure, we strive to use commercially acceptable
              means to protect your personal data.
            </p>
            <p>
              We do not sell, trade, or rent your personal identification
              information to others. We may share generic aggregated demographic
              information not linked to any personal identification information
              regarding visitors and users with our business partners.
            </p>
          </section>

          {/* Contact Us */}
          <section className="privacy-section contact-section">
            <h2 className="section-title">
              <span className="section-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </span>
              Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, the practices
              of this site, or your dealings with this site, please contact us
              at:
            </p>
            <div className="mt-4">
              <Link to="/contact" className="btn btn-primary">
                Contact Support
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
