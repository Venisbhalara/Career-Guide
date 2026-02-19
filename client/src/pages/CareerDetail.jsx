import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { CAREERS } from "../data/careerData";
import "../styles/pages/CareerDetail.css";

const CareerDetail = () => {
  const { id } = useParams();
  const career = CAREERS.find((c) => c.id === parseInt(id));
  const [activeTab, setActiveTab] = useState("roadmap");

  // Simulated live connection state
  const [liveCount, setLiveCount] = useState(0);

  useEffect(() => {
    if (career) {
      setLiveCount(career.stats.openings);
    }
  }, [career]);

  // Simulate live fluctuation in job openings
  useEffect(() => {
    if (!career) return;
    const interval = setInterval(() => {
      const fluctuate =
        Math.floor(Math.random() * 5) * (Math.random() > 0.5 ? 1 : -1);
      setLiveCount((prev) => prev + fluctuate);
    }, 4000);
    return () => clearInterval(interval);
  }, [career]);

  if (!career) {
    return (
      <div className="error-container">
        <h1>Career Not Found</h1>
        <Link to="/explore" className="back-btn">
          Back to Explore
        </Link>
      </div>
    );
  }

  return (
    <div className="career-detail-container">
      {/* HERO SECTION */}
      <section className="cd-hero">
        <div className="cd-hero-content container">
          {/* <Link to="/explore" className="cd-back-link">
            ← Back to Careers
          </Link> */}
          <div className="cd-header-flex">
            <div className="cd-icon-large">{career.icon}</div>
            <div className="cd-title-block">
              <span className="cd-field-badge">{career.field}</span>
              <h1 className="cd-title">{career.title}</h1>
              <p className="cd-subtitle">{career.description}</p>
            </div>
          </div>

          <div className="cd-stats-grid">
            <div className="cd-stat-card">
              <span className="stat-label">Avg. Salary</span>
              <span className="stat-value">{career.salary}</span>
            </div>
            <div className="cd-stat-card">
              <span className="stat-label">Growth Rate</span>
              <span className="stat-value growth">{career.growth}</span>
            </div>
            <div className="cd-stat-card">
              <span className="stat-label">Live Openings</span>
              <span className="stat-value live">
                {liveCount.toLocaleString()}
                <span className="live-dot"></span>
              </span>
            </div>
            <div className="cd-stat-card">
              <span className="stat-label">Top Location</span>
              <span className="stat-value">{career.stats.top_location}</span>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <main className="cd-main container">
        {/* TABS */}
        <div className="cd-tabs-wrapper">
          <div className="cd-tabs">
            <button
              className={`cd-tab ${activeTab === "roadmap" ? "active" : ""}`}
              onClick={() => setActiveTab("roadmap")}
            >
              🗺️ Roadmap
            </button>
            <button
              className={`cd-tab ${activeTab === "path" ? "active" : ""}`}
              onClick={() => setActiveTab("path")}
            >
              📈 Career Path
            </button>
            <button
              className={`cd-tab ${activeTab === "tools" ? "active" : ""}`}
              onClick={() => setActiveTab("tools")}
            >
              🛠️ Tools & Skills
            </button>
            <button
              className={`cd-tab ${activeTab === "trends" ? "active" : ""}`}
              onClick={() => setActiveTab("trends")}
            >
              📊 Market Insights
            </button>
            <button
              className={`cd-tab ${activeTab === "day" ? "active" : ""}`}
              onClick={() => setActiveTab("day")}
            >
              ⏰ Day in Life
            </button>
          </div>
        </div>

        {/* TAB CONTENT */}
        <div className="cd-content-body">
          {activeTab === "roadmap" && (
            <div className="roadmap-view fadeIn">
              <div className="section-header">
                <h2>Step-by-Step Learning Path</h2>
                <p>Follow a proven curriculum to master this role.</p>
              </div>

              <div className="timeline">
                {career.roadmap.map((step, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-marker">{step.step}</div>
                    <div className="timeline-content">
                      <div className="timeline-meta">
                        <span className="duration-badge">
                          ⏱ {step.duration}
                        </span>
                      </div>
                      <h3 className="step-title">{step.title}</h3>
                      <p className="step-desc">{step.description}</p>
                      <div className="step-resources">
                        <strong>Recommended:</strong>
                        <ul>
                          {step.resources.map((r, i) => (
                            <li key={i}>{r}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="timeline-end">
                  <div className="success-icon">🏆</div>
                  <h3>Career Goal Achieved!</h3>
                </div>
              </div>
            </div>
          )}

          {activeTab === "path" && (
            <div className="path-view fadeIn">
              <div className="section-header">
                <h2>Career Progress Ladder</h2>
                <p>
                  How you will grow in seniority and compensation over the
                  years.
                </p>
              </div>

              <div className="trajectory-container">
                {career.trajectory.map((role, i) => (
                  <div key={i} className="traj-card">
                    <div className="traj-left">
                      <span className="traj-exp">{role.exp}</span>
                      <div className="traj-line"></div>
                    </div>
                    <div className="traj-right">
                      <h3 className="traj-role">{role.role}</h3>
                      <span className="traj-salary">{role.salary}</span>
                      <p className="traj-focus">Focus: {role.focus}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "tools" && (
            <div className="tools-view fadeIn">
              <div className="section-header">
                <h2>Tech Stack & Certifications</h2>
              </div>

              <div className="tools-grid-layout">
                <div className="tool-column">
                  <h3>🛠️ Essential Tools</h3>
                  <div className="tool-categories">
                    {career.tools.map((cat, i) => (
                      <div key={i} className="tool-cat-card">
                        <h4>{cat.category}</h4>
                        <div className="tool-tags">
                          {cat.items.map((tool, j) => (
                            <span key={j} className="tool-tag">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="skills-column">
                  <h3>🧠 Core Competencies</h3>
                  <div className="skills-simple-list">
                    {career.skills.map((skill, i) => (
                      <div key={i} className="skill-simple-item">
                        <div className="skill-label-flex">
                          <span>{skill.name}</span>
                          <span className="skill-pct">{skill.level}%</span>
                        </div>
                        <div className="skill-qt-track">
                          <div
                            className="skill-qt-fill"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h3 style={{ marginTop: "2rem" }}>📜 Top Certifications</h3>
                  <div className="certs-list">
                    {career.certifications.map((cert, k) => (
                      <div key={k} className="cert-item">
                        <span className="cert-icon">🏅</span>
                        <div>
                          <div className="cert-name">{cert.name}</div>
                          <div className="cert-prov">
                            {cert.provider} • Value: {cert.value}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "trends" && (
            <div className="trends-view fadeIn">
              <div className="section-header">
                <h2>Market Intelligence</h2>
                <p>Simulated 5-year trend analysis based on market reports.</p>
              </div>

              <div className="charts-container">
                <div className="chart-box">
                  <h3>Salary Trend (LPA)</h3>
                  <div className="simple-bar-chart">
                    {career.marketTrends.years.map((year, i) => (
                      <div key={i} className="bar-group">
                        <div
                          className="bar"
                          style={{
                            height: `${(career.marketTrends.salary[i] / 30) * 150}px`,
                          }}
                        >
                          <span className="bar-val">
                            {career.marketTrends.salary[i]}L
                          </span>
                        </div>
                        <span className="bar-label">{year}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="trend-summary">
                  <div className="trend-stat">
                    <span className="ts-label">5-Year Growth</span>
                    <span className="ts-val positive">+24%</span>
                  </div>
                  <div className="trend-stat">
                    <span className="ts-label">Future Outlook</span>
                    <span className="ts-val">Positive</span>
                  </div>
                  <p className="trend-desc">
                    The market for {career.title}s has seen consistent growth.
                    Despite market corrections, skilled professionals continue
                    to command premium salaries.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "day" && (
            <div className="day-view fadeIn">
              <div className="section-header">
                <h2>A Day in the Life</h2>
                <p>What typically happens on a Tuesday.</p>
              </div>

              <div className="day-timeline">
                {career.dayInLife.map((slot, i) => (
                  <div key={i} className="day-slot">
                    <div className="day-time">{slot.time}</div>
                    <div className="day-card">
                      <h4>{slot.activity}</h4>
                      <p>{slot.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CareerDetail;
