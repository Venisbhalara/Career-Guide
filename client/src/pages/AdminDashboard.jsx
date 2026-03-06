import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import api from "../utils/api";
import "../styles/pages/AdminDashboard.css";

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/admin/analytics");
        setAnalytics(data.analytics);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load analytics data.");
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  const totalSessions =
    analytics?.counselling_sessions?.reduce(
      (sum, s) => sum + Number(s.count),
      0,
    ) ?? 0;

  const statCards = [
    {
      icon: "👥",
      label: "Total Users",
      value: analytics?.total_users ?? "—",
      color: "color-indigo",
    },
    {
      icon: "🎯",
      label: "Total Careers",
      value: analytics?.total_careers ?? "—",
      color: "color-violet",
    },
    {
      icon: "📝",
      label: "Assessments Done",
      value: analytics?.assessments_completed ?? "—",
      color: "color-emerald",
    },
    {
      icon: "🧑‍💼",
      label: "Total Sessions",
      value: loading ? "—" : totalSessions,
      color: "color-amber",
    },
  ];

  const quickActions = [
    {
      icon: "👥",
      label: "Manage Users",
      desc: "View & manage user accounts",
      to: "/admin/users",
      disabled: false,
    },
    {
      icon: "🎯",
      label: "Manage Careers",
      desc: "Add, edit & delete careers",
      to: "/admin/careers",
      disabled: false,
    },
    {
      icon: "📋",
      label: "Assessments",
      desc: "Edit assessment questions",
      to: "#",
      disabled: true,
    },
    {
      icon: "📬",
      label: "Messages",
      desc: "View support messages",
      to: "#",
      disabled: true,
    },
  ];

  const getStatusClass = (status) =>
    `status-${status?.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <AdminLayout title="Dashboard Overview">
      {error && <div className="admin-error-banner">⚠️ {error}</div>}

      {/* Stats */}
      <p className="admin-section-title">Platform Analytics</p>
      <div className="admin-stats-grid">
        {statCards.map((card) => (
          <div key={card.label} className={`admin-stat-card ${card.color}`}>
            <span className="stat-card-icon">{card.icon}</span>
            {loading ? (
              <div className="stat-card-value skeleton" />
            ) : (
              <div className="stat-card-value">{card.value}</div>
            )}
            <div className="stat-card-label">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Lower Grid */}
      <div className="admin-lower-grid">
        {/* Counselling Sessions */}
        <div className="admin-panel-card">
          <div className="admin-panel-header">
            <h3>🧑‍💼 Counselling Sessions</h3>
            <span className="panel-meta">By status</span>
          </div>
          {loading ? (
            <div style={{ color: "#b0b4be", fontSize: "0.85rem" }}>
              Loading…
            </div>
          ) : analytics?.counselling_sessions?.length > 0 ? (
            <div className="session-rows">
              {analytics.counselling_sessions.map((session) => (
                <div
                  key={session.status}
                  className={`session-row ${getStatusClass(session.status)}`}
                >
                  <div className="session-row-left">
                    <span className="session-dot" />
                    <span className="session-status-name">
                      {session.status}
                    </span>
                  </div>
                  <span className="session-badge">{session.count}</span>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: "#b0b4be", fontSize: "0.85rem" }}>
              No sessions found.
            </p>
          )}
        </div>

        {/* Quick Actions */}
        <div className="admin-panel-card">
          <div className="admin-panel-header">
            <h3>⚡ Quick Actions</h3>
          </div>
          <div className="quick-actions-grid">
            {quickActions.map((qa) => (
              <Link
                key={qa.label}
                to={qa.to}
                className={`quick-action-btn${qa.disabled ? " disabled" : ""}`}
              >
                <span className="qa-icon">{qa.icon}</span>
                <span className="qa-label">{qa.label}</span>
                <span className="qa-desc">{qa.desc}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
