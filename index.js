import express from "express";
import chalk from "chalk";
import _ from "lodash";
import { courses } from "./data/courses.js"; // נתיב מעודכן לתיקיית data

// ייבוא הראוטרים מהתיקייה החדשה
import coursesRouter from "./routes/courses.js";
import studentsRouter from "./routes/student.js";

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.use(express.json());

// חיבור שכבת הנתיבים (Routes)
app.use("/courses", coursesRouter);
app.use("/students", studentsRouter);

// פונקציית הדפסה לטרמינל בעת הפעלת השרת
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

// הפעלת השרת
app.listen(PORT, () => {
  console.log(chalk.green(`Server running at http://localhost:${PORT}/`));
  printCoursesToTerminal();
});