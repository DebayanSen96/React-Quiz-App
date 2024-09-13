import React, {useEffect, useState} from 'react'
import {decode} from "html-entities"
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import { Button } from '@material-ui/core'
import "./Quiz.css"
import { useNavigate } from 'react-router-dom'

const Quiz = ({
  questions, 
  currentQuestion, 
  setCurrentQuestion,
  correct,
   options, 
   timeLimit,
   setScore,
   setTime
  }) => {
    
    const [timer, setTimer] = useState(timeLimit * 60);
    const [selected, setSelected] = useState(null)
    const [error, setError] = useState(false)

    const navigate = useNavigate();
    const max_question = questions.length;
    useEffect(() => {
      // This will run when the component mounts
      const countdown = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) {
            setTime(formatTime(prevTimer-1)) 
            return prevTimer - 1;
            // Decrease the timer by 1 each second
          } else {
            clearInterval(countdown); // Clear the interval when time is up
            handleTimeEnd(); // Call the function when time is up
            return 0;
          }
        });
      }, 1000); // 1000ms = 1 second
  
      // Cleanup function to clear the interval when the component unmounts
      return () => clearInterval(countdown);
    }, [timeLimit, setCurrentQuestion]);
    const getOptionClass = (option) => {
      if (selected === option && selected === correct) return "select";
      else if (selected === option && selected !== correct) return "wrong";
      else if (option === correct) return "select";
    };
    const formatTime = (time) => {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return `${minutes} : ${seconds < 10 ? `0${seconds}` : seconds}`
; 
    };  
    const handleCheck = (option) => {
      setSelected(option)
      if(option === correct) {
        setScore(prevScore => prevScore + 1)
      }
      setError(false)
    }

    const handleTimeEnd = () => {
      setCurrentQuestion(0)
      navigate('/result')
    }


    const handleQuit = () => {
      setCurrentQuestion(0)
    }

    const handleNext = () => {
      if (currentQuestion >= max_question - 1) {
        navigate('/result');
      } else if (selected) {
        setCurrentQuestion(currentQuestion + 1);
        setSelected('');
      } else {
        setError(true);
      }
    };
    console.log(timer)
  return (
    <div className='question'>
        <h3>Question {currentQuestion + 1} :</h3>
        <div className='current-quiz'>
            <p>{decode(questions[currentQuestion].question)}</p>

            <div className='options'>

            {error && <ErrorMessage>Please select your option first</ErrorMessage>}
            
            {options && options.map(option => (
                <button 
                    key={option}
                    className={`single-option ${selected && getOptionClass(option)}` }
                    onClick={() => handleCheck(option)}
                    disabled={selected}
                >
                  {decode(option)}
                </button>
              ))}
            </div> 

            <div className='controls'>
              <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  className='quiz_buttons'
                  style={{ width: 185 ,backgroundColor:"#ff4400"}}
                  href="/" 
                  onClick={handleQuit}
              >
                <h3>Quit</h3>
              </Button>
              <Button
                  variant="contained"
                  
                  size="large"
                  className='quiz_buttons'
                  style={{ width: 185, backgroundColor:"#00EAE6"}}
                  onClick={handleNext}
              >
                <h3> Next Question</h3>
               
              </Button>
            </div>
        </div>
    </div>
  )
}

export default Quiz