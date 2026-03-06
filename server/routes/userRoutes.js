import express from "express";
import {
  getSavedCareers,
  toggleSaveCareer,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/saved-careers", protect, getSavedCareers);
router.post("/save-career/:careerId", protect, toggleSaveCareer);

export default router;
