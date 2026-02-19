import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/pages/HelpCenter.css";

const HelpCenter = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const helpTopics = [
    {
      id: 1,
      title: "Getting Started",
      description: "Everything you need to know about setting up your profile.",
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
      ),
    },
    {
      id: 2,
      title: "Account & Profile",
      description: "Manage your personal information and privacy settings.",
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      ),
    },
    {
      id: 3,
      title: "Career Tests",
      description: "How to interpret your assessment (RIASEC) results.",
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
        </svg>
      ),
    },
    {
      id: 4,
      title: "Pricing & Billing",
      description: "Understanding plans, payments, and invoices.",
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
          <line x1="1" y1="10" x2="23" y2="10"></line>
        </svg>
      ),
    },
    {
      id: 5,
      title: "Counselling",
      description: "How to book and prepare for 1-on-1 sessions.",
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
      ),
    },
    {
      id: 6,
      title: "Security",
      description: "Keeping your account and data safe.",
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      ),
    },
  ];

  const faqs = [
    {
      question: "Can I retake the assessment test?",
      answer:
        "Yes, you can retake the assessment test at any time. We recommend taking it every 6 months or when you feel your interests have significantly changed. Go to your Dashboard and click 'Retake Assessment'.",
    },
    {
      question: "How accurate are the career predictions?",
      answer:
        "Our algorithm is based on the RIASEC model and Big Five personality traits, which are scientifically validated frameworks. While no test is 100% perfect, our users report an 85%+ satisfaction rate with their career matches.",
    },
    {
      question: "Is my personal data shared with recruiters?",
      answer:
        "No, we take your privacy seriously. Your assessment results and personal data are private by default. You can choose to make your profile visible to recruiters in your Privacy Settings.",
    },
    {
      question: "What is the difference between Free and Premium plans?",
      answer:
        "The Free plan includes the basic assessment and top 3 career matches. Premium unlocks detailed career roadmaps, salary insights, learning resources, and priority support.",
    },
  ];

  return (
    <div className="help-center-page fade-in">
      {/* Hero Section */}
      <section className="help-hero">
        <div className="hero-shape shape-1"></div>
        <div className="hero-shape shape-2"></div>
        <div className="container help-hero-content">
          <h1 className="help-title">How can we help?</h1>
          <p className="help-subtitle">
            Search for answers or browse topics below
          </p>
          <div className="search-container">
            <svg
              className="search-icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              className="help-search-input"
              placeholder="Search for articles, guides, and more..."
            />
          </div>
        </div>
      </section>

      <div className="container">
        {/* Topics Grid */}
        <section className="help-topics-section">
          <div className="topics-grid">
            {helpTopics.map((topic, index) => (
              <div
                key={topic.id}
                className="topic-card fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="topic-icon">{topic.icon}</div>
                <h3 className="topic-title">{topic.title}</h3>
                <p className="topic-description">{topic.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section">
          <div className="section-header">
            <div className="badge-pill inline-flex mx-auto mb-4">
              <span className="badge-dot"></span>
              Common Questions
            </div>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>
          <div className="faq-container">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`faq-item ${activeIndex === index ? "active" : ""}`}
              >
                <button
                  className="faq-question"
                  onClick={() => toggleAccordion(index)}
                >
                  {faq.question}
                  <svg
                    className="faq-icon"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="help-cta-section">
          <div className="help-cta-card">
            <div className="cta-icon-group">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80"
                alt="Support Agent"
                className="cta-avatar"
              />
              <img
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80"
                alt="Support Agent"
                className="cta-avatar"
              />
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80"
                alt="Support Agent"
                className="cta-avatar"
              />
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">Still need help?</h3>
              <p className="text-gray-600 mb-6">
                Our support team is just a click away. We usually reply within 2
                hours.
              </p>
              <Link to="/contact" className="btn btn-primary btn-lg">
                Contact Support
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HelpCenter;
