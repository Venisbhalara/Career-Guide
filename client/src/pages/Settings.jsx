import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import "../styles/pages/Settings.css";

const TABS = [
  { id: "profile", label: "Profile", icon: "👤" },
  { id: "account", label: "Account", icon: "🔒" },
  { id: "notifications", label: "Notifications", icon: "🔔" },
  { id: "privacy", label: "Privacy", icon: "🛡️" },
  { id: "appearance", label: "Appearance", icon: "🎨" },
];

const EDUCATION_LEVELS = [
  "High School",
  "Undergraduate",
  "Postgraduate",
  "PhD/Doctorate",
  "Diploma",
  "Other",
];

const CURRENT_STATUSES = [
  "Student",
  "Job Seeker",
  "Working Professional",
  "Freelancer",
  "Entrepreneur",
];

const INTEREST_OPTIONS = [
  { id: "tech", label: "Technology", icon: "💻" },
  { id: "science", label: "Science", icon: "🧬" },
  { id: "arts", label: "Arts", icon: "🎨" },
  { id: "business", label: "Business", icon: "💼" },
  { id: "health", label: "Healthcare", icon: "🏥" },
  { id: "design", label: "Design", icon: "✨" },
  { id: "marketing", label: "Marketing", icon: "📢" },
  { id: "engineering", label: "Engineering", icon: "⚙️" },
  { id: "finance", label: "Finance", icon: "💰" },
  { id: "education", label: "Education", icon: "🎓" },
  { id: "social", label: "Social Sciences", icon: "🤝" },
  { id: "law", label: "Law", icon: "⚖️" },
  { id: "media", label: "Media", icon: "🎬" },
  { id: "environment", label: "Environment", icon: "🌱" },
  { id: "sports", label: "Sports", icon: "⚽" },
];

