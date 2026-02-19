import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiInstagram,
  FiTwitter,
  FiLinkedin,
  FiCheckCircle,
} from "react-icons/fi";
import "../styles/pages/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit contact form");
      }

      // Success
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Get in Touch
        </motion.h1>
        <motion.p
          className="subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Have questions about your career path? We're here to help you navigate
          your journey to success.
        </motion.p>
      </div>

      <div className="contact-container">
        {/* Contact Information */}
        <motion.div
          className="contact-info"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="info-card">
            <div className="info-item">
              <div className="icon-wrapper">
                <FiMail size={24} />
              </div>
              <div className="info-content">
                <h3>Email Us</h3>
                <p>
                  <a href="mailto:support@careerguide.com">
                    support@careerguide.com
                  </a>
                </p>
                <p>
                  <a href="mailto:careers@careerguide.com">
                    careers@careerguide.com
                  </a>
                </p>
              </div>
            </div>

            <div className="info-item">
              <div className="icon-wrapper">
                <FiPhone size={24} />
              </div>
              <div className="info-content">
                <h3>Call Us</h3>
                <p>
                  <a href="tel:+1234567890">+91 9876543210</a>
                </p>
                <p>mon-sat, 9am - 6pm </p>
              </div>
            </div>

            <div className="info-item">
              <div className="icon-wrapper">
                <FiMapPin size={24} />
              </div>
              <div className="info-content">
                <h3>Visit Us</h3>
                <p>123, Cyber park, Vesu</p>
                <p>Surat, Gujarat, India</p>
              </div>
            </div>
          </div>

          <div className="social-connect">
            <h4>Connect With Us</h4>
            <div className="social-icons">
              <a href="#" className="social-btn twitter" aria-label="Twitter">
                <FiTwitter size={20} />
              </a>
              <a href="#" className="social-btn linkedin" aria-label="LinkedIn">
                <FiLinkedin size={20} />
              </a>
              <a
                href="#"
                className="social-btn instagram"
                aria-label="Instagram"
              >
                <FiInstagram size={20} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          className="contact-form-wrapper"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2>Send us a Message</h2>

          {isSubmitted && (
            <motion.div
              className="success-message"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
            >
              <FiCheckCircle size={20} />
              <span>
                Message sent successfully! We'll get back to you soon.
              </span>
            </motion.div>
          )}

          {error && (
            <motion.div
              className="error-message"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              style={{
                padding: "1rem",
                backgroundColor: "#fee",
                border: "1px solid #fcc",
                borderRadius: "8px",
                color: "#c33",
                marginBottom: "1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span>⚠️ {error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Vasu Patel"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="vasu@example.com"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="form-control"
                placeholder="How can we help?"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form-control"
                placeholder="Tell us about your inquiry..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  Send Message <FiSend size={18} />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
