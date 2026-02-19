import { pool } from "../config/db.js";

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getProfile = async (req, res) => {
  try {
    const [users] = await pool.query(
      `SELECT id, email, full_name, phone, date_of_birth, gender, 
              education_level, current_status, interests, profile_completed, 
              created_at, updated_at 
       FROM users WHERE id = ?`,
      [req.user.id],
    );

    if (users.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ profile: users[0] });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const {
      full_name,
      phone,
      date_of_birth,
      gender,
      education_level,
      current_status,
      interests,
    } = req.body;

    const updates = [];
    const values = [];

    if (full_name) {
      updates.push("full_name = ?");
      values.push(full_name);
    }
    if (phone) {
      updates.push("phone = ?");
      values.push(phone);
    }
    if (date_of_birth) {
      updates.push("date_of_birth = ?");
      values.push(date_of_birth);
    }
    if (gender) {
      updates.push("gender = ?");
      values.push(gender);
    }
    if (education_level) {
      updates.push("education_level = ?");
      values.push(education_level);
    }
    if (current_status) {
      updates.push("current_status = ?");
      values.push(current_status);
    }
    if (interests) {
      updates.push("interests = ?");
      values.push(interests);
    }

    // Mark profile as completed if key fields are filled
    if (education_level && current_status && interests) {
      updates.push("profile_completed = ?");
      values.push(true);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    values.push(req.user.id);

    await pool.query(
      `UPDATE users SET ${updates.join(", ")} WHERE id = ?`,
      values,
    );

    // Fetch updated profile
    const [users] = await pool.query(
      "SELECT id, email, full_name, phone, date_of_birth, gender, education_level, current_status, interests, profile_completed FROM users WHERE id = ?",
      [req.user.id],
    );

    res.json({
      message: "Profile updated successfully",
      profile: users[0],
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
};

// @desc    Get user's saved careers (DISABLED - user_progress table removed)
// @route   GET /api/users/saved-careers
// @access  Private
export const getSavedCareers = async (req, res) => {
  res.status(503).json({
    error: "Saved careers feature is currently unavailable",
    message: "This feature has been disabled due to database schema changes",
  });
};

// @desc    Save/unsave a career (DISABLED - user_progress table removed)
// @route   POST /api/users/save-career/:careerId
// @access  Private
export const toggleSaveCareer = async (req, res) => {
  res.status(503).json({
    error: "Save career feature is currently unavailable",
    message: "This feature has been disabled due to database schema changes",
  });
};
