import React, { useState, useEffect } from 'react';
// Ensure this path is correct based on your file structure

function Redirect() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const [timer, setTimer] = useState(3); // Countdown from 3 seconds

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer > 1) { 
          return prevTimer - 1;
        } else {
          clearInterval(countdown);
          handleResult(); // Simulate a result after countdown
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  const handleResult = () => {
    // Simulate a successful or failed result (you can customize this logic)
    const isSuccess = Math.random() > 0.5;
    if (isSuccess) {
      setShowSuccess(true);
    } else {
      setShowFailure(true);
    }
  };

  return (
    <div>
      <h1>Redirect</h1>
      <p className="loading">Loading...!</p>
      <p>Timer is display: {timer} sec</p>
      {showSuccess && <SuccessMessage />}
      {showFailure && <FailureMessage />}
    </div>
  );
}

function SuccessMessage() {
  return (
    <div className="message success">
      <h2>Success!</h2>
      <p>Your payment was successful.</p>
    </div>
  );
}

function FailureMessage() {
  return (
    <div className="message failure">
      <h2>Failure!</h2>
      <p>Your payment failed. Please try again.</p>
    </div>
  );
}

export default Redirect;
