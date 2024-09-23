import React, { useState } from 'react';

const Sendotpform = ({ handleSendOtp }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Basic email validation
    if (!validateEmail(email)) {
      console.error('Please enter a valid email address');
      return;
    }
    handleSendOtp(email);
  };

  const validateEmail = (email) => {
    // Very basic email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit} style={{backgroundColor:'white',paddingTop:'20px'}}>
        <label htmlFor="email" style={{color:'black'}}>Enter Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <button type="submit">Send OTP</button>
      </form>
    </div>
  );
};

export default Sendotpform;
