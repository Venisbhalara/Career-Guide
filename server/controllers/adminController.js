import { pool } from "../config/db.js";

// @desc    Get platform analytics
// @route   GET /api/admin/analytics
// @access  Private/Admin
export const getAnalytics = async (req, res) => {
  try {
    // Total users
    const [userCount] = await pool.query("SELECT COUNT(*) as total FROM users");

    // Total careers
    const [careerCount] = await pool.query(
      "SELECT COUNT(*) as total FROM careers",
    );

    // Assessments completed
    const [assessmentCount] = await pool.query(
      "SELECT COUNT(DISTINCT user_id) as total FROM assessment_answers",
    );

    // Counselling sessions
    const [sessionCount] = await pool.query(
      "SELECT status, COUNT(*) as count FROM counselling_sessions GROUP BY status",
    );

    res.json({
      analytics: {
        total_users: userCount[0].total,
        total_careers: careerCount[0].total,
        assessments_completed: assessmentCount[0].total,
        counselling_sessions: sessionCount,
      },
    });
  } catch (error) {
    console.error("Get analytics error:", error);
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
};

// @desc    Get all careers (admin — paginated + search)
// @route   GET /api/admin/careers
// @access  Private/Admin
export const getAllAdminCareers = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, parseInt(req.query.limit) || 12);
    const offset = (page - 1) * limit;
    const search = req.query.search?.trim() || "";
    const field = req.query.field || "";

    let where = "WHERE 1=1";
    const vals = [];

    if (search) {
      where += " AND (title LIKE ? OR description LIKE ?)";
      vals.push(`%${search}%`, `%${search}%`);
    }
    if (field) {
      where += " AND field = ?";
      vals.push(field);
    }

    const [[{ total }]] = await pool.query(
      `SELECT COUNT(*) AS total FROM careers ${where}`,
      vals,
    );

    const [careers] = await pool.query(
      `SELECT id, title, field, description, avg_salary_min, avg_salary_max,
              education_required, job_outlook, created_at
       FROM careers ${where}
       ORDER BY created_at DESC
       LIMIT ? OFFSET ?`,
      [...vals, limit, offset],
    );

    // distinct fields for filter dropdown
    const [fields] = await pool.query(
      "SELECT DISTINCT field FROM careers ORDER BY field",
    );

    res.json({
      careers,
      fields: fields.map((f) => f.field),
      pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("Admin get careers error:", error);
    res.status(500).json({ error: "Failed to fetch careers" });
  }
};

// @desc    Get single career full detail (for edit form)
// @route   GET /api/admin/careers/:id
// @access  Private/Admin
export const getAdminCareerById = async (req, res) => {
  try {
    const [[career]] = await pool.query("SELECT * FROM careers WHERE id = ?", [
      req.params.id,
    ]);
    if (!career) return res.status(404).json({ error: "Career not found" });
    res.json({ career });
  } catch (error) {
    console.error("Admin get career error:", error);
    res.status(500).json({ error: "Failed to fetch career" });
  }
};

