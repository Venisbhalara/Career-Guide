import "../styles/pages/About.css";

const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>About CareerGuide</h1>
              <p>
                We're on a mission to help everyone find work they actually
                enjoy. No generic advice, just real guidance based on who you
                are.
              </p>
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-number">10K+</span>
                  <span className="stat-label">Users Guided</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Career Paths</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">95%</span>
                  <span className="stat-label">Satisfaction</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="about-content">
        <div className="container">
          <section className="about-section">
            <h2>Why We Exist</h2>
            <p
              style={{
                textAlign: "center",
                maxWidth: "800px",
                margin: "0 auto",
                fontSize: "var(--text-lg)",
                color: "var(--color-text-secondary)",
              }}
            >
              Too many people end up in careers that don't fit them. We built
              CareerGuide to change that—using real assessments, honest data,
              and clear roadmaps to help you find a path that actually makes
              sense for you.
            </p>
          </section>

          <section className="about-section">
            <h2>Our Values</h2>
            <div className="about-grid">
              <div className="about-card">
                <div className="about-card-icon">🎯</div>
                <h3>Honest Guidance</h3>
                <p>
                  We don't sugarcoat things. We give you real information about
                  careers— the good, the challenging, and everything in between.
                </p>
              </div>

              <div className="about-card">
                <div className="about-card-icon">🧠</div>
                <h3>Science-Backed</h3>
                <p>
                  Our assessments are based on actual psychometric research, not
                  random quizzes. We take this seriously because your future
                  matters.
                </p>
              </div>

              <div className="about-card">
                <div className="about-card-icon">🤝</div>
                <h3>Accessible to All</h3>
                <p>
                  Quality career guidance shouldn't be expensive. We offer free
                  tools and affordable premium options so everyone can access
                  what they need.
                </p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>How We Help</h2>
            <div className="about-grid">
              <div className="about-card">
                <h3>For Students</h3>
                <p>
                  Choosing a stream or college? We help you understand what
                  different careers actually involve and which ones match your
                  strengths.
                </p>
              </div>

              <div className="about-card">
                <h3>For Graduates</h3>
                <p>
                  Not sure what to do after graduation? We show you realistic
                  career options and the exact steps to get there.
                </p>
              </div>

              <div className="about-card">
                <h3>For Professionals</h3>
                <p>
                  Thinking about switching careers? We help you identify
                  transferable skills and find new paths that fit your
                  experience.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
