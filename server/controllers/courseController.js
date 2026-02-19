import { pool } from "../config/db.js";

// @desc    Get courses for a career
// @route   GET /api/courses/career/:careerId
// @access  Public
export const getCoursesByCareer = async (req, res) => {
  try {
    const { careerId } = req.params;
    const { platform, is_free, difficulty } = req.query;

    let query = "SELECT * FROM courses WHERE career_id = ?";
    const params = [careerId];

    if (platform) {
      query += " AND platform = ?";
      params.push(platform);
    }

    if (is_free !== undefined) {
      query += " AND is_free = ?";
      params.push(is_free === "true");
    }

    if (difficulty) {
      query += " AND difficulty_level = ?";
      params.push(difficulty);
    }

    query += " ORDER BY rating DESC, is_free DESC";

    const [courses] = await pool.query(query, params);

    res.json({ courses, total: courses.length });
  } catch (error) {
    console.error("Get courses by career error:", error);
    res.status(500).json({ error: "Failed to fetch courses" });
  }
};

// @desc    Get courses for a skill
// @route   GET /api/courses/skill/:skillId
// @access  Public
export const getCoursesBySkill = async (req, res) => {
  try {
    const { skillId } = req.params;

    const [courses] = await pool.query(
      "SELECT * FROM courses WHERE skill_id = ? ORDER BY rating DESC",
      [skillId],
    );

    res.json({ courses, total: courses.length });
  } catch (error) {
    console.error("Get courses by skill error:", error);
    res.status(500).json({ error: "Failed to fetch courses" });
  }
};

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
export const getAllCourses = async (req, res) => {
  try {
    const {
      limit = 20,
      offset = 0,
      search,
      platform,
      difficulty,
      is_free,
      min_rating,
    } = req.query;

    let query = "SELECT * FROM courses WHERE 1=1";
    const params = [];

    // Search filter
    if (search) {
      query += " AND (title LIKE ? OR description LIKE ?)";
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm);
    }

    // Platform filter
    if (platform) {
      query += " AND platform = ?";
      params.push(platform);
    }

    // Difficulty filter
    if (difficulty) {
      query += " AND difficulty_level = ?";
      params.push(difficulty);
    }

    // Price type filter
    if (is_free !== undefined) {
      query += " AND is_free = ?";
      params.push(is_free === "true");
    }

    // Rating filter
    if (min_rating) {
      query += " AND rating >= ?";
      params.push(parseFloat(min_rating));
    }

    // Get total count for pagination
    const countQuery = query.replace("SELECT *", "SELECT COUNT(*) as total");
    const [totalRows] = await pool.query(countQuery, params);
    const total = totalRows[0].total;

    // Add pagination
    query += " ORDER BY rating DESC, created_at DESC LIMIT ? OFFSET ?";
    params.push(parseInt(limit), parseInt(offset));

    const [courses] = await pool.query(query, params);

    res.json({
      courses,
      pagination: {
        total,
        page: Math.floor(parseInt(offset) / parseInt(limit)) + 1,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error("Get all courses error:", error);
    res.status(500).json({ error: "Failed to fetch courses" });
  }
};
