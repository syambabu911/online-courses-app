import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function CourseFolders() {
  const [courses, setCourses] = useState([]);
  const { demoClassId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/demo-classes/${demoClassId}/subjects/`)
      .then(response => response.json())
      .then(data => setCourses(data));
  }, [demoClassId]);

  const handleCourseClick = (courseId) => {
    navigate(`/topics/${courseId}`);
  };
  const handleback=()=>{
    navigate('/content')
  }
  return (
    <center>
  <button onClick={handleback} id='backbutton'><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-chevron-double-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
  <path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
</svg>Back</button>
      <div className="folder"> 
      {courses.map(course => (
        <div
          key={course.id}
          className="images"
          onClick={() => handleCourseClick(course.id)}
        >
          <img src="\assets\folders.png" alt="course"/>
          {course.name}
        </div>
      ))}
    </div>  
    </center>

  );
}

export default CourseFolders;
