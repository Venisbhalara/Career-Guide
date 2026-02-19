import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/pages/Home.css";

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="home-page">
      {/* Hero Section - Asymmetric, compelling */}
      {/* Hero Section - Premium Split Layout */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            {/* Left Column: Text Content */}
            <div className="hero-content-left">
              <div className="badge-pill fade-in">
                <span className="badge-dot"></span>
                #1 Career Guidance Platform
              </div>

              <h1 className="hero-title fade-in">
                Discover the career <br />
                that was{" "}
                <span className="gradient-text-premium">made for you</span>
              </h1>

              <p className="hero-description fade-in-up delay-1">
                Stop guessing about your future. Our AI-driven assessments and
                expert guidance help you find the perfect career path based on
                your unique personality, skills, and interests.
              </p>

              <div className="hero-actions fade-in-up delay-2">
                {isAuthenticated ? (
                  <Link
                    to="/dashboard"
                    className="btn btn-primary-premium btn-lg"
                  >
                    Go to Dashboard
                    <svg
                      className="btn-icon"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/register"
                      className="btn btn-primary-premium btn-lg"
                    >
                      Start Assessment
                      <svg
                        className="btn-icon"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </Link>
                    <Link
                      to="/explore"
                      className="btn btn-secondary-premium btn-lg"
                    >
                      Explore Careers
                    </Link>
                  </>
                )}
              </div>

              <div className="hero-trust-proof fade-in-up delay-3">
                <div className="trust-avatars">
                  <div className="avatar">AB</div>
                  <div className="avatar">JD</div>
                  <div className="avatar">MS</div>
                  <div className="avatar-count">+10k</div>
                </div>
                <div className="trust-text">
                  <span className="trust-highlight">10,000+ Students</span>{" "}
                  guided toward their dream careers
                </div>
              </div>
            </div>

            {/* Right Column: Visual/3D Elements */}
            <div className="hero-visual-right fade-in delay-2">
              <div className="floating-cards-container">
                {/* Decorative Background Alignments */}
                <div className="glow-orb orb-1"></div>
                <div className="glow-orb orb-2"></div>

                {/* Card 1: Match Score */}
                <div className="glass-card card-match float-animation-1">
                  <div className="card-icon-box match-icon">
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
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <div className="card-content">
                    <div className="card-label">Career Match</div>
                    <div className="card-value">98.5%</div>
                    <div className="match-bar">
                      <div
                        className="match-fill"
                        style={{ width: "98%" }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Card 2: Salary Insight */}
                <div className="glass-card card-salary float-animation-2">
                  <div className="card-header">
                    <span className="card-label">Avg. Salary</span>
                    <span className="trend-up">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                        <polyline points="17 6 23 6 23 12"></polyline>
                      </svg>
                      +12%
                    </span>
                  </div>
                  <div className="card-value-lg">₹24 LPA</div>
                  <div className="salary-graph">
                    <div className="bar" style={{ height: "40%" }}></div>
                    <div className="bar" style={{ height: "60%" }}></div>
                    <div className="bar" style={{ height: "50%" }}></div>
                    <div className="bar active" style={{ height: "85%" }}></div>
                    <div className="bar" style={{ height: "70%" }}></div>
                  </div>
                </div>

                {/* Card 3: Role Card */}
                <div className="glass-card card-role float-animation-3">
                  <div className="role-icon">
                    <span>ux</span>
                  </div>
                  <div className="role-info">
                    <div className="role-title">UX Designer</div>
                    <div className="role-desc">High Demand</div>
                  </div>
                  <div className="role-check">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Premium Timeline Journey */}
      <section className="section how-it-works">
        <div className="container">
          <div className="text-center mb-12">
            <div className="badge-pill inline-flex mx-auto mb-4">
              <span className="badge-dot"></span>
              Simple Process
            </div>
            <h2 className="section-title">
              Your Path to{" "}
              <span className="gradient-text-premium">Career Clarity</span>
            </h2>
            <p className="section-subtitle">
              No complicated forms. Just three simple steps to discover your
              perfect future.
            </p>
          </div>

          <div className="steps-timeline">
            {/* Connecting Line (Desktop) */}
            <div className="timeline-line"></div>

            {/* Step 1 */}
            <div className="step-card-premium">
              <div className="step-icon-wrapper">
                <div className="step-icon">
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
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div className="step-number-badge">01</div>
              </div>
              <div className="step-content">
                <h3>Tell us about yourself</h3>
                <p>
                  Share your education, interests, and what matters to you in a
                  career. Takes about 5 minutes.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="step-card-premium">
              <div className="step-icon-wrapper">
                <div className="step-icon">
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
                </div>
                <div className="step-number-badge">02</div>
              </div>
              <div className="step-content">
                <h3>Take the assessment</h3>
                <p>
                  Answer questions about your personality, interests, and
                  aptitude. It's actually kind of fun.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="step-card-premium">
              <div className="step-icon-wrapper">
                <div className="step-icon">
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
                    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                    <polyline points="2 17 12 22 22 17"></polyline>
                    <polyline points="2 12 12 17 22 12"></polyline>
                  </svg>
                </div>
                <div className="step-number-badge">03</div>
              </div>
              <div className="step-content">
                <h3>Get your roadmap</h3>
                <p>
                  Receive personalized career recommendations with step-by-step
                  paths and skills to learn.
                </p>
              </div>
            </div>
          </div>

          {!isAuthenticated && (
            <div className="text-center mt-12">
              <Link
                to="/register"
                className="btn btn-primary-premium btn-lg inline-flex"
              >
                Start Your Journey Now
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Section - Premium Bento Grid */}
      <section className="section features-section">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title">
              Everything you need to{" "}
              <span className="gradient-text-premium">Decide</span>
            </h2>
            <p className="section-subtitle">
              A complete ecosystem designed to take you from confusion to
              certainty.
            </p>
          </div>

          <div className="bento-grid">
            {/* Item 1: Large Feature (Span 2 Cols) */}
            <div className="bento-card bento-large feature-assessments">
              <div className="bento-content">
                <div className="bento-icon-box">
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
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                  </svg>
                </div>
                <h3>Smart Assessments</h3>
                <p>
                  Psychometric tests that actually understand you—not just
                  generic quizzes. Analyzes 50+ personality traits.
                </p>
              </div>
              <div className="bento-visual assessment-visual">
                {/* Decorative Elements suggesting data/analysis */}
                <div className="graph-line"></div>
                <div className="graph-dot"></div>
              </div>
            </div>

            {/* Item 2: Standard */}
            <div className="bento-card feature-library">
              <div className="bento-icon-box">
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
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
              </div>
              <h3>Career Library</h3>
              <p>
                Explore 50+ career paths with real-world salary data and
                day-in-the-life insights.
              </p>
            </div>

            {/* Item 3: Standard */}
            <div className="bento-card feature-learning">
              <div className="bento-icon-box">
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
                  <path d="M22 10v6M2 10v6"></path>
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                  <path d="M12 22V12"></path>
                </svg>
              </div>
              <h3>Learning Paths</h3>
              <p>
                Curated courses from top platforms to help you build the exact
                skills you need.
              </p>
            </div>

            {/* Item 4: Tall (Span 2 Rows) */}
            <div className="bento-card bento-tall feature-counselling">
              <div className="bento-icon-box">
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
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <div className="mt-auto">
                <h3>Expert Counselling</h3>
                <p>
                  Book 1-on-1 sessions with career counselors who've been there.
                  Get personalized advice for your unique situation.
                </p>
                <div className="expert-avatars mt-4">
                  <div className="avatar-sm"></div>
                  <div className="avatar-sm"></div>
                  <div className="avatar-sm"></div>
                </div>
              </div>
            </div>

            {/* Item 5: Standard */}
            <div className="bento-card feature-progress">
              <div className="bento-icon-box">
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
                  <line x1="18" y1="20" x2="18" y2="10"></line>
                  <line x1="12" y1="20" x2="12" y2="4"></line>
                  <line x1="6" y1="20" x2="6" y2="14"></line>
                </svg>
              </div>
              <h3>Progress Tracking</h3>
              <p>
                Gamified visualization of your journey from confusion to career.
              </p>
            </div>

            {/* Item 6: Standard */}
            <div className="bento-card feature-reports">
              <div className="bento-icon-box">
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
              </div>
              <h3>Detailed Reports</h3>
              <p>
                Download comprehensive PDF reports to share with parents or
                mentors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Premium Glow */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-card-premium">
            {/* Decorative Background Elements */}
            <div className="cta-glow glow-1"></div>
            <div className="cta-glow glow-2"></div>

            <div className="cta-content-wrapper">
              <h2>Ready to find your path?</h2>
              <p>
                Join thousands of students and professionals who've discovered
                careers they actually enjoy. It's free to start.
              </p>

              <div className="cta-buttons">
                {isAuthenticated ? (
                  <Link
                    to="/dashboard"
                    className="btn btn-white-premium btn-lg"
                  >
                    Go to Dashboard
                  </Link>
                ) : (
                  <Link to="/register" className="btn btn-white-premium btn-lg">
                    Create Free Account
                  </Link>
                )}
                <Link
                  to="/pricing"
                  className="btn btn-transparent-premium btn-lg"
                >
                  View Pricing
                </Link>
              </div>

              <div className="cta-trust-text">
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
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                Takes less than 2 minutes • No credit card required
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
