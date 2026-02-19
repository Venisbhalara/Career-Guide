import express from "express";
import {
  bookSession,
  getUserSessions,
  cancelSession,
  getCounselors,
  getAvailableSlots,
  rescheduleSession,
} from "../controllers/counsellingController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/counselors", getCounselors);
router.get("/available-slots", getAvailableSlots);

// Protected routes
router.post("/book", protect, bookSession);
router.get("/sessions", protect, getUserSessions);
router.put("/cancel/:sessionId", protect, cancelSession);
router.put("/reschedule/:sessionId", protect, rescheduleSession);

export default router;
