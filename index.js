import express from "express";
import chalk from "chalk";
import _ from "lodash";
import "dotenv/config";
import { courses } from "./data/courses.js";

import coursesRouter from "./Routs/curses.js";
import studentsRouter from "./Routs/student.js";

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const AUTH_KEY = process.env.AUTH_KEY;

app.use(express.json());

// Middleware לאימות ולתיעוד בקשות
const authMiddleware = (req, res, next) => {
  // 1. הדפסה לטרמינל עבור כל קריאה שנכנסת
  console.log(`[LOG] Incoming request: ${req.method} ${req.url}`);

  // 2. קבלת המפתח מה-Headers
  const authKey = req.headers["auth-key"];

  // 3. אימות המפתח
  if (AUTH_KEY && authKey === AUTH_KEY) {
    next(); // המפתח תקין, ממשיכים לקונטרולר
  } else {
    // מפתח שגוי או חסר - מחזירים 401
    res.status(401).json({ message: "Unauthorized: Invalid or missing auth-key" });
  }
};

app.use(authMiddleware);


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