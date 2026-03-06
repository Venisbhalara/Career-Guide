import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/pages/AdminDashboard.css";

const NAV_ITEMS = [
  { icon: "📊", label: "Dashboard", to: "/admin" },
  { icon: "👥", label: "Users", to: "/admin/users" },
  { icon: "🎯", label: "Careers", to: "/admin/careers" },
  { icon: "📋", label: "Assessments", to: "/admin/assessments" },
  { icon: "🧑‍💼", label: "Counselling", to: "/admin/counselling" },
  { icon: "💳", label: "Subscriptions", to: "/admin/subscriptions" },
  { icon: "📬", label: "Messages", to: "/admin/messages" },
];

const AdminLayout = ({ children, title }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const isActive = (to) => {
    if (to === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(to);
  };

  return (
    <div className="admin-shell">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <Link to="/" className="admin-sidebar-logo">
          <span className="logo-icon">🎯</span>
          <span className="logo-text">CareerGuide</span>
        </Link>

        <p className="admin-sidebar-label">Main Menu</p>
        <nav className="admin-nav">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className={`admin-nav-item${isActive(item.to) ? " active" : ""}`}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
              {item.soon && <span className="nav-soon">Soon</span>}
            </Link>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <button className="admin-nav-item" onClick={handleLogout}>
            <span className="nav-icon">🚪</span>
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="admin-main">
        <header className="admin-topbar">
          <span className="admin-topbar-title">{title}</span>
          <div className="admin-topbar-right">
            <span className="admin-date-badge">{today}</span>
            <div className="admin-user-pill">
              <div className="avatar">
                {user?.full_name?.charAt(0).toUpperCase() || "A"}
              </div>
              <span className="user-label">
                {user?.full_name?.split(" ")[0]}
              </span>
              <span className="admin-badge">Admin</span>
            </div>
          </div>
        </header>

        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
