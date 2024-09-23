import React, { useState, useEffect } from 'react';



const VerificationOTP = ({ phoneNumber, handleVerifyOtp, handleResendOtp }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(30); // Set the timer for 30 seconds
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);
  
  const handleChange = (event, index) => {
    const value = event.target.value;
    if (/^[0-9]?$/.test(value)) { // Ensure only numeric input and only one character
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Focus the next input box if value is entered
      if (value && index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleVerify = () => {
    const otpString = otp.join('');
    if (typeof handleVerifyOtp === 'function') {
      handleVerifyOtp(otpString); // Call handleVerifyOtp function
    } else {
      alert('Error: handleVerifyOtp is not a function');
    }
  };

  return (
    <div>
      <h2>OTP has been successfully sent to {phoneNumber}</h2>
      <div>
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-input-${index}`}
            type="text"
            value={digit}
            onChange={(event) => handleChange(event, index)}
            maxLength="1"
            style={{ width: '2em', marginRight: '0.5em', textAlign: 'center' }}
          />
        ))}
      </div>
      <button onClick={handleVerify}>Verify OTP</button>
      <p>Retry in: {timeLeft} seconds</p>
      {canResend && (
        <>
          <p>Didn't Receive the verification OTP?</p>
          <button onClick={() => handleResendOtp('sms')}>Resend OTP Via SMS</button>
          <button onClick={() => handleResendOtp('call')}>Resend OTP Via Call</button>

        </>
      )}
    </div>
  );
};

export default VerificationOTP;
