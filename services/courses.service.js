import { courses } from "../data/courses.js";

export const fetchAllCourses = () => {
  return courses;
};

export const fetchFilteredCourses = (category) => {
  return courses.filter(
    (course) => course.category.toLowerCase() === category.toLowerCase()
  );
};

export const addCourse = (courseData) => {
  const newCourse = { ...courseData };
  courses.push(newCourse);
  return newCourse;
};

export const editCourse = (courseId, updateData) => {
  const course = courses.find((item) => item.id === courseId);
  if (!course) return null;

  if (updateData.name) course.name = updateData.name;
  if (updateData.category) course.category = updateData.category;
  if (updateData.targetAudience) course.targetAudience = updateData.targetAudience;
  if (updateData.description) course.description = updateData.description;

  return course;
};

export const removeCourse = (courseId) => {
  const courseIndex = courses.findIndex((item) => item.id === courseId);
  if (courseIndex === -1) return null;

  const deletedCourse = courses.splice(courseIndex, 1);
  return deletedCourse[0];
};