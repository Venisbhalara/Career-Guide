import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "../styles/pages/Dashboard.css";

const Dashboard = () => {
  const { user } = useAuth();

  // Helper to parse interests if they are strings
  const userInterests = Array.isArray(user?.interests)
    ? user.interests
    : typeof user?.interests === "string"
      ? user.interests.split(",").map((i) => i.trim())
      : [];

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
              {user?.profile_completed
                ? "Ready to take the next step in your career journey?"
                : "Let's unlock your full potential today."}
            </p>
          </div>
          <div className="header-action">
            <Link to="/profile-setup" className="btn btn-primary btn-glow">
              {user?.profile_completed ? "Update Profile" : "Complete Profile"}
            </Link>
          </div>
        </header>

        {/* QUICK STATS ROW */}
        <div className="stats-grid fade-in">
          <div className="stat-card glass">
            <div className="stat-icon profile-icon">👤</div>
            <div className="stat-info">
              <h3>Profile</h3>
              <p>{user?.profile_completed ? "Completed" : "Incomplete"}</p>
            </div>
          </div>
          <div className="stat-card glass">
            <div className="stat-icon goal-icon">🎯</div>
            <div className="stat-info">
              <h3>Career Goal</h3>
              <p>{user?.current_status || "Not Set"}</p>
            </div>
          </div>
          <div className="stat-card glass">
            <div className="stat-icon level-icon">🎓</div>
            <div className="stat-info">
              <h3>Education</h3>
              <p>{user?.education_level || "Not Set"}</p>
            </div>
          </div>
        </div>

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

          {/* RIGHT COLUMN - Interests & Profile Details */}
          <div className="side-col">
            {user?.profile_completed && userInterests.length > 0 && (
              <div className="dashboard-card interests-card">
                <div className="dashboard-card-header">
                  <h3 className="dashboard-card-title">My Interests</h3>
                </div>
                <div className="interests-cloud">
                  {userInterests.map((interest, idx) => (
                    <span key={idx} className="interest-pill">
                      {interest}
                    </span>
                  ))}
                  <Link to="/profile-setup" className="add-interest-btn">
                    +
                  </Link>
                </div>
              </div>
            )}

            <div className="dashboard-card quick-links-card">
              <h3 className="dashboard-card-title">Quick Links</h3>
              <ul className="quick-links-list">
                <li>
                  <Link to="/explore">Search Jobs</Link>
                </li>
                <li>
                  <Link to="/profile-setup">Edit Resume</Link>
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
