import { pool } from "../config/db.js";

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
