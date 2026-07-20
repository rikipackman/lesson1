import { students } from "../students.js";

export const fetchAllStudents = () => {
  return students;
};

export const fetchStudentById = (studentId) => {
  return students.find((item) => item.id === studentId);
};