// @desc    Add new career
// @route   POST /api/admin/careers
// @access  Private/Admin
export const addCareer = async (req, res) => {
  try {
    const {
      title,
      field,
      description,
      detailed_description,
      avg_salary_min,
      avg_salary_max,
      education_required,
      roadmap,
    } = req.body;

    const [result] = await pool.query(
      `INSERT INTO careers 
       (title, field, description, detailed_description, avg_salary_min, avg_salary_max, education_required, roadmap) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        field,
        description,
        detailed_description,
        avg_salary_min,
        avg_salary_max,
        education_required,
        JSON.stringify(roadmap),
      ],
    );

    res.status(201).json({
      message: "Career added successfully",
      career_id: result.insertId,
    });
  } catch (error) {
    console.error("Add career error:", error);
    res.status(500).json({ error: "Failed to add career" });
  }
};

// @desc    Update career
// @route   PUT /api/admin/careers/:id
// @access  Private/Admin
export const updateCareer = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const fields = [];
    const values = [];

    Object.keys(updates).forEach((key) => {
      if (key === "roadmap") {
        fields.push(`${key} = ?`);
        values.push(JSON.stringify(updates[key]));
      } else {
        fields.push(`${key} = ?`);
        values.push(updates[key]);
      }
    });

    values.push(id);

    await pool.query(
      `UPDATE careers SET ${fields.join(", ")} WHERE id = ?`,
      values,
    );

    res.json({ message: "Career updated successfully" });
  } catch (error) {
    console.error("Update career error:", error);
    res.status(500).json({ error: "Failed to update career" });
  }
};

// @desc    Delete career
// @route   DELETE /api/admin/careers/:id
// @access  Private/Admin
export const deleteCareer = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM careers WHERE id = ?", [id]);

    res.json({ message: "Career deleted successfully" });
  } catch (error) {
    console.error("Delete career error:", error);
    res.status(500).json({ error: "Failed to delete career" });
  }
};

// ─── User Management ────────────────────────────────────────────────────────

// @desc    Get all users with search, filter, pagination
// @route   GET /api/admin/users
// @access  Private/Admin
export const getAllUsers = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, parseInt(req.query.limit) || 20);
    const offset = (page - 1) * limit;
    const search = req.query.search?.trim() || "";
    const role = req.query.role || "all"; // "all" | "admin" | "user"

    let where = "WHERE 1=1";
    const vals = [];

    if (search) {
      where += " AND (full_name LIKE ? OR email LIKE ?)";
      vals.push(`%${search}%`, `%${search}%`);
    }
    if (role === "admin") {
      where += " AND is_admin = 1";
    } else if (role === "user") {
      where += " AND is_admin = 0";
    }

    const [[{ total }]] = await pool.query(
      `SELECT COUNT(*) AS total FROM users ${where}`,
      vals,
    );

    const [users] = await pool.query(
      `SELECT id, email, full_name, phone, gender,
              is_admin, created_at
       FROM users ${where}
       ORDER BY created_at DESC
       LIMIT ? OFFSET ?`,
      [...vals, limit, offset],
    );

    res.json({
      users,
      pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("Get all users error:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// @desc    Toggle admin role for a user
// @route   PUT /api/admin/users/:id/toggle-admin
// @access  Private/Admin
export const toggleAdminRole = async (req, res) => {
  try {
    const { id } = req.params;

    // Prevent self-demotion
    if (parseInt(id) === req.user.id) {
      return res
        .status(400)
        .json({ error: "Cannot change your own admin role" });
    }

    const [[user]] = await pool.query(
      "SELECT id, is_admin FROM users WHERE id = ?",
      [id],
    );
    if (!user) return res.status(404).json({ error: "User not found" });

    const newRole = !user.is_admin;
    await pool.query("UPDATE users SET is_admin = ? WHERE id = ?", [
      newRole,
      id,
    ]);

    res.json({
      message: `User ${newRole ? "promoted to admin" : "demoted to regular user"}`,
      is_admin: newRole,
    });
  } catch (error) {
    console.error("Toggle admin error:", error);
    res.status(500).json({ error: "Failed to update user role" });
  }
};

// @desc    Delete a user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (parseInt(id) === req.user.id) {
      return res.status(400).json({ error: "Cannot delete your own account" });
    }

    const [[user]] = await pool.query("SELECT id FROM users WHERE id = ?", [
      id,
    ]);
    if (!user) return res.status(404).json({ error: "User not found" });

    await pool.query("DELETE FROM users WHERE id = ?", [id]);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
};

// ─── Assessment Management ──────────────────────────────────────────────────

// @desc    Get all assessment questions (admin) + submission stats
// @route   GET /api/admin/assessments
// @access  Private/Admin
export const getAllQuestions = async (req, res) => {
  try {
    const typeFilter = req.query.type || "";

    let where = "WHERE 1=1";
    const vals = [];
    if (typeFilter) {
      where += " AND question_type = ?";
      vals.push(typeFilter);
    }

    const [questions] = await pool.query(
      `SELECT id, question_text, question_type, category, options, scoring_weights, created_at
       FROM assessment_questions ${where}
       ORDER BY question_type, id`,
      vals,
    );

    // Count distinct users who have submitted at least one answer
    const [[{ submittedUsers }]] = await pool.query(
      "SELECT COUNT(DISTINCT user_id) AS submittedUsers FROM assessment_answers",
    );

    // Count by type
    const [typeCounts] = await pool.query(
      "SELECT question_type, COUNT(*) AS count FROM assessment_questions GROUP BY question_type",
    );

    const parsed = questions.map((q) => ({
      ...q,
      options:
        typeof q.options === "string" ? JSON.parse(q.options) : q.options,
      scoring_weights:
        typeof q.scoring_weights === "string"
          ? JSON.parse(q.scoring_weights)
          : q.scoring_weights,
    }));

    res.json({ questions: parsed, submittedUsers, typeCounts });
  } catch (error) {
    console.error("Admin get questions error:", error);
    res.status(500).json({ error: "Failed to fetch questions" });
  }
};

// @desc    Add assessment question
// @route   POST /api/admin/assessments
// @access  Private/Admin
export const addQuestion = async (req, res) => {
  try {
    const { question_text, question_type, category, options, scoring_weights } =
      req.body;

    if (!question_text || !question_type) {
      return res
        .status(400)
        .json({ error: "question_text and question_type are required" });
    }

    const [result] = await pool.query(
      `INSERT INTO assessment_questions (question_text, question_type, category, options, scoring_weights)
       VALUES (?, ?, ?, ?, ?)`,
      [
        question_text,
        question_type,
        category || null,
        JSON.stringify(options || []),
        JSON.stringify(scoring_weights || {}),
      ],
    );

    res.status(201).json({ message: "Question added", id: result.insertId });
  } catch (error) {
    console.error("Add question error:", error);
    res.status(500).json({ error: "Failed to add question" });
  }
};

// @desc    Update assessment question
// @route   PUT /api/admin/assessments/:id
// @access  Private/Admin
export const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { question_text, question_type, category, options, scoring_weights } =
      req.body;

    await pool.query(
      `UPDATE assessment_questions
       SET question_text = ?, question_type = ?, category = ?, options = ?, scoring_weights = ?
       WHERE id = ?`,
      [
        question_text,
        question_type,
        category || null,
        JSON.stringify(options || []),
        JSON.stringify(scoring_weights || {}),
        id,
      ],
    );

    res.json({ message: "Question updated" });
  } catch (error) {
    console.error("Update question error:", error);
    res.status(500).json({ error: "Failed to update question" });
  }
};

// @desc    Delete assessment question
// @route   DELETE /api/admin/assessments/:id
// @access  Private/Admin
export const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM assessment_questions WHERE id = ?", [id]);
    res.json({ message: "Question deleted" });
  } catch (error) {
    console.error("Delete question error:", error);
    res.status(500).json({ error: "Failed to delete question" });
  }
};

// ─── Counselling Management ──────────────────────────────────────────────────

// @desc    Get all counselling sessions (admin) with user info
// @route   GET /api/admin/counselling
// @access  Private/Admin
export const getAllSessions = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, parseInt(req.query.limit) || 15);
    const offset = (page - 1) * limit;
    const search = req.query.search?.trim() || "";
    const status = req.query.status || "";

    let where = "WHERE 1=1";
    const vals = [];

    if (status) {
      where += " AND cs.status = ?";
      vals.push(status);
    }
    if (search) {
      where +=
        " AND (u.full_name LIKE ? OR u.email LIKE ? OR cs.counsellor_name LIKE ?)";
      vals.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    const [[{ total }]] = await pool.query(
      `SELECT COUNT(*) AS total
       FROM counselling_sessions cs
       JOIN users u ON cs.user_id = u.id
       ${where}`,
      vals,
    );

    const [sessions] = await pool.query(
      `SELECT cs.id, cs.session_date, cs.session_time, cs.duration,
              cs.status, cs.counsellor_name, cs.meeting_link, cs.notes,
              cs.created_at,
              u.id AS user_id, u.full_name, u.email, u.phone
       FROM counselling_sessions cs
       JOIN users u ON cs.user_id = u.id
       ${where}
       ORDER BY cs.session_date DESC, cs.session_time DESC
       LIMIT ? OFFSET ?`,
      [...vals, limit, offset],
    );

    // Status counts for summary cards
    const [statusCounts] = await pool.query(
      "SELECT status, COUNT(*) AS count FROM counselling_sessions GROUP BY status",
    );

    res.json({
      sessions,
      statusCounts,
      pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("Admin get sessions error:", error);
    res.status(500).json({ error: "Failed to fetch sessions" });
  }
};

// @desc    Update session status, counsellor, meeting link, notes
// @route   PUT /api/admin/counselling/:id
// @access  Private/Admin
export const updateSession = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, meeting_link, counsellor_name, notes } = req.body;

    const [[session]] = await pool.query(
      "SELECT id FROM counselling_sessions WHERE id = ?",
      [id],
    );
    if (!session) return res.status(404).json({ error: "Session not found" });

    const updates = [];
    const vals = [];

    if (status) {
      updates.push("status = ?");
      vals.push(status);
    }
    if (meeting_link !== undefined) {
      updates.push("meeting_link = ?");
      vals.push(meeting_link || null);
    }
    if (counsellor_name) {
      updates.push("counsellor_name = ?");
      vals.push(counsellor_name);
    }
    if (notes !== undefined) {
      updates.push("notes = ?");
      vals.push(notes || null);
    }

    if (!updates.length)
      return res.status(400).json({ error: "Nothing to update" });

    vals.push(id);
    await pool.query(
      `UPDATE counselling_sessions SET ${updates.join(", ")} WHERE id = ?`,
      vals,
    );

    res.json({ message: "Session updated" });
  } catch (error) {
    console.error("Update session error:", error);
    res.status(500).json({ error: "Failed to update session" });
  }
};

// @desc    Delete a counselling session
// @route   DELETE /api/admin/counselling/:id
// @access  Private/Admin
export const deleteSession = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM counselling_sessions WHERE id = ?", [id]);
    res.json({ message: "Session deleted" });
  } catch (error) {
    console.error("Delete session error:", error);
    res.status(500).json({ error: "Failed to delete session" });
  }
};

// ─── Subscription Management ─────────────────────────────────────────────────

const PLAN_PRICES = { free: 0, basic: 499, premium: 999, enterprise: 2499 };

// @desc    Get all subscriptions (admin) with user info
// @route   GET /api/admin/subscriptions
// @access  Private/Admin
export const getAllSubscriptions = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, parseInt(req.query.limit) || 15);
    const offset = (page - 1) * limit;
    const search = req.query.search?.trim() || "";
    const plan = req.query.plan || "";
    const status = req.query.status || "";

    let where = "WHERE 1=1";
    const vals = [];

    if (status) {
      where += " AND s.status = ?";
      vals.push(status);
    }
    if (plan) {
      where += " AND s.plan_type = ?";
      vals.push(plan);
    }
    if (search) {
      where += " AND (u.full_name LIKE ? OR u.email LIKE ?)";
      vals.push(`%${search}%`, `%${search}%`);
    }

    const [[{ total }]] = await pool.query(
      `SELECT COUNT(*) AS total
       FROM subscriptions s JOIN users u ON s.user_id = u.id ${where}`,
      vals,
    );

    const [subs] = await pool.query(
      `SELECT s.id, s.plan_type, s.status, s.start_date, s.end_date,
              s.payment_id, s.amount, s.currency, s.created_at,
              u.id AS user_id, u.full_name, u.email
       FROM subscriptions s JOIN users u ON s.user_id = u.id
       ${where}
       ORDER BY s.created_at DESC
       LIMIT ? OFFSET ?`,
      [...vals, limit, offset],
    );

    // Summary counts
    const [planCounts] = await pool.query(
      "SELECT plan_type, COUNT(*) AS count FROM subscriptions WHERE status='active' GROUP BY plan_type",
    );
    const [statusCounts] = await pool.query(
      "SELECT status, COUNT(*) AS count FROM subscriptions GROUP BY status",
    );
    const [[{ revenue }]] = await pool.query(
      "SELECT COALESCE(SUM(amount),0) AS revenue FROM subscriptions WHERE status='active'",
    );

    res.json({
      subscriptions: subs,
      planCounts,
      statusCounts,
      revenue,
      pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("Admin get subscriptions error:", error);
    res.status(500).json({ error: "Failed to fetch subscriptions" });
  }
};

// @desc    Update a subscription (plan or status)
// @route   PUT /api/admin/subscriptions/:id
// @access  Private/Admin
export const updateSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const { plan_type, status, end_date } = req.body;

    const [[sub]] = await pool.query(
      "SELECT id FROM subscriptions WHERE id = ?",
      [id],
    );
    if (!sub) return res.status(404).json({ error: "Subscription not found" });

    const updates = [];
    const vals = [];

    if (plan_type) {
      updates.push("plan_type = ?", "amount = ?");
      vals.push(plan_type, PLAN_PRICES[plan_type] ?? 0);
    }
    if (status) {
      updates.push("status = ?");
      vals.push(status);
    }
    if (end_date) {
      updates.push("end_date = ?");
      vals.push(end_date);
    }

    if (!updates.length)
      return res.status(400).json({ error: "Nothing to update" });

    vals.push(id);
    await pool.query(
      `UPDATE subscriptions SET ${updates.join(", ")} WHERE id = ?`,
      vals,
    );

    res.json({ message: "Subscription updated" });
  } catch (error) {
    console.error("Update subscription error:", error);
    res.status(500).json({ error: "Failed to update subscription" });
  }
};

// @desc    Cancel / delete a subscription
// @route   DELETE /api/admin/subscriptions/:id
// @access  Private/Admin
export const deleteSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM subscriptions WHERE id = ?", [id]);
    res.json({ message: "Subscription deleted" });
  } catch (error) {
    console.error("Delete subscription error:", error);
    res.status(500).json({ error: "Failed to delete subscription" });
  }
};

// ─── Messages Management ──────────────────────────────────────────────────────

// @desc    Get all contact messages (admin)
// @route   GET /api/admin/messages
// @access  Private/Admin
export const getAllMessages = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, parseInt(req.query.limit) || 20);
    const offset = (page - 1) * limit;
    const search = req.query.search?.trim() || "";
    const status = req.query.status || "";

    let where = "WHERE 1=1";
    const vals = [];

    if (status) {
      where += " AND status = ?";
      vals.push(status);
    }
    if (search) {
      where +=
        " AND (name LIKE ? OR email LIKE ? OR subject LIKE ? OR message LIKE ?)";
      vals.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
    }

    const [[{ total }]] = await pool.query(
      `SELECT COUNT(*) AS total FROM contacts ${where}`,
      vals,
    );

    const [messages] = await pool.query(
      `SELECT id, name, email, subject, message, status, created_at, updated_at
       FROM contacts ${where}
       ORDER BY created_at DESC
       LIMIT ? OFFSET ?`,
      [...vals, limit, offset],
    );

    // Status counts for summary
    const [statusCounts] = await pool.query(
      "SELECT status, COUNT(*) AS count FROM contacts GROUP BY status",
    );

    res.json({
      messages,
      statusCounts,
      pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("Admin get messages error:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

// @desc    Update message status
// @route   PUT /api/admin/messages/:id
// @access  Private/Admin
export const updateMessageStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["new", "read", "replied"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const [result] = await pool.query(
      "UPDATE contacts SET status = ? WHERE id = ?",
      [status, id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Message not found" });
    }

    res.json({ message: "Status updated" });
  } catch (error) {
    console.error("Update message status error:", error);
    res.status(500).json({ error: "Failed to update message status" });
  }
};

// @desc    Delete a contact message
// @route   DELETE /api/admin/messages/:id
// @access  Private/Admin
export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM contacts WHERE id = ?", [id]);
    res.json({ message: "Message deleted" });
  } catch (error) {
    console.error("Delete message error:", error);
    res.status(500).json({ error: "Failed to delete message" });
  }
};
