import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../cssfolder/Payments.css';

function Payments() {
  const navigate = useNavigate();
  const location = useLocation();
  const { course, plan, totalAmount } = location.state || {};
  const handleback=()=>{
    navigate('/home')
  }
  return (
    <div className="payments-container">
            <button onClick={handleback} id='backbutton'><svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" fill="currentColor" class="bi bi-chevron-double-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
  <path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
</svg></button>
      <h2>Payment Summary</h2>
      <div className="course-details">
        <img src={`http://127.0.0.1:8000${course?.mentor?.image}`} alt="Mentor Image" />
        <p><b>Mentor:</b> {course?.mentor?.name}</p>
        <h3><b>Course:</b>{course?.title}</h3>
        <p><b>Plan:</b> {plan?.name}</p>
        <p><b>Total Amount:</b> ₹ {totalAmount?.toFixed(2)}/-</p>
      </div>
    </div>
  );
}

export default Payments;
