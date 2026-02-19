import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import "../styles/pages/Counselling.css";

const Counselling = () => {
  const { user } = useAuth();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedCounselor, setSelectedCounselor] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Booking form state
  const [bookingForm, setBookingForm] = useState({
    date: "",
    time: "",
    sessionType: "video",
    notes: "",
  });

  // Mock counselor data (can be moved to backend later)
  const counselors = [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      specialization: "Career Transition & Development",
      experience: 12,
      rating: 4.9,
      languages: ["English", "Hindi", "Marathi"],
      availability: "available",
      image: "👩‍💼",
      bio: "Specialized in helping students and professionals navigate career transitions with 12+ years of experience.",
      sessionsCompleted: 1200,
    },
    {
      id: 2,
      name: "Mr. Rajesh Kumar",
      specialization: "Technical Career Guidance",
      experience: 8,
      rating: 4.8,
      languages: ["English", "Hindi", "Tamil"],
      availability: "available",
      image: "👨‍💼",
      bio: "Expert in IT and engineering career paths. Former software architect turned career counselor.",
      sessionsCompleted: 850,
    },
    {
      id: 3,
      name: "Ms. Ananya Desai",
      specialization: "Creative & Arts Careers",
      experience: 10,
      rating: 4.9,
      languages: ["English", "Hindi", "Gujarati"],
      availability: "busy",
      image: "👩‍🎨",
      bio: "Passionate about guiding creative minds. Specializes in design, media, and arts career counseling.",
      sessionsCompleted: 950,
    },
    {
      id: 4,
      name: "Dr. Vikram Patel",
      specialization: "Medical & Healthcare Careers",
      experience: 15,
      rating: 5.0,
      languages: ["English", "Hindi", "Bengali"],
      availability: "available",
      image: "👨‍⚕️",
      bio: "Medical professional with extensive experience in healthcare career guidance and medical education.",
      sessionsCompleted: 1500,
    },
  ];

  // Time slots for booking
  const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
  ];

  // Update current time every second for real-time features
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Fetch user sessions
  useEffect(() => {
    if (user) {
      fetchSessions();
    }
  }, [user]);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const response = await api.get("/counselling/sessions");
      setSessions(response.data.sessions || []);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookSession = (counselor) => {
    setSelectedCounselor(counselor);
    setShowBookingModal(true);
    setBookingForm({
      date: "",
      time: "",
      sessionType: "video",
      notes: "",
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setBookingForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitBooking = async (e) => {
    e.preventDefault();

    if (!bookingForm.date || !bookingForm.time) {
      alert("Please select both date and time");
      return;
    }

    try {
      setLoading(true);
      await api.post("/counselling/book", {
        session_date: bookingForm.date,
        session_time: bookingForm.time,
        counsellor_name: selectedCounselor.name,
        notes: bookingForm.notes,
      });

      alert(
        "Session booked successfully! We'll send you a confirmation email.",
      );
      setShowBookingModal(false);
      fetchSessions();
    } catch (error) {
      console.error("Error booking session:", error);
      alert(
        error.response?.data?.error ||
          "Failed to book session. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSession = async (sessionId) => {
    if (!confirm("Are you sure you want to cancel this session?")) {
      return;
    }

    try {
      setLoading(true);
      await api.put(`/counselling/cancel/${sessionId}`);
      alert("Session cancelled successfully");
      fetchSessions();
    } catch (error) {
      console.error("Error cancelling session:", error);
      alert(
        error.response?.data?.error ||
          "Failed to cancel session. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // Check if time slot is in the past
  const isTimeSlotPast = (date, time) => {
    if (!date || !time) return false;
    const slotDateTime = new Date(`${date}T${time}`);
    return slotDateTime < currentTime;
  };

  // Calculate countdown for upcoming sessions
  const getCountdown = (sessionDate, sessionTime) => {
    const sessionDateTime = new Date(`${sessionDate}T${sessionTime}`);
    const diff = sessionDateTime - currentTime;

    if (diff <= 0) return "Session time passed";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
    return `${minutes}m ${seconds}s`;
  };

  // Separate upcoming and past sessions
  const upcomingSessions = sessions.filter((session) => {
    const sessionDateTime = new Date(
      `${session.session_date}T${session.session_time}`,
    );
    return sessionDateTime >= currentTime && session.status !== "cancelled";
  });

  const pastSessions = sessions.filter((session) => {
    const sessionDateTime = new Date(
      `${session.session_date}T${session.session_time}`,
    );
    return (
      sessionDateTime < currentTime ||
      session.status === "cancelled" ||
      session.status === "completed"
    );
  });

  return (
    <div className="counselling-page">
      {/* Hero Section */}
      <section className="counselling-hero">
        <div className="container">
          <div className="hero-content">
            <span className="hero-badge">Expert Guidance</span>
            <h1 className="hero-title">
              Get <span className="gradient-text">Personalized</span> Career
              Counselling
            </h1>
            <p className="hero-subtitle">
              Connect with experienced career counselors who understand your
              aspirations and guide you towards the right path.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">4,500+</span>
                <span className="stat-label">Sessions Completed</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">98%</span>
                <span className="stat-label">Satisfaction Rate</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Available Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Counselors Section */}
      <section className="counselors-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Meet Our Expert Counselors</h2>
            <p className="section-subtitle">
              Choose from our team of experienced professionals specialized in
              various fields
            </p>
          </div>

          <div className="counselors-grid">
            {counselors.map((counselor) => (
              <div key={counselor.id} className="counselor-card">
                <div className="counselor-header">
                  <div className="counselor-avatar">{counselor.image}</div>
                  <div
                    className={`availability-badge ${counselor.availability}`}
                  >
                    {counselor.availability === "available"
                      ? "🟢 Available"
                      : "🔴 Busy"}
                  </div>
                </div>

                <div className="counselor-body">
                  <h3 className="counselor-name">{counselor.name}</h3>
                  <p className="counselor-specialization">
                    {counselor.specialization}
                  </p>
                  <p className="counselor-bio">{counselor.bio}</p>

                  <div className="counselor-meta">
                    <div className="meta-item">
                      <span className="meta-icon">⭐</span>
                      <span className="meta-text">
                        {counselor.rating} Rating
                      </span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-icon">📅</span>
                      <span className="meta-text">
                        {counselor.experience} Years
                      </span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-icon">✓</span>
                      <span className="meta-text">
                        {counselor.sessionsCompleted} Sessions
                      </span>
                    </div>
                  </div>

                  <div className="counselor-languages">
                    {counselor.languages.map((lang, index) => (
                      <span key={index} className="language-tag">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="counselor-footer">
                  <button
                    className="btn-book-session"
                    onClick={() => handleBookSession(counselor)}
                    disabled={!user}
                  >
                    {user ? "Book Session" : "Login to Book"}
                    <span className="arrow">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* My Sessions Section */}
      {user && (
        <section className="my-sessions-section">
          <div className="container">
            <h2 className="section-title">My Sessions</h2>

            {/* Upcoming Sessions */}
            <div className="sessions-category">
              <h3 className="category-title">
                Upcoming Sessions ({upcomingSessions.length})
              </h3>
              {upcomingSessions.length > 0 ? (
                <div className="sessions-grid">
                  {upcomingSessions.map((session) => (
                    <div key={session.id} className="session-card upcoming">
                      <div className="session-header">
                        <span className={`status-badge ${session.status}`}>
                          {session.status}
                        </span>
                        <span className="countdown">
                          ⏱️{" "}
                          {getCountdown(
                            session.session_date,
                            session.session_time,
                          )}
                        </span>
                      </div>
                      <h4 className="session-counselor">
                        {session.counsellor_name}
                      </h4>
                      <div className="session-details">
                        <div className="detail-item">
                          <span className="detail-icon">📅</span>
                          <span className="detail-text">
                            {new Date(session.session_date).toLocaleDateString(
                              "en-IN",
                              {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              },
                            )}
                          </span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-icon">🕐</span>
                          <span className="detail-text">
                            {session.session_time}
                          </span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-icon">⏰</span>
                          <span className="detail-text">
                            {session.duration || 60} minutes
                          </span>
                        </div>
                      </div>
                      {session.notes && (
                        <p className="session-notes">
                          <strong>Notes:</strong> {session.notes}
                        </p>
                      )}
                      <div className="session-actions">
                        {session.meeting_link && (
                          <a
                            href={session.meeting_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-join"
                          >
                            Join Meeting
                          </a>
                        )}
                        <button
                          className="btn-cancel"
                          onClick={() => handleCancelSession(session.id)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-sessions">
                  No upcoming sessions. Book one now!
                </p>
              )}
            </div>

            {/* Past Sessions */}
            <div className="sessions-category">
              <h3 className="category-title">
                Past Sessions ({pastSessions.length})
              </h3>
              {pastSessions.length > 0 ? (
                <div className="sessions-grid">
                  {pastSessions.slice(0, 6).map((session) => (
                    <div key={session.id} className="session-card past">
                      <div className="session-header">
                        <span className={`status-badge ${session.status}`}>
                          {session.status}
                        </span>
                      </div>
                      <h4 className="session-counselor">
                        {session.counsellor_name}
                      </h4>
                      <div className="session-details">
                        <div className="detail-item">
                          <span className="detail-icon">📅</span>
                          <span className="detail-text">
                            {new Date(session.session_date).toLocaleDateString(
                              "en-IN",
                            )}
                          </span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-icon">🕐</span>
                          <span className="detail-text">
                            {session.session_time}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-sessions">No past sessions yet.</p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3 className="step-title">Choose a Counselor</h3>
              <p className="step-description">
                Browse our expert counselors and select one that matches your
                needs
              </p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3 className="step-title">Book Your Session</h3>
              <p className="step-description">
                Pick a convenient date and time slot that works for you
              </p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3 className="step-title">Get Guidance</h3>
              <p className="step-description">
                Join the video call and get personalized career advice
              </p>
            </div>
            <div className="step-card">
              <div className="step-number">4</div>
              <h3 className="step-title">Follow Your Path</h3>
              <p className="step-description">
                Implement the action plan and achieve your career goals
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {showBookingModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowBookingModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">
                Book Session with {selectedCounselor?.name}
              </h2>
              <button
                className="modal-close"
                onClick={() => setShowBookingModal(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmitBooking} className="booking-form">
              <div className="form-group">
                <label className="form-label">Select Date</label>
                <input
                  type="date"
                  name="date"
                  className="form-input"
                  value={bookingForm.date}
                  onChange={handleFormChange}
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Select Time Slot</label>
                <div className="time-slots-grid">
                  {timeSlots.map((slot) => {
                    const isPast = isTimeSlotPast(bookingForm.date, slot);
                    return (
                      <button
                        key={slot}
                        type="button"
                        className={`time-slot ${bookingForm.time === slot ? "selected" : ""} ${isPast ? "disabled" : ""}`}
                        onClick={() =>
                          !isPast &&
                          setBookingForm((prev) => ({ ...prev, time: slot }))
                        }
                        disabled={isPast}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Session Type</label>
                <select
                  name="sessionType"
                  className="form-select"
                  value={bookingForm.sessionType}
                  onChange={handleFormChange}
                >
                  <option value="video">Video Call</option>
                  <option value="phone">Phone Call</option>
                  <option value="chat">Chat</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Notes / Concerns (Optional)
                </label>
                <textarea
                  name="notes"
                  className="form-textarea"
                  value={bookingForm.notes}
                  onChange={handleFormChange}
                  placeholder="Tell us what you'd like to discuss..."
                  rows="4"
                ></textarea>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowBookingModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={loading}
                >
                  {loading ? "Booking..." : "Confirm Booking"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Counselling;
