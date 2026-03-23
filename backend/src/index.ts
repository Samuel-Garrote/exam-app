let name: string = "Samuel";
console.log(name);

let age: number = 23;
console.log(age);

let finishedExam: boolean = false;
console.log(finishedExam);

let names: string[] = ["samuel", "Pepe", "Manolo"];
console.log(names);

let numbers: number[] = [1, 2, 3];
console.log(numbers);

type User = {
  name: string;
  age: number;
};

let user: User = {
  name: "Samuel",
  age: 23,
};
console.log(user);

type Question = {
  title: string;
  options: string[];
  correctAnswer: number;
};

let questions: Question[] = [
  {
    title: "What is a variable",
    options: [
      "A place to store data",
      "A type of loop",
      "A function",
      "A database",
    ],
    correctAnswer: 0,
  },
  {
    title: "What const means?",
    options: [
      "Value can change",
      "Value cannot change",
      "Entity that change all Visual Code mode",
      "Symbol of pacefull",
    ],
    correctAnswer: 1,
  },
];

console.log(questions);

function sayHello(name: string): string {
  return "Hello " + name;
}
console.log(sayHello("Samuel"));

function calculateScore(correct: number, total: number): number {
  return (correct / total) * 10;
}
console.log(calculateScore(8, 10));

let id: string | number = 10;
id = "abc123";
console.log(id);

function printUser(user: User): void {
  console.log(user.name);
}

let questionsList: Question[] = questions;
console.log(questionsList);

type AttemptResult = {
  correctAnswers: number;
  totalQuestions: number;
  score: number;
};
let result: AttemptResult = {
  correctAnswers: 8,
  totalQuestions: 10,
  score: 8,
};
console.log(result);

function getResult(correct: number, total: number): AttemptResult {
  let score = (correct / total) * 10;
  return {
    correctAnswers: correct,
    totalQuestions: total,
    score: score,
  };
}

let finalResult = getResult(7, 10);
console.log(finalResult);
