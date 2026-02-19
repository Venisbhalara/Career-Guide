import express from "express";
import {
  getProfile,
  updateProfile,
  getSavedCareers,
  toggleSaveCareer,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.get("/saved-careers", protect, getSavedCareers);
router.post("/save-career/:careerId", protect, toggleSaveCareer);

export default router;
