import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function OverviewDetails() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  
  useEffect(() => {
    axios.get(` http://127.0.0.1:8000/api/courses/${courseId}/`)
      .then(response => {
        setCourse(response.data);
      })
      .catch(error => {
        console.error('Error fetching course data:', error);
      });
  }, [courseId]);

  const handlePlan = () => {
    navigate(`/plan/${courseId}`);
  };

  const handleContent = () => {
    navigate('/content');
  };
  const handleback=()=>{
    navigate('/courses')
  }

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <center>
      <div className="content">
      <button onClick={handleback} id='backbutton'><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-chevron-double-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
  <path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
</svg>Back</button>
        <headers>
          <button>Overview</button> 
          <button onClick={handleContent} id='content' style={{backgroundColor:'darkgreen',color:'white'}}>Content</button>
        </headers>
        <div className="python">
        <img src={`http://127.0.0.1:8000${course.mentor?.image}`} alt="Python Mentor" />

          <p>Subject: {course.title}</p>
          <p>Mentor: {course.mentor?.name}</p>
        </div>
        <div className="details">
          <p>Flat 10% off</p>
          <p>Validity - 1 month</p>
          <p>About This Course</p>
          <p>{course.description}</p>
          <p>Readmore</p>
        </div>
        <div className="buy-now">
          <p>₹ {course?.amount}/-</p>
          <button onClick={handlePlan}>Buy Now</button>
        </div> 
      </div>
    </center>
  );
}

export default OverviewDetails;
