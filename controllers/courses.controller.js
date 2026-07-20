import * as coursesService from "../services/courses.service.js";

export const getAllCourses = (req, res) => {
  const courses = coursesService.fetchAllCourses();
  const responseText = courses
    .map((course, index) => `${index + 1}. ${course.name} - ${course.category}`)
    .join("\n") + "\n";

  res.send(responseText);
};

export const getJsonCourses = (req, res) => {
  res.json(coursesService.fetchAllCourses());
};

export const filterCourses = (req, res) => {
  const categoryQuery = req.query.category;

  if (categoryQuery) {
    const filtered = coursesService.fetchFilteredCourses(categoryQuery);
    return res.json(filtered);
  }

  res.json(coursesService.fetchAllCourses());
};

export const createCourse = (req, res) => {
  const { name, category, targetAudience, description } = req.body;

  if (!name || !category) {
    return res.status(400).json({ message: "Name and Category are required" });
  }

  const newCourse = coursesService.addCourse({ name, category, targetAudience, description });
  res.status(201).json({ message: "Course added successfully", course: newCourse });
};

export const updateCourse = (req, res) => {
  const courseId = Number(req.params.id);
  const updatedCourse = coursesService.editCourse(courseId, req.body);

  if (!updatedCourse) {
    return res.status(404).json({ message: "Course not found" });
  }

  res.json({ message: "Course updated successfully", course: updatedCourse });
};

export const deleteCourse = (req, res) => {
  const courseId = Number(req.params.id);
  const deletedCourse = coursesService.removeCourse(courseId);

  if (!deletedCourse) {
    return res.status(404).json({ message: "Course not found" });
  }

  res.json({ message: "Course deleted successfully", course: deletedCourse });
};