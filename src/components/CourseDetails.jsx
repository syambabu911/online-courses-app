import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function CourseDetails() {
  const { courseId, planId } = useParams();
  const [course, setCourse] = useState(null);
  const [plan, setPlan] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [coupon, setCoupon] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch course data based on the courseId
    axios.get(`http://127.0.0.1:8000/api/courses/${courseId}/`)
      .then(response => {
        setCourse(response.data);
      })
      .catch(error => {
        console.error('Error fetching course data:', error);
      });

    // Fetch plan data based on the planId
    axios.get(`http://127.0.0.1:8000/api/plans/${planId}/`)
      .then(response => {
        const filterPlan = response.data?.filter((obj) => obj?.id === parseInt(planId));
        setPlan(filterPlan[0]);
      })
      .catch(error => {
        console.error('Error fetching plan data:', error);
      });
  }, [courseId, planId]);

  const handleQr = () => {
    // Navigate to scanqr page
    navigate('/scanqr');
 
    // Delay navigation to payments page
    setTimeout(() => {
      const totalAmount = parseFloat(plan.price) + parseFloat(course.handling_fees) - (parseFloat(plan.price) * (discount / 100));
      navigate('/payments', { state: { course, plan, totalAmount } });
    }, 2000); // Adjust the delay as needed
  };

  const handlePayOnline = () => {
    alert('Transaction initiated');
    const totalAmount = parseFloat(plan.price) + parseFloat(course.handling_fees) - (parseFloat(plan.price) * (discount / 100));
    navigate('/transaction', { state: { course, plan, totalAmount } });
  };

  const applyCoupon = () => {
    if (coupon === course.code) {
      setDiscount(course.discount);
      setSuccessMessage('Coupon applied successfully!');
      setError('');
    } else {
      setDiscount(0);
      setSuccessMessage('');
      setError('Invalid coupon code');
    }
  };
  const handleback=()=>{
    navigate(-1)
  }

  if (!course || !plan) {
    return <div>Loading...</div>;
  }

  const discountAmount = (parseFloat(plan.price)) * (discount / 100);
  const totalAmount = parseFloat(plan.price) + parseFloat(course.handling_fees) - discountAmount;

  return (
    <center>
  <button onClick={handleback} id='backbutton'><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-chevron-double-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
  <path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
</svg>Back</button>
      <div className="course-details">
        <div className="course-image">
          <img src={`http://127.0.0.1:8000${course.mentor?.image}`} alt="Course Image" />
        </div>
        <div className="details">
          <h2>Course Details</h2>
          <p><b>Subject:{course.title}</b></p>
          <p><b>Mentor: {course.mentor?.name}</b></p>
          <p><b>Price:₹ {plan.price}</b></p>
          <p><b>Handling Fees:₹ {course.handling_fees}</b></p>
          <p><b>Discount:₹ {discount}</b></p>
          <p><b>Total: ₹ {totalAmount.toFixed(2)}</b></p>
          <p><b>Apply coupon</b></p>
          <input
            type="text"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            placeholder="Enter coupon code"
          />
          <button onClick={applyCoupon}>Apply</button>
          {successMessage && <p style={{ color: 'darkblue' }}>{successMessage}</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
        <div className="payment">
          <button className="pay-online" onClick={handlePayOnline}>Pay Online</button>
          <button className="scan-qr" onClick={handleQr}>Scan QR</button>
        </div>
      </div>
    </center>
  );
}

export default CourseDetails;
