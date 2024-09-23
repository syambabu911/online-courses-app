import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }

    // Fetch courses from the backend API based on searchTerm
    axios.get(`http://127.0.0.1:8000/api/courses/?search=${searchTerm}`)
      .then(response => {
        // Filter courses based on course name containing searchTerm
        const filteredCourses = response.data.filter(course =>
          course.mentor.course.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(filteredCourses);
      })
      .catch(error => {
        console.error('Error fetching course data:', error);
        setSearchResults([]);
      });
  };

  const handleCourseDetails = (courseId) => {
    navigate(`/overview/${courseId}`);
  };
  const handleback=()=>{
    navigate(-1)
  }

  return ( 
  <div className='searchform'>
      <form onSubmit={handleSubmit}>
      <button onClick={handleback}id='back'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="25" fill="currentColor" class="bi bi-chevron-double-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
  <path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
</svg>Back</button>
        <div>
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={handleChange}
          />
          <button type="submit">Search</button>
        </div>
      </form>

      {searchResults.length > 0 ? (
        <ul>
          {searchResults.map((course) => (
            <h4 key={course.id}>
              <img
                src={`http://127.0.0.1:8000${course?.mentor.image}`}
                alt={course?.mentor.name}
                onClick={() => handleCourseDetails(course?.mentor.id)}
                style={{ cursor: 'pointer', width: '300px', height: '250px' }}
              />
              <span>{course?.mentor.course}</span>
            </h4>
          ))}
        </ul>
      ) : (
        searchTerm.trim() !== '' && <p>No search results</p>
      )}
    </div>
  );
}

export default Search;
