import { pool } from "../config/db.js";

// @desc    Get all careers
// @route   GET /api/careers
// @access  Public
export const getAllCareers = async (req, res) => {
  try {
    const { field, search, limit = 50, offset = 0 } = req.query;

    let query = "SELECT * FROM careers WHERE 1=1";
    const params = [];

    if (field) {
      query += " AND field = ?";
      params.push(field);
    }

    if (search) {
      query += " AND (title LIKE ? OR description LIKE ?)";
      params.push(`%${search}%`, `%${search}%`);
    }

    query += " ORDER BY title LIMIT ? OFFSET ?";
    params.push(parseInt(limit), parseInt(offset));

    const [careers] = await pool.query(query, params);

    // Get total count
    let countQuery = "SELECT COUNT(*) as total FROM careers WHERE 1=1";
    const countParams = [];

    if (field) {
      countQuery += " AND field = ?";
      countParams.push(field);
    }

    if (search) {
      countQuery += " AND (title LIKE ? OR description LIKE ?)";
      countParams.push(`%${search}%`, `%${search}%`);
    }

    const [countResult] = await pool.query(countQuery, countParams);

    res.json({
      careers,
      total: countResult[0].total,
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
  } catch (error) {
    console.error("Get all careers error:", error);
    res.status(500).json({ error: "Failed to fetch careers" });
  }
};

// @desc    Get career by ID with skills
// @route   GET /api/careers/:id
// @access  Public
export const getCareerById = async (req, res) => {
  try {
    const { id } = req.params;

    // Get career details
    const [careers] = await pool.query("SELECT * FROM careers WHERE id = ?", [
      id,
    ]);

    if (careers.length === 0) {
      return res.status(404).json({ error: "Career not found" });
    }

    const career = careers[0];

    res.json({ career });
  } catch (error) {
    console.error("Get career by ID error:", error);
    res.status(500).json({ error: "Failed to fetch career details" });
  }
};

// @desc    Get careers by field
// @route   GET /api/careers/field/:field
// @access  Public
export const getCareersByField = async (req, res) => {
  try {
    const { field } = req.params;

    const [careers] = await pool.query(
      "SELECT * FROM careers WHERE field = ? ORDER BY title",
      [field],
    );

    res.json({ careers, field });
  } catch (error) {
    console.error("Get careers by field error:", error);
    res.status(500).json({ error: "Failed to fetch careers" });
  }
};

// @desc    Get all unique fields
// @route   GET /api/careers/fields/all
// @access  Public
export const getAllFields = async (req, res) => {
  try {
    const [fields] = await pool.query(
      "SELECT DISTINCT field, COUNT(*) as count FROM careers GROUP BY field ORDER BY field",
    );

    res.json({ fields });
  } catch (error) {
    console.error("Get all fields error:", error);
    res.status(500).json({ error: "Failed to fetch fields" });
  }
};
