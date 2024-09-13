import React, {useEffect} from 'react'
import { Button } from '@material-ui/core'
import { useNavigate } from 'react-router-dom';
import "./Result.css"
const Result = ({name, score, questions}) => {

  const navigate = useNavigate();

  useEffect(() => {
    if (!name) {
      navigate("/");
    }
  }, [name, navigate]);

  const averageScore = questions.length / 2
  return (
    <div className='result'>
        <div>
            <h3 style={{fontFamily:"QuizFont", marginTop:"10px"}}>{score > averageScore ? "Well done" : "Not too bad"}, {name}</h3>
            <span className='score-info'><h3 style={{fontFamily:"QuizFont", marginTop:"10px"}}>Your scored: {score} / {questions.length} questions!</h3></span>
        </div>
        <Button
            href="/"
            className='quiz_buttons'
            size='large'
            variant="contained"
            style={{ alignSelf: "center", margin: 30, color:'#00EAE6', backgroundColor:"#ff4400"}}
        >
            <h3>Back to Homepage</h3>
        </Button>
    </div>
  )
}

export default Result