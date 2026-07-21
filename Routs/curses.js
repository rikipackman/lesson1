import express from "express";
import { 
  getAllCourses, 
  getJsonCourses, 
  getCourseById,
  filterCourses, 
  createCourse, 
  updateCourse, 
  deleteCourse 
} from "../controllers/courses.controller.js";

const router = express.Router();

router.get("/", getAllCourses);
router.get("/all", getJsonCourses);
router.get("/:id", getCourseById);
router.get("/filter", filterCourses);
router.post("/", createCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

export default router;