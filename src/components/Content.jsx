import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Content() {
  const [demoClasses, setDemoClasses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://127.0.0.1:8000/demo-classes/')
      .then(response => response.json())
      .then(data => setDemoClasses(data));
  }, []);

  const handleDemoClassClick = (demoClassId) => {
    navigate(`/coursefolders/${demoClassId}`);
  };
  const handleback=()=>{
    navigate('/courses')
  }

  return (
    <center>
                  <button onClick={handleback} id='backbutton'><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-chevron-double-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
  <path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
</svg>Back</button>
          <div className="container">
      <div className="topic-list">
        {demoClasses.map(demoClass => (
          <div
            key={demoClass.id}
            className="topic"
            onClick={() => handleDemoClassClick(demoClass.id)}
          >
            <img src="\assets\folders.png" alt="demo" />
            {demoClass.name}
          </div>
        ))}
      </div>
    </div>
    </center>
  );
}

export default Content;
