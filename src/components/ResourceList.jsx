import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import '../cssfolder/resourcelist.css';

function ResourceList({ addDownload }) {
  const navigate = useNavigate();
  const [resources, setResources] = useState([]);
  const { topicId } = useParams();
  const [imageVisible, setImageVisible] = useState(true); // State to manage image visibility

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/topics/${topicId}/resources/`)
      .then(response => response.json())
      .then(data => setResources(data));
  }, [topicId]);

  const handletests = () => {
    navigate('/tests');
  };

  const handleDownload = (resource) => {
    alert('added in downloads successfully..!');
    addDownload(resource); 
    navigate('/downloads')
  };

  const handleback = () => {
    navigate(-1);
  };

  const handleImageClick = () => {
    setImageVisible(false); // Hide the image when clicked
  };

  return (
    <center>
      <button onClick={handleback} id='backbutton'>
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-chevron-double-left" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
          <path fillRule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
        </svg>
        Back
      </button>
      <div className='resource-listcontainer'>
        <h3>
          <img
            src="\assets\pdf-logo.jpg"
            alt="topicspdf"
            className="imagepdf"
          />
          Pdf
        </h3>
        <div className="resource-list">
          {resources.map(resource => (
            <div key={resource.id} className="resource">
              <h3>{resource.title}</h3>
              {resource.resource_type === 'video' && (
                <>
                  {imageVisible && (
                    <img
                      src="\assets\lock.jpg"
                      alt="payments lock"
                      className="overlay"
                      onClick={handleImageClick} // Add click handler to the image
                    />
                  )}
                  <video
                    width="500"
                    height="200"
                    src={`http://127.0.0.1:8000/media/${resource.file}`}
                    title={resource.title}
                    allowFullScreen
                    autoPlay
                    //  controls
                    muted

                  ></video>
                  <button onClick={() => handleDownload(resource)} id='downloadbutton'><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-arrow-down-circle" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z"/>
                  </svg></button>
                </>
              )}
              {resource.resource_type === 'pdf' && (
                <>
                  <a href={resource.file} target="_blank" rel="noopener noreferrer">
                    Download PDF
                  </a>
                  <button onClick={() => handleDownload(resource)}>Download PDF</button>
                </>
              )}
            </div>
          ))}
        </div>
        <h3>
          <img
            src="\assets\folders.png"
            alt="test"
            className="imagetest"
            onClick={handletests}
          />
          test
        </h3>
      </div>
    </center>
  );
}

export default ResourceList;
