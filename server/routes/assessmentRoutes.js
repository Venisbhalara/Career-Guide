import express from "express";
import {
  getQuestions,
  submitAssessment,
  getResults,
} from "../controllers/assessmentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/questions", protect, getQuestions);
router.post("/submit", protect, submitAssessment);
router.get("/results", protect, getResults);

export default router;
