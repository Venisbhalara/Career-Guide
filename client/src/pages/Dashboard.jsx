import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "../styles/pages/Dashboard.css";

const Dashboard = () => {
  const { user } = useAuth();

  const getWelcomeMessage = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    if (hour < 22) return "Good Evening";
    return "Good Night";
  };

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const dailyTips = [
    "Success acts as a ladder—you can't climb it with your hands in your pockets.",
    "The only way to do great work is to love what you do.",
    "Opportunities don't happen, you create them.",
    "Your career is a journey, not a destination.",
    "Networking is not about just connecting people. It's about connecting people with people, people with ideas, and people with opportunities.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "The best way to predict the future is to create it.",
    "The only limit to our realization of tomorrow will be our doubts of today.",
  ];
  const randomTip = dailyTips[Math.floor(Math.random() * dailyTips.length)];

  return (
    <div className="dashboard-page page-container">
      <div className="container dashboard-container">
        {/* HEADER Section */}
        <header className="dashboard-header-modern slide-in">
          <div className="header-content">
            <p className="date-display">{today}</p>
            <h1 className="dashboard-welcome">
              {getWelcomeMessage()},{" "}
              <span className="highlight-name">
                {user?.full_name?.split(" ")[0] || "Friend"}
              </span>
            </h1>
            <p className="dashboard-subtitle">
              Ready to take the next step in your career journey?
            </p>
          </div>
        </header>

        {/* MAIN CONTENT GRID */}
        <div className="dashboard-main-grid">
          {/* LEFT COLUMN */}
          <div className="main-col">
            {/* Daily Insight */}
            <div className="dashboard-card daily-insight gradient-border">
              <div className="card-content">
                <div className="insight-header">
                  <h3>💡 Daily Insight</h3>
                </div>
                <p className="insight-text">"{randomTip}"</p>
              </div>
            </div>

            {/* Assessment Card */}
            <div className="dashboard-card feature-card">
              <div className="card-bg-icon">📊</div>
              <div className="dashboard-card-header">
                <h3 className="dashboard-card-title">Career Assessment</h3>
              </div>
              <p>
                Discover your perfect career path with our AI-powered
                personality analysis.
              </p>
              <Link to="/assessment" className="btn btn-accent btn-sm">
                Start Assessment →
              </Link>
            </div>

            {/* Explore Card */}
            <div className="dashboard-card feature-card">
              <div className="card-bg-icon">🚀</div>
              <div className="dashboard-card-header">
                <h3 className="dashboard-card-title">Explore Careers</h3>
              </div>
              <p>
                Browse extensive roadmaps, salary insights, and trending
                industries.
              </p>
              <Link to="/explore" className="btn btn-secondary btn-sm">
                Explore Library →
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="side-col">
            <div className="dashboard-card quick-links-card">
              <h3 className="dashboard-card-title">Quick Links</h3>
              <ul className="quick-links-list">
                <li>
                  <Link to="/explore">Search Jobs</Link>
                </li>
                <li>
                  <Link to="/settings">Settings</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
