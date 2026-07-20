import * as studentsService from "../services/students.service.js";

export const getAllStudents = (req, res) => {
  res.json(studentsService.fetchAllStudents());
};

export const getStudentById = (req, res) => {
  const studentId = Number(req.params.id);
  const student = studentsService.fetchStudentById(studentId);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  return res.json(student);
};