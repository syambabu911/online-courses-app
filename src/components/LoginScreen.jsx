import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const response = await fetch('http://127.0.0.1:8000/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: email, password: password }),
    });
    const data = await response.json();
    if (data.status === 'success') {
      localStorage.setItem('userdetails', JSON.stringify({ username: email, password }));
      setEmail(''); // Reset email state
      setPassword(''); // Reset password state
      navigate('/home');
    } else {
      alert(data.message);
    }
  };

  console.log({email, password})

  const handleRegister = () => {
    navigate('/register');
  };

  const handleReset = () => {
    navigate('/reset');
  };

  const handlewithotp = () => {
    navigate('/email');
  };

  return (
    <div className='login'>
      <form onSubmit={handleLogin}>
        <h1>Vcube</h1>
        <label htmlFor="email">Email / Phone Number:</label>
        <input
          type="text"
          id="email"
          name="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        /><br />
        <label htmlFor="password">Password:</label><br />
        <input
          type="password"
          id="password"
          name="password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Login</button><br />

        <a href="#" onClick={handlewithotp}> Login With OTP</a><br /><br />

        <p> Forgot password? <a href="#" onClick={handleReset}>Reset</a></p><br />
        <h3>New student</h3>
        <button type="button" onClick={handleRegister}>Register</button>
      </form>
    </div>
  );
};

export default LoginScreen;
