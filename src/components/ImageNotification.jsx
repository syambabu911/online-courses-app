import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ImageNotification = () => {
  const [media, setMedia] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://127.0.0.1:8000/notification')
      .then(res => res.json())
      .then(data => {
        setMedia(data);
        setNotificationCount(data.length);
      })
      .catch(error => console.error('Error fetching media:', error));
  }, []);

  const handleMediaClick = () => {
    // Mark media as read or update notification count
    setNotificationCount(0);
  };
  const handleback=()=>{
    navigate('/home')
  }

  return (
    <>
      <div>
      <button onClick={handleback} id='backbutton'><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-chevron-double-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
  <path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
</svg>Back</button>
      {notificationCount > 0 && (
        <div className="notification">
          <h1 id='h1'>{notificationCount > 0 ? "New Media Available!" : "No New Media"}</h1>
          <span className="notification-count">{notificationCount}</span>
          <span className="notification-text">New media available</span> 
        </div>
      )}
      <div className="media-container">
        {media.map(item => {
          const fileUrl = `http://127.0.0.1:8000${item.file}`; // Construct the full URL
          return item.media_type === 'image' ? (
            <img 
              key={item.id}
              src={fileUrl}
              alt={item.title}
              onClick={handleMediaClick}
            />
          ) : (
            <video
              key={item.id}
              src={fileUrl}
              controls 
              onClick={handleMediaClick}
            />
          );
        })}   
      </div>
    </div>
    </>

  );
};

export default ImageNotification;
