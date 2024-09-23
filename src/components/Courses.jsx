import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Courses() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/courses/')
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        console.error('Error fetching course data:', error);
      });
  }, []);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCourseDetails = (courseId) => {
    navigate(`/overview/${courseId}`);
  };
  const filteredCourses = courses.filter((course) =>
    course.mentor.course.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleback=()=>{
    navigate('/home')
  }
  
  return (
    <>
      <center>
      <div className="courses-container">
      <button onClick={handleback}id='backbutton'><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-chevron-double-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
  <path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
</svg>Back</button>
      <h1>Courses</h1>
      <input
        type="text"
        placeholder="Search by Course Name"
        className="search-bar"
        value={searchTerm}
        onChange={handleChange}
      />
      <div className="courses-list">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div className="course" key={course.id}>
              <img
                src={`http://127.0.0.1:8000${course?.mentor.image}`}
                onClick={() => handleCourseDetails(course?.id)}
                style={{ cursor: 'pointer' }}
                alt={course?.mentor.name}
              />
              <div id='title' onClick={() => handleCourseDetails(course?.id)}>{course?.mentor.course}</div>
            </div>
          ))
        ) : (
          <p>No search results</p>
        )}
      </div>
    </div>
    </center>
    </>

 
  );
}

export default Courses;
