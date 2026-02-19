import express from "express";
import {
  getPlans,
  getCurrentSubscription,
  subscribe,
} from "../controllers/subscriptionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/plans", getPlans);
router.get("/current", protect, getCurrentSubscription);
router.post("/subscribe", protect, subscribe);

export default router;
