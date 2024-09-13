import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, MenuItem, TextField } from "@material-ui/core";
import "./Home.css";
import Categories from "../../Data/Categories";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const Home = ({ name, setName, fetchQuestions, timeLimit, setTimeLimit }) => {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!name || !category || !difficulty || !timeLimit) {
      setError((prevError) => !prevError);
      return;
    } else {
      setError((prevError) => prevError);
      fetchQuestions(category, difficulty);
      navigate("/quiz");
    }
  };

  return (
    <div className="content">
      <div className="settings">
        <span className="quiz_settings_title" >Quiz Settings</span>
        <div className="settings_select">
          {error && <ErrorMessage><h3 style={{fontFamily:"QuizFont"}}>Please fill in all the fields</h3></ErrorMessage>}

          <TextField
            style={{ marginBottom: 25 }}
            color="inherit"
            label="Enter your name"
            variant="outlined"
            onChange={(event) => setName(event.target.value)}
          />
          <TextField
            select
            style={{ marginBottom: 30 }}
            color="inherit"
            label="Select Category"
            variant="outlined"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {Categories.map((cat) => (
              <MenuItem key={cat.category} value={cat.value}>
                {" "}
                {cat.category}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            style={{ marginBottom: 30 }}
            color="inherit"
            label="Select Difficulty"
            variant="outlined"
            onChange={(event) => setDifficulty(event.target.value)}
            value={difficulty}
          >
            <MenuItem key="Easy" value="easy">
              Easy
            </MenuItem>
            <MenuItem key="Medium" value="medium">
              Medium
            </MenuItem>
            <MenuItem key="Difficult" value="difficult">
              Difficult
            </MenuItem>
          </TextField>
          <TextField
            style={{ marginBottom: 25, borderColor:"#00EAE6" }}
            color="inherit"
            label="Time Limit for Quiz (minuites)"
            variant="outlined"
            onChange={(event) => setTimeLimit(event.target.value)}
          />
          <button
           onClick={handleSubmit}
            className="cyberpunk-btn"
          >Start Quiz</button>
    
          
            
        </div>
      </div>
      <h1 class="flash-text">Let the Quiz Begin!</h1>
    </div>
  );
};

export default Home;
