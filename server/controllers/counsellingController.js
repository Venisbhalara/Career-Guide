import { pool } from "../config/db.js";

// @desc    Book a counselling session
// @route   POST /api/counselling/book
// @access  Private
export const bookSession = async (req, res) => {
  try {
    const { session_date, session_time, counsellor_name, notes } = req.body;

    if (!session_date || !session_time) {
      return res
        .status(400)
        .json({ error: "Please provide session date and time" });
    }

    const [result] = await pool.query(
      `INSERT INTO counselling_sessions 
       (user_id, session_date, session_time, counsellor_name, notes, status) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        req.user.id,
        session_date,
        session_time,
        counsellor_name || "To be assigned",
        notes || null,
        "pending",
      ],
    );

    res.status(201).json({
      message: "Session booked successfully",
      session_id: result.insertId,
    });
  } catch (error) {
    console.error("Book session error:", error);
    res.status(500).json({ error: "Failed to book session" });
  }
};

// @desc    Get user's counselling sessions
// @route   GET /api/counselling/sessions
// @access  Private
export const getUserSessions = async (req, res) => {
  try {
    const { status } = req.query;

    let query = "SELECT * FROM counselling_sessions WHERE user_id = ?";
    const params = [req.user.id];

    if (status) {
      query += " AND status = ?";
      params.push(status);
    }

    query += " ORDER BY session_date DESC, session_time DESC";

    const [sessions] = await pool.query(query, params);

    res.json({ sessions, total: sessions.length });
  } catch (error) {
    console.error("Get user sessions error:", error);
    res.status(500).json({ error: "Failed to fetch sessions" });
  }
};

// @desc    Cancel a session
// @route   PUT /api/counselling/cancel/:sessionId
// @access  Private
export const cancelSession = async (req, res) => {
  try {
    const { sessionId } = req.params;

    // Verify session belongs to user
    const [sessions] = await pool.query(
      "SELECT * FROM counselling_sessions WHERE id = ? AND user_id = ?",
      [sessionId, req.user.id],
    );

    if (sessions.length === 0) {
      return res.status(404).json({ error: "Session not found" });
    }

    await pool.query(
      "UPDATE counselling_sessions SET status = ? WHERE id = ?",
      ["cancelled", sessionId],
    );

    res.json({ message: "Session cancelled successfully" });
  } catch (error) {
    console.error("Cancel session error:", error);
    res.status(500).json({ error: "Failed to cancel session" });
  }
};

// @desc    Get all counselors (mock data - can be moved to database)
// @route   GET /api/counselling/counselors
// @access  Public
export const getCounselors = async (req, res) => {
  try {
    // Mock counselor data - in production, this would come from a database
    const counselors = [
      {
        id: 1,
        name: "Dr. Priya Sharma",
        specialization: "Career Transition & Development",
        experience: 12,
        rating: 4.9,
        languages: ["English", "Hindi", "Marathi"],
        availability: "available",
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
        bio: "Medical professional with extensive experience in healthcare career guidance and medical education.",
        sessionsCompleted: 1500,
      },
    ];

    res.json({ counselors });
  } catch (error) {
    console.error("Get counselors error:", error);
    res.status(500).json({ error: "Failed to fetch counselors" });
  }
};

// @desc    Get available time slots for a counselor on a specific date
// @route   GET /api/counselling/available-slots
// @access  Public
export const getAvailableSlots = async (req, res) => {
  try {
    const { counselorId, date } = req.query;

    if (!date) {
      return res.status(400).json({ error: "Date is required" });
    }

    // Get all booked sessions for the date
    const [bookedSessions] = await pool.query(
      "SELECT session_time FROM counselling_sessions WHERE session_date = ? AND status != ?",
      [date, "cancelled"],
    );

    const bookedTimes = bookedSessions.map((session) => session.session_time);

    // All available time slots
    const allSlots = [
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

    // Filter out booked slots
    const availableSlots = allSlots.filter(
      (slot) => !bookedTimes.includes(slot),
    );

    res.json({ availableSlots, bookedSlots: bookedTimes });
  } catch (error) {
    console.error("Get available slots error:", error);
    res.status(500).json({ error: "Failed to fetch available slots" });
  }
};

// @desc    Reschedule a session
// @route   PUT /api/counselling/reschedule/:sessionId
// @access  Private
export const rescheduleSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { session_date, session_time } = req.body;

    if (!session_date || !session_time) {
      return res
        .status(400)
        .json({ error: "Please provide new session date and time" });
    }

    // Verify session belongs to user
    const [sessions] = await pool.query(
      "SELECT * FROM counselling_sessions WHERE id = ? AND user_id = ?",
      [sessionId, req.user.id],
    );

    if (sessions.length === 0) {
      return res.status(404).json({ error: "Session not found" });
    }

    // Check if the new slot is available
    const [existingSessions] = await pool.query(
      "SELECT * FROM counselling_sessions WHERE session_date = ? AND session_time = ? AND status != ?",
      [session_date, session_time, "cancelled"],
    );

    if (existingSessions.length > 0) {
      return res
        .status(400)
        .json({ error: "This time slot is already booked" });
    }

    // Update the session
    await pool.query(
      "UPDATE counselling_sessions SET session_date = ?, session_time = ?, status = ? WHERE id = ?",
      [session_date, session_time, "pending", sessionId],
    );

    res.json({ message: "Session rescheduled successfully" });
  } catch (error) {
    console.error("Reschedule session error:", error);
    res.status(500).json({ error: "Failed to reschedule session" });
  }
};
