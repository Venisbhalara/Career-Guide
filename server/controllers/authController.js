import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../config/db.js";

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  console.log("Register request received:", req.body);
  try {
    const { email, password, full_name, phone } = req.body;

    // Validation
    if (!email || !password || !full_name) {
      console.log("Validation failed: Missing fields");
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }

    // Check if user exists
    const [existingUsers] = await pool.query(
      "SELECT id FROM users WHERE email = ?",
      [email],
    );

    if (existingUsers.length > 0) {
      console.log("User already exists:", email);
      return res.status(400).json({ error: "Email already registered" });
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    console.log("Creating new user with data:", { email, full_name });
    try {
      const [result] = await pool.query(
        "INSERT INTO users (email, password, full_name, phone) VALUES (?, ?, ?, ?)",
        [email, hashedPassword, full_name, phone || null],
      );

      const userId = result.insertId;
      console.log("✅ User created successfully with ID:", userId);

      res.status(201).json({
        message: "Registration successful",
        user: {
          id: userId,
          email,
          full_name,
        },
        token: generateToken(userId),
      });
    } catch (dbError) {
      console.error("❌ Database insertion failed:", dbError);
      throw dbError; // Rethrow to be caught by outer catch
    }
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({
      error: "Registration failed: " + error.message,
      details: error.sqlMessage || "No SQL details",
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Please provide email and password" });
    }

    // Get user
    const [users] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (users.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = users[0];

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        is_admin: user.is_admin,
      },
      token: generateToken(user.id),
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed. Please try again." });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const [users] = await pool.query(
      "SELECT id, email, full_name, phone, is_admin, created_at FROM users WHERE id = ?",
      [req.user.id],
    );

    if (users.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user: users[0] });
  } catch (error) {
    console.error("Get me error:", error);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
};
