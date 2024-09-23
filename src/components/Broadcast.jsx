import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Broadcast() {
  const [broadcast, setBroadcast] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://127.0.0.1:8000/broadcast');
        if (response.ok) {
          const data = await response.json();
          console.log(data);  // Log the data to see the image URL
          setBroadcast(data);
        } else {
          console.error('Error fetching broadcast details');
        }
      } catch (error) { 
        console.error('Error:', error);
      }
    }
    fetchData();
  }, []);
  const handleback=()=>{
    navigate(-1)
  }

  return (
    <div className="broadcast-container">
        <button onClick={handleback} id='backbutton'><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-chevron-double-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
  <path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
</svg>Back</button>
      {broadcast ? (
        <div>
          <h1 className="broadcast-title">{broadcast.title}</h1>
          <p className="broadcast-message">{broadcast.message}</p>
          {broadcast.image && <img className="broadcast-image" src={`http://127.0.0.1:8000/${broadcast.image}`} alt={broadcast.title} />}
          <ul className="broadcast-sessions">
            {broadcast.sessions.map((session) => (
              <li key={session.id} className="broadcast-session-item">{session.title}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading broadcast details...</p>
      )}
    </div>
  );
}

export default Broadcast;
