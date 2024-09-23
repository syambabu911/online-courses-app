import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Plan() {
  const [selectedPlan, setSelectedPlan] = useState('');
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();
  const { courseId } = useParams(); // Assuming you pass courseId as a URL parameter
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/plans/')
      .then(response => response.json())
      .then(data => setPlans(data))
      .catch(error => console.error('Error fetching plans:', error));
  }, []);

  const handlePlanChange = (event) => {
    setSelectedPlan(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedPlan) {
      navigate(`/details/${courseId}/${selectedPlan}`);
    }
  };
  const handleback=()=>{
    navigate(-1)
  }

  return (
    <div className="plan"> 
                      <button onClick={handleback} id='backbutton'><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-chevron-double-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
  <path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
</svg>Back</button>
      <h1>Choose Your Plan</h1>
      <select value={selectedPlan} onChange={handlePlanChange}>
        <option value="">Select a plan</option>
        {plans.map(plan => (
          <option key={plan.id} value={plan.id}>{plan.name}</option>
        ))}
      </select>
      <button onClick={handleSubmit} disabled={!selectedPlan}>Proceed</button>
    </div>
  );
}

export default Plan;
