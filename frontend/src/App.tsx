import { useEffect, useState } from "react";

type Question = {
  title: string;
  options: string[];
};

type Result = {
  id: number;
  correctAnswers: number;
  totalQuestions: number;
  score: number;
};

const API_URL = import.meta.env.VITE_API_URL || "/api";

function App() {
  const [answers, setAnswers] = useState<(number | undefined)[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [result, setResult] = useState<Result | null>(null);
  const [results, setResults] = useState<Result[]>([]);

  function loadResults() {
    fetch(`${API_URL}/results`)
      .then((response) => response.json())
      .then((data) => setResults(data))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    fetch(`${API_URL}/questions`)
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.log(error));

    loadResults();
  }, []);

  const isComplete =
    answers.length === questions.length && !answers.includes(undefined);

  return (
    <div className="app">
      <h1 className="title">Exam App</h1>
      <p className="subtitle">Answer the questions and submit your exam.</p>

      {questions.map((question, index) => (
        <div key={index} className="question-card">
          <h2 className="question-title">{question.title}</h2>

          <div className="options">
            {question.options.map((option, optionIndex) => (
              <button
                key={optionIndex}
                className={
                  answers[index] === optionIndex ? "option selected" : "option"
                }
                onClick={() => {
                  const newAnswers = [...answers];
                  newAnswers[index] = optionIndex;
                  setAnswers(newAnswers);
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}

      <button
        className="submit-btn"
        disabled={!isComplete}
        onClick={() => {
          fetch(`${API_URL}/submit`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ answers }),
          })
            .then((res) => res.json())
            .then((data) => {
              setResult(data);
              loadResults();
            })
            .catch((err) => console.log(err));
        }}
      >
        Submit Exam
      </button>

      {!isComplete && (
        <p style={{ marginTop: "10px", color: "#f87171" }}>
          Answer all questions before submitting
        </p>
      )}

      {result && (
        <div className="result-box">
          <h2 className="result-title">Your Result</h2>

          <div className="result-grid">
            <div className="result-card result-score">
              <p className="result-label">Score</p>
              <p className="result-value">{result.score}</p>
            </div>

            <div className="result-card">
              <p className="result-label">Correct Answers</p>
              <p className="result-value">{result.correctAnswers}</p>
            </div>

            <div className="result-card">
              <p className="result-label">Total Questions</p>
              <p className="result-value">{result.totalQuestions}</p>
            </div>
          </div>
        </div>
      )}

      {results.length > 0 && (
        <div className="result-box">
          <h2 className="result-title">Previous Results</h2>

          <div className="result-grid">
            {results.map((item) => (
              <div key={item.id} className="result-card">
                <p className="result-label">Score</p>
                <p className="result-value">{item.score}</p>
                <p className="result-label">Correct: {item.correctAnswers}</p>
                <p className="result-label">Total: {item.totalQuestions}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
