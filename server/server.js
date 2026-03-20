import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { testConnection } from "./config/db.js";
import { validateEnv } from "./utils/validateEnv.js";

// Route imports
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import careerRoutes from "./routes/careerRoutes.js";
import assessmentRoutes from "./routes/assessmentRoutes.js";
import recommendationRoutes from "./routes/recommendationRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import counsellingRoutes from "./routes/counsellingRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
// import subscriptionRoutes from "./routes/subscriptionRoutes.js"; // DISABLED - subscriptions table removed
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
if (!process.env.CLIENT_URL) {
  console.warn(
    "⚠️  WARNING: CLIENT_URL env var is not set. Your production frontend may be blocked by CORS.",
  );
}
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., mobile apps, curl)
      if (!origin) return callback(null, true);

      const allowedLocal = ["http://localhost:5173", "http://localhost:5174"];
      let clientUrl = process.env.CLIENT_URL;
      if (clientUrl) {
        // Strip trailing slash if there is one
        clientUrl = clientUrl.replace(/\/$/, "");
      }

      // Allow if origin is local, matches exact CLIENT_URL, or is a Vercel deployment
      if (
        allowedLocal.includes(origin) ||
        (clientUrl && origin === clientUrl) ||
        origin.endsWith(".vercel.app")
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging (simple, human-style)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Career Guide API",
    status: "active",
    health_check: "/health",
  });
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/careers", careerRoutes);
app.use("/api/assessment", assessmentRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/counselling", counsellingRoutes);
app.use("/api/contact", contactRoutes);
// app.use("/api/subscriptions", subscriptionRoutes); // DISABLED - subscriptions table removed
app.use("/api/admin", adminRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(err.status || 500).json({
    error: err.message || "Something went wrong on our end",
  });
});

import { setupDatabase } from "./database/setup.js";

// Start server
const startServer = async () => {
  try {
    // Validate environment variables
    if (!validateEnv()) {
      console.error(
        "Server startup aborted due to missing environment variables.",
      );
      if (!process.env.VERCEL) process.exit(1);
    }

    // Initialize/Sync Database
    await setupDatabase();

    await testConnection();

    // Only start listening if we're not running on Vercel
    if (!process.env.VERCEL) {
      app.listen(PORT, () => {
        console.log(`\n Server running on http://localhost:${PORT}`);
        console.log(` Environment: ${process.env.NODE_ENV || "development"}\n`);
      });
    }
  } catch (error) {
    console.error("Failed to start server:", error);
    if (!process.env.VERCEL) process.exit(1);
  }
};

startServer();

// Export the app for Vercel serverless functions
export default app;
