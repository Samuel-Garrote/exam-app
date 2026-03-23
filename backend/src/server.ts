// @ts-ignore
const cors = require("cors");
const express = require("express");

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

/* =========================
    🔥 CONEXIÓN DATABASE FINAL
========================= */

// 👉 Railway (producción) usa DATABASE_URL
// 👉 Local usa tu conexión de Docker

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres@127.0.0.1:5433/examdb?schema=public";

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

/* =========================
    📚 TIPOS
========================= */

type Question = {
  title: string;
  options: string[];
  correctAnswer: number;
};

/* =========================
    📦 DATA
========================= */

let questions: Question[] = [
  {
    title: "What is a variable?",
    options: [
      "A place to store data",
      "A type of loop",
      "A function",
      "A database",
    ],
    correctAnswer: 0,
  },
  {
    title: "What does const mean?",
    options: [
      "Value can change",
      "Value cannot change",
      "It is a loop",
      "It is an array",
    ],
    correctAnswer: 1,
  },
  {
    title: "What is an array?",
    options: [
      "A single number",
      "A list of values",
      "A function name",
      "A CSS property",
    ],
    correctAnswer: 1,
  },
  {
    title: "What does function do?",
    options: [
      "Stores many values",
      "Repeats CSS styles",
      "Groups reusable code",
      "Creates a database",
    ],
    correctAnswer: 2,
  },
  {
    title: "What is a boolean?",
    options: [
      "A text value",
      "A true or false value",
      "A type of loop",
      "A list of numbers",
    ],
    correctAnswer: 1,
  },
  {
    title: "What does if do?",
    options: [
      "Creates an array",
      "Checks a condition",
      "Declares a variable",
      "Styles a page",
    ],
    correctAnswer: 1,
  },
  {
    title: "What is a string?",
    options: ["A text value", "A number value", "A boolean value", "A loop"],
    correctAnswer: 0,
  },
  {
    title: "What does return do in a function?",
    options: [
      "Stops the browser",
      "Sends a value back",
      "Creates a variable",
      "Deletes an array",
    ],
    correctAnswer: 1,
  },
  {
    title: "What is the index of the first item in an array?",
    options: ["1", "0", "-1", "10"],
    correctAnswer: 1,
  },
  {
    title: "What does === mean in JavaScript?",
    options: [
      "Assign value",
      "Compare only value",
      "Compare value and type",
      "Create a function",
    ],
    correctAnswer: 2,
  },
];

/* =========================
    🧠 LÓGICA
========================= */

function calculateResult(answers: number[]) {
  let correct = 0;

  questions.forEach((question, index) => {
    if (answers[index] === question.correctAnswer) {
      correct++;
    }
  });

  const totalQuestions = questions.length;
  const score = (correct / totalQuestions) * 10;

  return {
    correct,
    totalQuestions,
    score,
  };
}

/* =========================
    🌐 ROUTES
========================= */

app.get("/", (req: any, res: any) => {
  res.send("Server is running 🚀");
});

app.get("/questions", (req: any, res: any) => {
  const examQuestions = questions.map((q) => ({
    title: q.title,
    options: q.options,
  }));

  res.json(examQuestions);
});

app.post("/submit", async (req: any, res: any) => {
  try {
    const answers = req.body.answers;

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ error: "Invalid answers" });
    }

    const result = calculateResult(answers);

    const savedResult = await prisma.result.create({
      data: {
        correctAnswers: result.correct,
        totalQuestions: result.totalQuestions,
        score: result.score,
      },
    });

    res.json(savedResult);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/results", async (req: any, res: any) => {
  try {
    const results = await prisma.result.findMany();
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
