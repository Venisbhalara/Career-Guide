import express from "express";
import {
  submitContact,
  getAllContacts,
  updateContactStatus,
} from "../controllers/contactController.js";

const router = express.Router();

// Public route - submit contact form
router.post("/", submitContact);

// Admin routes (can add authentication middleware later)
router.get("/", getAllContacts);
router.patch("/:id", updateContactStatus);

export default router;
