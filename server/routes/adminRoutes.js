import express from "express";
import {
  getAnalytics,
  addCareer,
  updateCareer,
  deleteCareer,
} from "../controllers/adminController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes require admin access
router.get("/analytics", protect, admin, getAnalytics);
router.post("/careers", protect, admin, addCareer);
router.put("/careers/:id", protect, admin, updateCareer);
router.delete("/careers/:id", protect, admin, deleteCareer);

export default router;
