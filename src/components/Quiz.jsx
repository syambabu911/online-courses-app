import React, { useState } from 'react';
import '../cssfolder/Quiz.css';
import { useNavigate } from 'react-router-dom';

function Quiz({ questions }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const handleAnswer = (selectedOption) => {
    const isCorrect = selectedOption === questions[currentQuestion].answer;
    setUserAnswers({
      ...userAnswers,
      [currentQuestion]: isCorrect,
    });
    if (isCorrect) {
      setScore(score + 1);
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setScore(0);
    setUserAnswers({});
    setShowResults(false);
  };
  const handleback=()=>{
    navigate(-1)
  }
  return (
    <center>
                  <button onClick={handleback} id='backbutton'><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-chevron-double-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
  <path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
</svg>Back</button>
          <div className="quiz-container">
      {!showResults ? (
        <div>
          <h2>Question {currentQuestion + 1}</h2>
          <p>{questions[currentQuestion].question}</p>
          <div>
            {questions[currentQuestion].options.map((option, index) => (
              <button key={index} onClick={() => handleAnswer(option)}>
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h2>Test Results</h2>
          <p className="results">Your score: {score} / {questions.length}</p>
          <button onClick={handleRetry}>Retry</button>
        </div>
      )}
    </div>
    </center>
  );
}

export default Quiz;
