import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/pages/Pricing.css";

const Pricing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [billingCycle, setBillingCycle] = useState("monthly"); // monthly or yearly
  const [selectedPlan, setSelectedPlan] = useState(null);

  const pricingPlans = [
    {
      id: "free",
      name: "Explorer",
      tagline: "Perfect for getting started",
      price: { monthly: 0, yearly: 0 },
      popular: false,
      features: [
        { text: "Basic career assessment", included: true },
        { text: "Access to 50+ career profiles", included: true },
        { text: "Community forum access", included: true },
        { text: "Weekly career tips newsletter", included: true },
        { text: "Limited course previews", included: true },
        { text: "1 counselling session", included: false },
        { text: "Advanced AI recommendations", included: false },
        { text: "Priority support", included: false },
      ],
      cta: "Get Started Free",
      color: "var(--color-text-secondary)",
    },
    {
      id: "pro",
      name: "Professional",
      tagline: "For serious career planners",
      price: { monthly: 29, yearly: 290 },
      popular: true,
      features: [
        { text: "Advanced career assessment", included: true },
        { text: "Access to 500+ career profiles", included: true },
        { text: "Unlimited course access", included: true },
        { text: "AI-powered career matching", included: true },
        { text: "5 counselling sessions/month", included: true },
        { text: "Personalized learning path", included: true },
        { text: "Resume builder & templates", included: true },
        { text: "Priority email support", included: true },
      ],
      cta: "Start Pro Trial",
      color: "var(--color-primary)",
    },
    {
      id: "premium",
      name: "Premium",
      tagline: "Complete career transformation",
      price: { monthly: 79, yearly: 790 },
      popular: false,
      features: [
        { text: "Everything in Professional", included: true },
        { text: "Unlimited counselling sessions", included: true },
        { text: "1-on-1 career coaching", included: true },
        { text: "Industry mentor connections", included: true },
        { text: "Job placement assistance", included: true },
        { text: "Exclusive masterclasses", included: true },
        { text: "LinkedIn profile optimization", included: true },
        { text: "24/7 priority support", included: true },
      ],
      cta: "Go Premium",
      color: "var(--color-secondary)",
    },
  ];

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan.id);

    if (plan.id === "free") {
      if (user) {
        navigate("/dashboard");
      } else {
        navigate("/register");
      }
    } else {
      // In a real app, this would integrate with Stripe/PayPal
      if (user) {
        // Navigate to payment page
        navigate("/payment", {
          state: { selectedPlan: plan.id, billingCycle },
        });
      } else {
        navigate("/register", {
          state: { selectedPlan: plan.id, billingCycle },
        });
      }
    }
  };

  const calculateSavings = (plan) => {
    if (plan.price.monthly === 0) return 0;
    const monthlyTotal = plan.price.monthly * 12;
    const yearlySavings = monthlyTotal - plan.price.yearly;
    return Math.round((yearlySavings / monthlyTotal) * 100);
  };

  return (
    <div className="pricing-page">
      {/* Hero Section */}
      <section className="pricing-hero">
        <div className="container">
          <div className="pricing-hero-content">
            <span className="pricing-badge">Pricing Plans</span>
            <h1 className="pricing-title">
              Invest in Your{" "}
              <span className="gradient-text">Future Career</span>
            </h1>
            <p className="pricing-subtitle">
              Choose the perfect plan to unlock your potential. Start free,
              upgrade anytime.
            </p>

            {/* Billing Toggle */}
            <div className="billing-toggle">
              <span className={billingCycle === "monthly" ? "active" : ""}>
                Monthly
              </span>
              <button
                className="toggle-switch"
                onClick={() =>
                  setBillingCycle(
                    billingCycle === "monthly" ? "yearly" : "monthly",
                  )
                }
                aria-label="Toggle billing cycle"
              >
                <span
                  className={`toggle-slider ${billingCycle === "yearly" ? "yearly" : ""}`}
                ></span>
              </button>
              <span className={billingCycle === "yearly" ? "active" : ""}>
                Yearly
                <span className="savings-badge">Save up to 20%</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pricing-cards-section">
        <div className="container">
          <div className="pricing-grid">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className={`pricing-card ${plan.popular ? "popular" : ""} ${
                  selectedPlan === plan.id ? "selected" : ""
                }`}
                style={{ "--plan-color": plan.color }}
              >
                {plan.popular && (
                  <div className="popular-badge">
                    <span>⭐ Most Popular</span>
                  </div>
                )}

                <div className="pricing-card-header">
                  <h3 className="plan-name">{plan.name}</h3>
                  <p className="plan-tagline">{plan.tagline}</p>

                  <div className="price-container">
                    <div className="price">
                      <span className="currency">₹</span>
                      <span className="amount">
                        {billingCycle === "monthly"
                          ? plan.price.monthly
                          : Math.round(plan.price.yearly / 12)}
                      </span>
                      <span className="period">/month</span>
                    </div>
                    {billingCycle === "yearly" && plan.price.yearly > 0 && (
                      <div className="yearly-info">
                        <span className="billed-yearly">
                          ₹{plan.price.yearly} billed yearly
                        </span>
                        <span className="savings-tag">
                          Save {calculateSavings(plan)}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pricing-card-body">
                  <ul className="features-list">
                    {plan.features.map((feature, index) => (
                      <li
                        key={index}
                        className={
                          feature.included ? "included" : "not-included"
                        }
                      >
                        <span className="feature-icon">
                          {feature.included ? "✓" : "×"}
                        </span>
                        <span className="feature-text">{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pricing-card-footer">
                  <button
                    className={`plan-cta ${plan.popular ? "btn-primary" : "btn-secondary"}`}
                    onClick={() => handleSelectPlan(plan)}
                  >
                    {plan.cta}
                    <span className="arrow">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="features-comparison">
        <div className="container">
          <h2 className="section-title">Compare All Features</h2>
          <div className="comparison-table-wrapper">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th className="feature-column">Features</th>
                  {pricingPlans.map((plan) => (
                    <th key={plan.id} className="plan-column">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="category-row">
                  <td colSpan={pricingPlans.length + 1}>
                    <strong>Assessments & Matching</strong>
                  </td>
                </tr>
                <tr>
                  <td>Career Assessment Tests</td>
                  <td>Basic</td>
                  <td>Advanced</td>
                  <td>Advanced + AI</td>
                </tr>
                <tr>
                  <td>Career Profiles Access</td>
                  <td>50+</td>
                  <td>500+</td>
                  <td>Unlimited</td>
                </tr>
                <tr>
                  <td>AI-Powered Recommendations</td>
                  <td>—</td>
                  <td>✓</td>
                  <td>✓</td>
                </tr>
                <tr className="category-row">
                  <td colSpan={pricingPlans.length + 1}>
                    <strong>Learning & Development</strong>
                  </td>
                </tr>
                <tr>
                  <td>Course Access</td>
                  <td>Previews</td>
                  <td>Unlimited</td>
                  <td>Unlimited + Exclusive</td>
                </tr>
                <tr>
                  <td>Personalized Learning Path</td>
                  <td>—</td>
                  <td>✓</td>
                  <td>✓</td>
                </tr>
                <tr>
                  <td>Exclusive Masterclasses</td>
                  <td>—</td>
                  <td>—</td>
                  <td>✓</td>
                </tr>
                <tr className="category-row">
                  <td colSpan={pricingPlans.length + 1}>
                    <strong>Counselling & Support</strong>
                  </td>
                </tr>
                <tr>
                  <td>Counselling Sessions</td>
                  <td>—</td>
                  <td>5/month</td>
                  <td>Unlimited</td>
                </tr>
                <tr>
                  <td>1-on-1 Career Coaching</td>
                  <td>—</td>
                  <td>—</td>
                  <td>✓</td>
                </tr>
                <tr>
                  <td>Industry Mentor Connections</td>
                  <td>—</td>
                  <td>—</td>
                  <td>✓</td>
                </tr>
                <tr>
                  <td>Support Level</td>
                  <td>Community</td>
                  <td>Priority Email</td>
                  <td>24/7 Priority</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="pricing-faq">
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>Can I change plans later?</h4>
              <p>
                Absolutely! You can upgrade, downgrade, or cancel your plan at
                any time. Changes take effect at the start of your next billing
                cycle.
              </p>
            </div>
            <div className="faq-item">
              <h4>Is there a free trial?</h4>
              <p>
                Yes! Professional and Premium plans come with a 14-day free
                trial. No credit card required to start.
              </p>
            </div>
            <div className="faq-item">
              <h4>What payment methods do you accept?</h4>
              <p>
                We accept all major credit cards, debit cards, PayPal, and bank
                transfers for yearly plans.
              </p>
            </div>
            <div className="faq-item">
              <h4>Do you offer refunds?</h4>
              <p>
                Yes, we offer a 30-day money-back guarantee. If you're not
                satisfied, we'll refund your payment, no questions asked.
              </p>
            </div>
            <div className="faq-item">
              <h4>Are there student discounts?</h4>
              <p>
                Yes! Students get 50% off on Professional and Premium plans.
                Verify your student status to unlock this offer.
              </p>
            </div>
            <div className="faq-item">
              <h4>Can I get a custom enterprise plan?</h4>
              <p>
                For schools, universities, and organizations, we offer custom
                enterprise solutions. Contact our sales team for details.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Premium Design */}
      <section className="pricing-cta">
        <div className="container">
          <div className="cta-card-premium">
            {/* Decorative Background Glow Elements */}
            <div className="cta-glow cta-glow-1"></div>
            <div className="cta-glow cta-glow-2"></div>
            <div className="cta-glow cta-glow-3"></div>

            <div className="cta-content-wrapper">
              {/* Badge */}
              <div className="cta-badge">
                <span className="badge-dot-pulse"></span>
                Need Help Choosing?
              </div>

              {/* Main Heading */}
              <h2 className="cta-title">
                Still have <span className="gradient-text">questions?</span>
              </h2>

              {/* Description */}
              <p className="cta-description">
                Our team of career experts is here to help you choose the
                perfect plan for your unique journey. Get personalized guidance
                and unlock your potential.
              </p>

              {/* CTA Buttons */}
              <div className="cta-buttons">
                <button
                  className="btn-cta-primary"
                  onClick={() => navigate("/contact")}
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
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                  Contact Sales
                  <span className="btn-arrow">→</span>
                </button>
                <button
                  className="btn-cta-secondary"
                  onClick={() => navigate("/faq")}
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
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                  View All FAQs
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="cta-trust-indicators">
                <div className="trust-item">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Free consultation</span>
                </div>
                <div className="trust-item">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>No credit card required</span>
                </div>
                <div className="trust-item">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>24/7 support available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
