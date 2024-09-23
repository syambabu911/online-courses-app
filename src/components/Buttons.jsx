import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Buttons = () => {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (hasVisited) {
      setVisible(false);
    }
  }, []);

  const handleRegister = () => {
    setVisible(false);
    localStorage.setItem('hasVisited', true);
    navigate('/register');
  };

  const handleLogin = () => {
    setVisible(false);
    localStorage.setItem('hasVisited', true);
    navigate('/login');
  };

  return (
    <center>
      {visible && (
        <div className="buttons-container">
          <marquee direction="left" scrollamount='20'  id='scroll'>
            I am developing a professional online course application named <strong>Vcube</strong>, guided by <strong>Srinivas Sir's</strong> expert advice and guidelines.
          </marquee>
          <div>
            <img src='\assets\logovcube.png' height="250" width="240" alt="Vcube Logo" /><br />
            <button className="login-button" onClick={handleLogin}>Login</button><br />
            <button className="register-button" onClick={handleRegister}>Register</button><br />
          </div>
        </div>
  )} 
    </center>
  );
};

export default Buttons;
