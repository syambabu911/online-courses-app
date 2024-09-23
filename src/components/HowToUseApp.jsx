import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HowToUseApp() {
  const [tutorial, setTutorial] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/app-tutorials/')
      .then(response => {
        if (response.data.length > 0) {
          setTutorial(response.data[0]);  // Assuming you have only one tutorial
        }
      })
      .catch(error => {
        console.error('Error fetching the tutorial:', error);
      });
  }, []);

  if (!tutorial) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{tutorial.title}</h1>
      <p>{tutorial.description}</p>
      <div>
        <video width="900" height="500" controls style={{background:"black"}}>
          <source src={`http://127.0.0.1:8000${tutorial.video}`}type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}

export default HowToUseApp;
