import express from "express";
import chalk from "chalk";
import _ from "lodash";
import { students } from "./students.js";
import { courses } from "./courses.js";
const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.use(express.json());

function printCoursesToTerminal() {
  const sortedCourses = _.sortBy(courses, (course) => course.name);

  console.log(chalk.cyan.bold("\n=== Course Catalog ==="));
  console.log(chalk.dim("Here are the available courses:\n"));

  sortedCourses.forEach((course, index) => {
    console.log(chalk.yellow.bold(`Course ${index + 1}`));
    console.log(chalk.green(`Name: ${course.name}`));
    console.log(chalk.blue(`Category: ${course.category}`));
    console.log(chalk.magenta(`Target Audience: ${course.targetAudience}`));
    console.log(chalk.white(`Description: ${course.description}`));
    console.log(chalk.gray("-".repeat(40)));
  });
}


app.get("/", (req, res) => {
  const responseText = courses
    .map((course, index) => `${index + 1}. ${course.name} - ${course.category}`)
    .join("\n") + "\n";

  res.send(responseText);
});


app.get("/courses", (req, res) => {
  res.json(courses);
});

app.get("/courses/filter", (req, res) => {
  const categoryQuery = req.query.category;

  if (categoryQuery) {
    const filteredCourses = courses.filter(
      (course) => course.category.toLowerCase() === categoryQuery.toLowerCase()
    );
    return res.json(filteredCourses);
  }

  res.json(courses);
});

app.put("/courses/:id", (req, res) => {
  const courseId = Number(req.params.id);
  const { name, category, targetAudience, description } = req.body;

  const course = courses.find((item) => item.id === courseId);

 
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

 
  if (name) course.name = name;
  if (category) course.category = category;
  if (targetAudience) course.targetAudience = targetAudience;
  if (description) course.description = description;

  res.json({ message: "Course updated successfully", course });
});
app.post("/courses", (req, res) => {
  const { name, category, targetAudience, description } = req.body;

  if (!name || !category) {
    return res.status(400).json({ message: "Name and Category are required" });
  }

  const newCourse = { name, category, targetAudience, description };
  courses.push(newCourse);

  res.status(201).json({ message: "Course added successfully", course: newCourse });
});

app.get("/students", (req, res) => {
  res.json(students);
});


app.delete("/courses/:id", (req, res) => {
  const courseId = Number(req.params.id);

  
  const courseIndex = courses.findIndex((item) => item.id === courseId);

  
  if (courseIndex === -1) {
    return res.status(404).json({ message: "Course not found" });
  }


  const deletedCourse = courses.splice(courseIndex, 1);

  res.json({ message: "Course deleted successfully", course: deletedCourse[0] });
});
app.get("/students/:id", (req, res) => {
  const studentId = Number(req.params.id);
  const student = students.find((item) => item.id === studentId);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  return res.json(student);
});

app.listen(PORT, () => {
  console.log(chalk.green(`Server running at http://localhost:${PORT}/`));
  printCoursesToTerminal();
});