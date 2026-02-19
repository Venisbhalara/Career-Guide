import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import "../styles/pages/Common.css";
import "../styles/pages/ProfileSetup.css"; // Import premium styles

const ProfileSetup = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showLimitWarning, setShowLimitWarning] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    date_of_birth: "",
    gender: "",
    education_level: "",
    current_status: "",
    interests: [],
  });

  // Pre-fill data if available
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        ...user,
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
          : typeof user.interests === "string"
            ? user.interests.split(",").map((i) => i.trim())
            : [],
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInterestToggle = (interest) => {
    setShowLimitWarning(false);
    setFormData((prev) => {
      const currentInterests = prev.interests;
      if (currentInterests.includes(interest)) {
        return {
          ...prev,
          interests: currentInterests.filter((i) => i !== interest),
        };
      } else {
        if (currentInterests.length >= 5) {
          setShowLimitWarning(true);
          return prev;
        }
        return { ...prev, interests: [...currentInterests, interest] };
      }
    });
  };

  const validateStep = () => {
    setError(null);
    if (step === 1) {
      if (
        !formData.full_name ||
        !formData.phone ||
        !formData.date_of_birth ||
        !formData.gender
      ) {
        setError("Please fill in all fields.");
        return false;
      }
    }
    if (step === 2) {
      if (!formData.education_level || !formData.current_status) {
        setError("Please select both education level and current status.");
        return false;
      }
    }
    if (step === 3) {
      if (formData.interests.length === 0) {
        setError("Please select at least one interest.");
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setError(null);
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    setLoading(true);
    try {
      const payload = {
        ...formData,
        interests: formData.interests.join(", "),
      };

      const response = await api.put("/users/profile", payload);

      updateUser(response.data.profile);
      navigate("/dashboard");
    } catch (err) {
      console.error("Profile update failed:", err);
      setError(err.response?.data?.error || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

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

  // Enhanced Interest Tags with Icons
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

  return (
    <div className="page-container">
      <div className="container page-content">
        <div
          className="profile-setup-card card glass fade-in"
          style={{ maxWidth: "800px", margin: "0 auto" }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div
              className="page-icon"
              style={{ fontSize: "3rem", marginBottom: "1rem" }}
            >
              {step === 1 && "👤"}
              {step === 2 && "🎓"}
              {step === 3 && "🎯"}
            </div>
            <h1 className="gradient-text" style={{ fontSize: "2.5rem" }}>
              {step === 1 && "Personal Details"}
              {step === 2 && "Education & Status"}
              {step === 3 && "Interests & Goals"}
            </h1>
            <p className="text-secondary">
              Step {step} of 3 • Let's get to know you better
            </p>
          </div>

          {/* Progress Bar */}
          <div
            className="progress-container mb-8"
            style={{
              height: "4px",
              background: "var(--color-border)",
              borderRadius: "2px",
              overflow: "hidden",
            }}
          >
            <div
              className="progress-bar"
              style={{
                width: `${(step / 3) * 100}%`,
                height: "100%",
                background: "var(--color-primary)",
                transition: "width 0.3s ease",
              }}
            />
          </div>

          {/* Form Content */}
          <div className="form-content mb-8">
            {error && (
              <div className="form-error text-center mb-4 p-2 bg-red-50 rounded">
                {error}
              </div>
            )}

            {/* Step 1: Personal Details */}
            {step === 1 && (
              <div className="slide-in">
                <div className="grid grid-cols-2 gap-6">
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Date of Birth</label>
                    <input
                      type="date"
                      name="date_of_birth"
                      value={formData.date_of_birth}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Education & Status */}
            {step === 2 && (
              <div className="slide-in">
                <div className="form-group mb-6">
                  <label className="form-label">Current Education Level</label>
                  <div className="grid grid-cols-2 gap-4">
                    {EDUCATION_LEVELS.map((level) => (
                      <div
                        key={level}
                        className={`card card-flat p-4 cursor-pointer transition-all ${
                          formData.education_level === level
                            ? "border-primary bg-primary-light/10 shadow-md ring-2 ring-primary ring-opacity-50"
                            : "hover:border-primary-light"
                        }`}
                        style={{
                          borderColor:
                            formData.education_level === level
                              ? "var(--color-primary)"
                              : "var(--color-border)",
                          backgroundColor:
                            formData.education_level === level
                              ? "rgba(79, 70, 229, 0.05)"
                              : "white",
                        }}
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            education_level: level,
                          }))
                        }
                      >
                        <div className="font-medium text-center">{level}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Current Status</label>
                  <select
                    name="current_status"
                    value={formData.current_status}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Select your current status</option>
                    {CURRENT_STATUSES.map((stat) => (
                      <option key={stat} value={stat}>
                        {stat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Step 3: Interests - PREMIUM UI */}
            {step === 3 && (
              <div className="slide-in text-center">
                <div className="interest-counter">
                  <span>Selected Interests:</span>
                  <div className="counter-dots">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`dot ${i < formData.interests.length ? "active" : ""} ${formData.interests.length === 5 ? "full" : ""}`}
                      />
                    ))}
                  </div>
                  <span style={{ color: "var(--color-text-primary)" }}>
                    {formData.interests.length}/5
                  </span>
                </div>

                <div
                  className={`max-limit-warning ${showLimitWarning ? "visible" : ""}`}
                >
                  ⚠️ You can strictly only select up to 5 interests.
                </div>

                <div className="interest-grid">
                  {INTEREST_OPTIONS.map((opt) => {
                    const isSelected = formData.interests.includes(opt.label);
                    return (
                      <div
                        key={opt.id}
                        className={`interest-card ${isSelected ? "selected" : ""}`}
                        onClick={() => handleInterestToggle(opt.label)}
                      >
                        <div className="selection-badge">✓</div>
                        <div className="interest-icon">{opt.icon}</div>
                        <div className="interest-label">{opt.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
            {step > 1 ? (
              <button onClick={handlePrev} className="btn btn-secondary">
                Back
              </button>
            ) : (
              <div></div> // Spacer
            )}

            {step < 3 ? (
              <button onClick={handleNext} className="btn btn-primary">
                Next Step
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="btn btn-primary"
                style={{ minWidth: "140px" }}
              >
                {loading ? "Saving..." : "Complete Profile"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;
