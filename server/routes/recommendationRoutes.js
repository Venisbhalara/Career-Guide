import express from "express";
import {
  getRecommendations,
  getSkillGap,
} from "../controllers/recommendationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getRecommendations);
router.get("/skill-gap/:careerId", protect, getSkillGap);

export default router;
