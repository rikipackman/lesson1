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

app.get("/", (req, res) => {
  res.json({
    message: "Server is running successfully",
    status: "online"
  });
});


app.get("/courses", (req, res) => {
  res.json(courses);
});


app.get("/students", (req, res) => {
  res.json(students);
});

app.listen(PORT, () => {
  console.log(chalk.green(`Server running at http://localhost:${PORT}/`));
  printCoursesToTerminal();
});