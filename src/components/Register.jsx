import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    state: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/register/', formData)
      .then(response => {
        alert('Registration successful');
        const token = response.data.token;
        console.log('Token:', token);
        // Optionally, save the token to localStorage or state
        localStorage.setItem('token', token);
        // Reset form data
        setFormData({
          name: '',
          phone: '',
          email: '',
          password: '',
          state: '',
        });
        navigate('/buttons');
      })
      .catch(error => {
        alert('Error during registration');
      });
  };

  const handleUserInterface = () => {
    navigate('/buttons');
  };

  const handleWithOTP = () => {
    navigate('/email');
  };

  return (
    <div className='register'>
      <form onSubmit={handleSubmit} className='formregister'>
        <button onClick={handleUserInterface} id='butt'>🔙 Back</button>
        <h1>Register Account ➡️ </h1><br />
        <label>Name:</label><br />
        <input type="text" name="name" value={formData.name} onChange={handleChange} required /><br />
        <label>Phone Number:</label><br />
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} required /><br />
        <label>Email Address:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required /><br /><br />
        <label>Password:</label><br />
        <input type="password" name="password" value={formData.password} onChange={handleChange} required /><br />
        <label>State:</label><br />
        <select name="state" value={formData.state} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Andhra Pradesh">Andhra Pradesh</option>
          <option value="Telangana">Telangana</option>
        </select>
        <button type="submit">Register</button><br />
        <a href="#" onClick={handleWithOTP}>Register With OTP</a>
      </form>
    </div>
  );
};

export default Register;
