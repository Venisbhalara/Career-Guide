import express from "express";
import {
  getAllCareers,
  getCareerById,
  getCareersByField,
  getAllFields,
} from "../controllers/careerController.js";

const router = express.Router();

router.get("/", getAllCareers);
router.get("/fields/all", getAllFields);
router.get("/field/:field", getCareersByField);
router.get("/:id", getCareerById);

export default router;
