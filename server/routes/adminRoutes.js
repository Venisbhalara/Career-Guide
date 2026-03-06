import express from "express";
import {
  getAnalytics,
  getAllAdminCareers,
  getAdminCareerById,
  addCareer,
  updateCareer,
  deleteCareer,
  getAllUsers,
  toggleAdminRole,
  deleteUser,
  getAllQuestions,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  getAllSessions,
  updateSession,
  deleteSession,
  getAllSubscriptions,
  updateSubscription,
  deleteSubscription,
  getAllMessages,
  updateMessageStatus,
  deleteMessage,
} from "../controllers/adminController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Analytics
router.get("/analytics", protect, admin, getAnalytics);

// Career management
router.get("/careers", protect, admin, getAllAdminCareers);
router.get("/careers/:id", protect, admin, getAdminCareerById);
router.post("/careers", protect, admin, addCareer);
router.put("/careers/:id", protect, admin, updateCareer);
router.delete("/careers/:id", protect, admin, deleteCareer);

// User management
router.get("/users", protect, admin, getAllUsers);
router.put("/users/:id/toggle-admin", protect, admin, toggleAdminRole);
router.delete("/users/:id", protect, admin, deleteUser);

// Assessment management
router.get("/assessments", protect, admin, getAllQuestions);
router.post("/assessments", protect, admin, addQuestion);
router.put("/assessments/:id", protect, admin, updateQuestion);
router.delete("/assessments/:id", protect, admin, deleteQuestion);

// Counselling management
router.get("/counselling", protect, admin, getAllSessions);
router.put("/counselling/:id", protect, admin, updateSession);
router.delete("/counselling/:id", protect, admin, deleteSession);

// Subscription management
router.get("/subscriptions", protect, admin, getAllSubscriptions);
router.put("/subscriptions/:id", protect, admin, updateSubscription);
router.delete("/subscriptions/:id", protect, admin, deleteSubscription);

// Messages management
router.get("/messages", protect, admin, getAllMessages);
router.put("/messages/:id", protect, admin, updateMessageStatus);
router.delete("/messages/:id", protect, admin, deleteMessage);

export default router;
