import React, { useEffect, useState } from "react";
import { CircularProgress } from "@material-ui/core";
import "./QuizPage.css";
import Quiz from "../../components/Quiz/Quiz";

const QuizPage = ({
  name,
  questions,
  score,
  setScore,
  timeLimit,
  time,
  setTime,
}) => {
  const [options, setOptions] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(0); //current question is part of an array and initialized as the first element of the array
  const handleShuffle = (array) => {
    return array.sort((a, b) => 0.5 - Math.random());
  };

  useEffect(() => {
    setOptions(
      questions &&
        handleShuffle([
          questions[currentQuestion]?.correct_answer,
          ...questions[currentQuestion]?.incorrect_answers,
        ])
    );
  }, [questions, currentQuestion]);

  return (
    <div className="quiz">
      <span className="subtitle">
        <h3 style={{ marginBottom: "20px" }}>Welcome, {name}!</h3>
      </span>
      {questions ? (
        <>
          <div className="quiz-info">
            <span className="category-info">
              <h3 style={{ fontSize: "0.8rem" }}>
                {questions[currentQuestion].category}
              </h3>
            </span>
            <span className="score-info">
              <h3 style={{ fontSize: "0.8rem" }}>Score:</h3>
              <h3> {score}</h3>
            </span>
            <span className="score-info">
              <h3 style={{ fontSize: "0.8rem" }}>Time:</h3>
              <h3 style={{fontSize:"1rem", fontFamily:"QuizFont"}}> {time}</h3>
            </span>
          </div>
          <Quiz
            questions={questions}
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
            options={options}
            setOptions={setOptions}
            timeLimit={timeLimit}
            correct={questions[currentQuestion]?.correct_answer}
            score={score}
            setScore={setScore}
            setTime={setTime}
          />
        </>
      ) : (
        <CircularProgress
          style={{ margin: 100 }}
          size={100}
          thickness={1}
          color="inherit"
          label="Page loading..."
        />
      )}
    </div>
  );
};

export default QuizPage;
