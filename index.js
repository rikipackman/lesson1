import http from "http";
import chalk from "chalk";
import _ from "lodash";

const courses = [
  {
    name: "dramachol",
    category: "drama",
    targetAudience: "girls",
    description: "A drama course for girls to express themselves and build confidence"
  },
  {
    name: "swimkurs",
    category: "swim",
    targetAudience: "teenagers",
    description: "A fun and refreshing swimming course for teenagers"
  },
  {
    name: "cookingkurs",
    category: "cooking",
    targetAudience: "girls",
    description: "Learn to cook delicious meals in this fun cooking class"
  },
  {
    name: "artkurs",
    category: "art",
    targetAudience: "children",
    description: "A fun and creative craft workshop for all ages"
  }
];

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

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain; charset=utf-8");

  res.end(courses.map((course, index) => `${index + 1}. ${course.name} - ${course.category}`).join("\n") + "\n");
});

function startServer(port) {
  server.once("error", (error) => {
    if (error.code === "EADDRINUSE") {
      console.error(chalk.red(`Port ${port} is already in use.`));
      process.exit(1);
      return;
    }

    console.error(chalk.red(error.message));
    process.exit(1);
  });

  server.listen(port, () => {
    console.log(chalk.green(`Server running at http://localhost:${port}/`));
    printCoursesToTerminal();
  });
}

startServer(process.env.PORT ? Number(process.env.PORT) : 3000);

