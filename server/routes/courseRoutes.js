import express from "express";
import {
  getCoursesByCareer,
  getCoursesBySkill,
  getAllCourses,
} from "../controllers/courseController.js";

const router = express.Router();

router.get("/", getAllCourses);
router.get("/career/:careerId", getCoursesByCareer);
router.get("/skill/:skillId", getCoursesBySkill);

export default router;
