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
