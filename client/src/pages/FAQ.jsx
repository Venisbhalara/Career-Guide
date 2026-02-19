import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/pages/FAQ.css";

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeIndex, setActiveIndex] = useState(null);

  const categories = [
    { id: "all", name: "All Questions" },
    { id: "general", name: "General" },
    { id: "account", name: "Account & Billing" },
    { id: "career", name: "Career Services" },
    { id: "technical", name: "Technical Support" },
  ];

  const faqs = [
    {
      id: 1,
      category: "general",
      question: "What is CareerGuide and how does it help me?",
      answer:
        "CareerGuide is an advanced AI-powered career discovery platform. We combine psychometric assessments, market data, and personalized learning paths to help you identify and achieve your ideal career goals. Whether you're a student choosing a major or a professional looking to pivot, we provide the roadmap you need.",
    },
    {
      id: 2,
      category: "general",
      question: "Is CareerGuide suitable for experienced professionals?",
      answer:
        "Absolutely. While we support students and graduates, our 'Pro' and 'Premium' tiers are specifically designed for mid-career professionals. We offer industry-shifting strategies, executive coaching, and advanced skill gap analysis to help you level up or switch industries completely.",
    },
    {
      id: 3,
      category: "account",
      question: "Can I upgrade or downgrade my plan at any time?",
      answer:
        "Yes, flexibility is key. You can upgrade to a higher tier immediately to unlock more features. If you choose to downgrade, the changes will take effect at the start of your next billing cycle. We believe you should only pay for what you value.",
    },
    {
      id: 4,
      category: "account",
      question: "Do you offer refunds if I'm not satisfied?",
      answer:
        "We stand by the quality of our services with a 30-day money-back guarantee. If you don't feel CareerGuide has provided value to your professional journey within the first month, simply contact our support team for a full refund—no questions asked.",
    },
    {
      id: 5,
      category: "career",
      question: "How accurate are the career assessments?",
      answer:
        "Our assessments are built on verified psychometric frameworks (like Big Five and RIASEC) and calibrated with real-world job satisfaction data. While no test is 100% predictive, our users report a 94% alignment rate between our recommendations and their own long-term job satisfaction.",
    },
    {
      id: 6,
      category: "career",
      question: "What does the 1-on-1 coaching include?",
      answer:
        "1-on-1 coaching (available in Premium plans) connects you with a certified career coach in your target industry. Sessions include resume reviews, mock interviews, strategic career planning, and networking advice tailored specifically to your goals and challenges.",
    },
    {
      id: 7,
      category: "technical",
      question: "Does the platform work on mobile devices?",
      answer:
        "Yes, CareerGuide is fully responsive. You can take assessments, watch courses, and chat with mentors directly from your smartphone or tablet. We recommend using a desktop for the most immersive experience during detailed resume editing or coding exercises.",
    },
    {
      id: 8,
      category: "technical",
      question: "How do I reset my password?",
      answer:
        "If you've forgotten your password, click on the 'Forgot Password' link on the login page. Enter your registered email address, and we'll send you a secure link to reset your credentials. For security reasons, the link expires after 60 minutes.",
    },
  ];

  const filteredFaqs =
    activeCategory === "all"
      ? faqs
      : faqs.filter((faq) => faq.category === activeCategory);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-page">
      <div className="faq-hero">
        <div className="container faq-hero-content">
          <span className="faq-badge">Help Center</span>
          <h1 className="faq-title">Frequently Asked Questions</h1>
          <p className="faq-subtitle">
            Everything you need to know about CareerGuide. Can't find the answer
            you're looking for? Chat to our friendly team.
          </p>
        </div>
      </div>

      <div className="container">
        {/* Categories */}
        <div className="faq-categories">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`category-btn ${activeCategory === cat.id ? "active" : ""}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="faq-container">
          {filteredFaqs.map((faq, index) => (
            <div
              key={faq.id}
              className={`faq-accordion-item ${activeIndex === index ? "active" : ""}`}
            >
              <button
                className="faq-question"
                onClick={() => toggleAccordion(index)}
                aria-expanded={activeIndex === index}
              >
                <h3>{faq.question}</h3>
                <span className="faq-icon"></span>
              </button>
              <div
                className="faq-answer"
                style={{
                  maxHeight: activeIndex === index ? "200px" : "0",
                }}
              >
                <div className="faq-answer-content">
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}

          {filteredFaqs.length === 0 && (
            <div className="no-results">
              <p>No questions found in this category.</p>
            </div>
          )}
        </div>

        {/* Contact CTA */}
        <div className="faq-contact-card">
          <h2 className="faq-contact-title">Still have questions?</h2>
          <p className="faq-contact-text">
            We're here to help you every step of the way. Contact our support
            team for personalized assistance.
          </p>
          <Link to="/contact" className="btn btn-primary">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