const Settings = () => {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");

  // ── Profile state ──
  const [profileData, setProfileData] = useState({
    full_name: "",
    phone: "",
    date_of_birth: "",
    gender: "",
    education_level: "",
    current_status: "",
    interests: [],
  });
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileMsg, setProfileMsg] = useState(null);

  // ── Password state ──
  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState(null);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // ── Notifications state ──
  const [notifications, setNotifications] = useState({
    email_updates: true,
    career_alerts: true,
    assessment_reminders: false,
    newsletter: true,
    counselling_reminders: true,
    new_courses: false,
  });
  const [notifMsg, setNotifMsg] = useState(null);

  // ── Privacy state ──
  const [privacy, setPrivacy] = useState({
    profile_visible: true,
    share_assessment: false,
    data_analytics: true,
  });
  const [privacyMsg, setPrivacyMsg] = useState(null);

  // ── Appearance state ──
  const [theme, setTheme] = useState(
    () => localStorage.getItem("cg_theme") || "light",
  );
  const [accentColor, setAccentColor] = useState(
    () => localStorage.getItem("cg_accent") || "indigo",
  );
  const [appearanceMsg, setAppearanceMsg] = useState(null);

  // ── Delete account dialog ──
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  // Pre-fill profile from user context
  useEffect(() => {
    if (user) {
      setProfileData({
        full_name: user.full_name || "",
        phone: user.phone || "",
        date_of_birth: user.date_of_birth
          ? new Date(user.date_of_birth).toISOString().split("T")[0]
          : "",
        gender: user.gender || "",
        education_level: user.education_level || "",
        current_status: user.current_status || "",
        interests: Array.isArray(user.interests)
          ? user.interests
          : typeof user.interests === "string" && user.interests
            ? user.interests.split(",").map((i) => i.trim())
            : [],
      });
    }
  }, [user]);

  const flash = (setter, msg, type = "success", ms = 3500) => {
    setter({ text: msg, type });
    setTimeout(() => setter(null), ms);
  };

  // ── Handlers ──
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((p) => ({ ...p, [name]: value }));
  };

  const handleInterestToggle = (label) => {
    setProfileData((p) => {
      if (p.interests.includes(label))
        return { ...p, interests: p.interests.filter((i) => i !== label) };
      if (p.interests.length >= 5) return p;
      return { ...p, interests: [...p.interests, label] };
    });
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    try {
      const payload = {
        ...profileData,
        interests: profileData.interests.join(", "),
      };
      const res = await api.put("/users/profile", payload);
      updateUser(res.data.profile);
      flash(setProfileMsg, "✅ Profile updated successfully!");
    } catch (err) {
      flash(
        setProfileMsg,
        `❌ ${err.response?.data?.error || "Failed to update profile."}`,
        "error",
      );
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((p) => ({ ...p, [name]: value }));
  };

  const handlePasswordSave = async (e) => {
    e.preventDefault();
    if (passwordData.new_password !== passwordData.confirm_password) {
      flash(setPasswordMsg, "❌ New passwords do not match.", "error");
      return;
    }
    if (passwordData.new_password.length < 8) {
      flash(
        setPasswordMsg,
        "❌ Password must be at least 8 characters.",
        "error",
      );
      return;
    }
    setPasswordLoading(true);
    try {
      await api.put("/users/password", {
        current_password: passwordData.current_password,
        new_password: passwordData.new_password,
      });
      setPasswordData({
        current_password: "",
        new_password: "",
        confirm_password: "",
      });
      flash(setPasswordMsg, "✅ Password changed successfully!");
    } catch (err) {
      flash(
        setPasswordMsg,
        `❌ ${err.response?.data?.error || "Failed to update password."}`,
        "error",
      );
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleNotifToggle = (key) => {
    setNotifications((n) => ({ ...n, [key]: !n[key] }));
  };

  const handleNotifSave = () => {
    localStorage.setItem("cg_notifications", JSON.stringify(notifications));
    flash(setNotifMsg, "✅ Notification preferences saved!");
  };

  const handlePrivacyToggle = (key) => {
    setPrivacy((p) => ({ ...p, [key]: !p[key] }));
  };

  const handlePrivacySave = () => {
    localStorage.setItem("cg_privacy", JSON.stringify(privacy));
    flash(setPrivacyMsg, "✅ Privacy settings saved!");
  };

  const handleAppearanceSave = () => {
    localStorage.setItem("cg_theme", theme);
    localStorage.setItem("cg_accent", accentColor);
    flash(setAppearanceMsg, "✅ Appearance preferences saved!");
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmText === "DELETE") {
      logout();
      navigate("/");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getInitials = () => {
    const name = user?.full_name || user?.email || "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // ── Message component ──
  const MessageBanner = ({ msg }) =>
    msg ? <div className={`settings-msg ${msg.type}`}>{msg.text}</div> : null;

  // ── Toggle component ──
  const Toggle = ({ checked, onChange, id }) => (
    <label className="settings-toggle" htmlFor={id}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="toggle-input"
      />
      <span className="toggle-track">
        <span className="toggle-thumb" />
      </span>
    </label>
  );

  return (
    <div className="settings-page">
      <div className="container">
        {/* Header */}
        <div className="settings-header fade-in">
          <div className="settings-header-content">
            {/* <div className="settings-avatar">
              <span className="avatar-initials">{getInitials()}</span>
              <div className="avatar-ring" />
            </div> */}
            <div className="settings-header-text">
              <h1 className="settings-title">
                Account <span className="gradient-text">Settings</span>
              </h1>
              <p className="settings-subtitle">
                Manage your profile, security, and preferences
              </p>
            </div>
          </div>
        </div>

        {/* Layout */}
        <div className="settings-layout">
          {/* Sidebar */}
          <aside className="settings-sidebar slide-in">
            <nav className="settings-nav">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  className={`settings-nav-btn ${activeTab === tab.id ? "active" : ""}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="nav-icon">{tab.icon}</span>
                  <span className="nav-label">{tab.label}</span>
                  {activeTab === tab.id && <span className="nav-indicator" />}
                </button>
              ))}
            </nav>

            {/* Quick Actions */}
            <div className="sidebar-actions">
              <button className="action-btn logout-btn" onClick={handleLogout}>
                <span>🚪</span> Sign Out
              </button>
            </div>
          </aside>

          {/* Main Panel */}
          <main className="settings-content fade-in">
            {/* ══════════════ PROFILE TAB ══════════════ */}
            {activeTab === "profile" && (
              <form className="settings-panel" onSubmit={handleProfileSave}>
                <div className="panel-header">
                  <h2 className="panel-title">👤 Profile Information</h2>
                  <p className="panel-subtitle">
                    Update your personal details and preferences.
                  </p>
                </div>

                <MessageBanner msg={profileMsg} />

                <div className="settings-section">
                  <h3 className="section-label">Personal Details</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        name="full_name"
                        value={profileData.full_name}
                        onChange={handleProfileChange}
                        className="form-input"
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email Address</label>
                      <input
                        type="email"
                        value={user?.email || ""}
                        className="form-input"
                        disabled
                        title="Email cannot be changed"
                      />
                      <span className="form-hint">Email cannot be changed</span>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleProfileChange}
                        className="form-input"
                        placeholder="+1 234 567 8900"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Date of Birth</label>
                      <input
                        type="date"
                        name="date_of_birth"
                        value={profileData.date_of_birth}
                        onChange={handleProfileChange}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Gender</label>
                      <select
                        name="gender"
                        value={profileData.gender}
                        onChange={handleProfileChange}
                        className="form-select"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Non-binary">Non-binary</option>
                        <option value="Prefer not to say">
                          Prefer not to say
                        </option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Current Status</label>
                      <select
                        name="current_status"
                        value={profileData.current_status}
                        onChange={handleProfileChange}
                        className="form-select"
                      >
                        <option value="">Select status</option>
                        {CURRENT_STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="settings-section">
                  <h3 className="section-label">Education Level</h3>
                  <div className="education-grid">
                    {EDUCATION_LEVELS.map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        className={`edu-card ${profileData.education_level === lvl ? "selected" : ""}`}
                        onClick={() =>
                          setProfileData((p) => ({
                            ...p,
                            education_level: lvl,
                          }))
                        }
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="settings-section">
                  <h3 className="section-label">
                    Interests
                    <span className="section-meta">
                      {profileData.interests.length}/5 selected
                    </span>
                  </h3>
                  <div className="interests-grid">
                    {INTEREST_OPTIONS.map((opt) => {
                      const selected = profileData.interests.includes(
                        opt.label,
                      );
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          className={`interest-pill ${selected ? "selected" : ""}`}
                          onClick={() => handleInterestToggle(opt.label)}
                        >
                          <span>{opt.icon}</span>
                          <span>{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="panel-footer">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={profileLoading}
                  >
                    {profileLoading ? (
                      <>
                        <span className="spinner" /> Saving…
                      </>
                    ) : (
                      "Save Profile"
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* ══════════════ ACCOUNT TAB ══════════════ */}
            {activeTab === "account" && (
              <div className="settings-panel">
                <div className="panel-header">
                  <h2 className="panel-title">🔒 Account & Security</h2>
                  <p className="panel-subtitle">
                    Manage your login credentials and account security.
                  </p>
                </div>

                {/* Account Info */}
                <div className="settings-section">
                  <h3 className="section-label">Account Information</h3>
                  <div className="account-info-card">
                    <div className="account-info-row">
                      <span className="info-key">Account Email</span>
                      <span className="info-val">{user?.email}</span>
                    </div>
                    <div className="account-info-row">
                      <span className="info-key">Account Role</span>
                      <span
                        className={`badge ${user?.role === "admin" ? "badge-warning" : "badge-primary"}`}
                      >
                        {user?.role || "user"}
                      </span>
                    </div>
                    <div className="account-info-row">
                      <span className="info-key">Member Since</span>
                      <span className="info-val">
                        {user?.created_at
                          ? new Date(user.created_at).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              },
                            )
                          : "—"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Change Password */}
                <div className="settings-section">
                  <h3 className="section-label">Change Password</h3>
                  <MessageBanner msg={passwordMsg} />
                  <form className="pw-form" onSubmit={handlePasswordSave}>
                    {[
                      {
                        name: "current_password",
                        label: "Current Password",
                        key: "current",
                      },
                      {
                        name: "new_password",
                        label: "New Password",
                        key: "new",
                      },
                      {
                        name: "confirm_password",
                        label: "Confirm New Password",
                        key: "confirm",
                      },
                    ].map(({ name, label, key }) => (
                      <div className="form-group" key={name}>
                        <label className="form-label">{label}</label>
                        <div className="pw-field">
                          <input
                            type={showPasswords[key] ? "text" : "password"}
                            name={name}
                            value={passwordData[name]}
                            onChange={handlePasswordChange}
                            className="form-input"
                            placeholder="••••••••"
                            required
                          />
                          <button
                            type="button"
                            className="pw-toggle"
                            onClick={() =>
                              setShowPasswords((p) => ({
                                ...p,
                                [key]: !p[key],
                              }))
                            }
                          >
                            {showPasswords[key] ? "🙈" : "👁️"}
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="pw-strength-hint">
                      <span className="form-hint">
                        💡 Use at least 8 characters, with numbers and symbols
                        for a strong password.
                      </span>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={passwordLoading}
                    >
                      {passwordLoading ? "Updating…" : "Update Password"}
                    </button>
                  </form>
                </div>

                {/* Danger Zone */}
                <div className="settings-section danger-zone">
                  <h3 className="section-label danger-label">⚠️ Danger Zone</h3>
                  <div className="danger-card">
                    <div className="danger-info">
                      <strong>Delete Account</strong>
                      <p>
                        This permanently removes your account and all associated
                        data. This action cannot be undone.
                      </p>
                    </div>
                    <button
                      className="btn-danger"
                      onClick={() => setShowDeleteDialog(true)}
                    >
                      Delete Account
                    </button>
                  </div>
                </div>

                {/* Delete dialog */}
                {showDeleteDialog && (
                  <div
                    className="dialog-overlay"
                    onClick={() => setShowDeleteDialog(false)}
                  >
                    <div
                      className="dialog-card"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="dialog-icon">⚠️</div>
                      <h3 className="dialog-title">Delete Your Account?</h3>
                      <p className="dialog-body">
                        This action is{" "}
                        <strong>permanent and irreversible</strong>. All your
                        data, assessments, and history will be permanently
                        deleted.
                      </p>
                      <p className="dialog-body">
                        Type <strong>DELETE</strong> to confirm:
                      </p>
                      <input
                        type="text"
                        className="form-input"
                        value={deleteConfirmText}
                        onChange={(e) => setDeleteConfirmText(e.target.value)}
                        placeholder="Type DELETE"
                        style={{ marginBottom: "1rem" }}
                      />
                      <div className="dialog-actions">
                        <button
                          className="btn btn-secondary"
                          onClick={() => {
                            setShowDeleteDialog(false);
                            setDeleteConfirmText("");
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          className="btn-danger"
                          disabled={deleteConfirmText !== "DELETE"}
                          onClick={handleDeleteAccount}
                        >
                          Permanently Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ══════════════ NOTIFICATIONS TAB ══════════════ */}
            {activeTab === "notifications" && (
              <div className="settings-panel">
                <div className="panel-header">
                  <h2 className="panel-title">🔔 Notifications</h2>
                  <p className="panel-subtitle">
                    Choose what updates and alerts you receive.
                  </p>
                </div>

                <MessageBanner msg={notifMsg} />

                <div className="settings-section">
                  <h3 className="section-label">Email Notifications</h3>
                  <div className="toggle-list">
                    {[
                      {
                        key: "email_updates",
                        label: "Product Updates",
                        desc: "News about new features and improvements",
                      },
                      {
                        key: "career_alerts",
                        label: "Career Alerts",
                        desc: "New career insights and opportunities matching your profile",
                      },
                      {
                        key: "assessment_reminders",
                        label: "Assessment Reminders",
                        desc: "Reminders to complete or retake your career assessment",
                      },
                      {
                        key: "newsletter",
                        label: "Weekly Newsletter",
                        desc: "Weekly digest of top career tips and resources",
                      },
                      {
                        key: "counselling_reminders",
                        label: "Session Reminders",
                        desc: "Reminders for upcoming counselling sessions",
                      },
                      {
                        key: "new_courses",
                        label: "New Courses",
                        desc: "Alerts when new courses relevant to you are added",
                      },
                    ].map(({ key, label, desc }) => (
                      <div className="toggle-row" key={key}>
                        <div className="toggle-info">
                          <span className="toggle-label">{label}</span>
                          <span className="toggle-desc">{desc}</span>
                        </div>
                        <Toggle
                          id={key}
                          checked={notifications[key]}
                          onChange={() => handleNotifToggle(key)}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="panel-footer">
                  <button className="btn btn-primary" onClick={handleNotifSave}>
                    Save Preferences
                  </button>
                </div>
              </div>
            )}

            {/* ══════════════ PRIVACY TAB ══════════════ */}
            {activeTab === "privacy" && (
              <div className="settings-panel">
                <div className="panel-header">
                  <h2 className="panel-title">🛡️ Privacy & Data</h2>
                  <p className="panel-subtitle">
                    Control how your data is used and who can see your profile.
                  </p>
                </div>

                <MessageBanner msg={privacyMsg} />

                <div className="settings-section">
                  <h3 className="section-label">Privacy Controls</h3>
                  <div className="toggle-list">
                    {[
                      {
                        key: "profile_visible",
                        label: "Public Profile",
                        desc: "Allow others to view your profile and career interests",
                      },
                      {
                        key: "share_assessment",
                        label: "Share Assessment Results",
                        desc: "Share your career assessment results with counsellors",
                      },
                      {
                        key: "data_analytics",
                        label: "Usage Analytics",
                        desc: "Help improve Career Guide by sharing anonymous usage data",
                      },
                    ].map(({ key, label, desc }) => (
                      <div className="toggle-row" key={key}>
                        <div className="toggle-info">
                          <span className="toggle-label">{label}</span>
                          <span className="toggle-desc">{desc}</span>
                        </div>
                        <Toggle
                          id={`privacy_${key}`}
                          checked={privacy[key]}
                          onChange={() => handlePrivacyToggle(key)}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="settings-section">
                  <h3 className="section-label">Data & Downloads</h3>
                  <div className="data-actions">
                    <div className="data-action-card">
                      <div className="data-action-info">
                        <strong>Download Your Data</strong>
                        <p>
                          Get a copy of all the data Career Guide has on you.
                        </p>
                      </div>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => alert("Data export coming soon.")}
                      >
                        Request Export
                      </button>
                    </div>
                    <div className="data-action-card">
                      <div className="data-action-info">
                        <strong>Privacy Policy</strong>
                        <p>
                          Read our full privacy policy and data handling
                          practices.
                        </p>
                      </div>
                      <a
                        href="/privacy-policy"
                        className="btn btn-secondary btn-sm"
                      >
                        View Policy
                      </a>
                    </div>
                  </div>
                </div>

                <div className="panel-footer">
                  <button
                    className="btn btn-primary"
                    onClick={handlePrivacySave}
                  >
                    Save Privacy Settings
                  </button>
                </div>
              </div>
            )}

            {/* ══════════════ APPEARANCE TAB ══════════════ */}
            {activeTab === "appearance" && (
              <div className="settings-panel">
                <div className="panel-header">
                  <h2 className="panel-title">🎨 Appearance</h2>
                  <p className="panel-subtitle">
                    Personalize how Career Guide looks for you.
                  </p>
                </div>

                <MessageBanner msg={appearanceMsg} />

                <div className="settings-section">
                  <h3 className="section-label">Color Theme</h3>
                  <div className="theme-grid">
                    {[
                      {
                        id: "light",
                        label: "Light",
                        preview: "☀️",
                        desc: "Clean and bright",
                      },
                      {
                        id: "dark",
                        label: "Dark",
                        preview: "🌙",
                        desc: "Easy on the eyes",
                      },
                      {
                        id: "system",
                        label: "System",
                        preview: "💻",
                        desc: "Follows your OS",
                      },
                    ].map((t) => (
                      <button
                        key={t.id}
                        className={`theme-card ${theme === t.id ? "selected" : ""}`}
                        onClick={() => setTheme(t.id)}
                      >
                        <span className="theme-preview">{t.preview}</span>
                        <span className="theme-name">{t.label}</span>
                        <span className="theme-desc">{t.desc}</span>
                        {theme === t.id && (
                          <span className="theme-check">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="settings-section">
                  <h3 className="section-label">Accent Color</h3>
                  <div className="accent-grid">
                    {[
                      { id: "indigo", label: "Indigo", color: "#4f46e5" },
                      { id: "violet", label: "Violet", color: "#7c3aed" },
                      { id: "rose", label: "Rose", color: "#e11d48" },
                      { id: "sky", label: "Sky Blue", color: "#0284c7" },
                      { id: "emerald", label: "Emerald", color: "#059669" },
                      { id: "amber", label: "Amber", color: "#d97706" },
                    ].map((a) => (
                      <button
                        key={a.id}
                        className={`accent-swatch ${accentColor === a.id ? "selected" : ""}`}
                        style={{ "--swatch": a.color }}
                        onClick={() => setAccentColor(a.id)}
                        title={a.label}
                      >
                        <span className="swatch-dot" />
                        <span className="swatch-label">{a.label}</span>
                        {accentColor === a.id && (
                          <span className="swatch-check">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="settings-section">
                  <h3 className="section-label">Preview</h3>
                  <div className="appearance-preview">
                    <div className="preview-card">
                      <div
                        className="preview-accent-bar"
                        style={{
                          background: {
                            indigo: "#4f46e5",
                            violet: "#7c3aed",
                            rose: "#e11d48",
                            sky: "#0284c7",
                            emerald: "#059669",
                            amber: "#d97706",
                          }[accentColor],
                        }}
                      />
                      <div className="preview-content">
                        <div className="preview-title">Career Guide</div>
                        <div className="preview-subtitle">Settings preview</div>
                        <div
                          className="preview-btn"
                          style={{
                            background: {
                              indigo: "#4f46e5",
                              violet: "#7c3aed",
                              rose: "#e11d48",
                              sky: "#0284c7",
                              emerald: "#059669",
                              amber: "#d97706",
                            }[accentColor],
                          }}
                        >
                          Sample Button
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="panel-footer">
                  <button
                    className="btn btn-primary"
                    onClick={handleAppearanceSave}
                  >
                    Save Appearance
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Settings;
