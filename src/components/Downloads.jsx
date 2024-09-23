import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Downloads({ downloads }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (filterType) => {
    setFilter(filterType);
  };

  const filteredDownloads = downloads.filter(download =>
    (download.title.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
    download.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filter === 'all' || download.resource_type === filter||filter === 'video')
  );
  const handleback=()=>{
    navigate('/home')
  }

  return (
    <div className="downloads-container">
                <button onClick={handleback} id='backbutton'><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-chevron-double-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
  <path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
</svg></button>
      <input
        type="search"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search by title"
      />
      <div className="button-container">
        <button className="all-button" onClick={() => handleFilterChange('all')}>All</button>
        <button className="video-button" onClick={() => handleFilterChange('video')}>Videos</button>
        <button className="pdf-button" onClick={() => handleFilterChange('pdf')}>PDFs</button>
      </div>
      {filteredDownloads.length === 0 ? (
        <p id="para">No downloads yet</p>
      ) : (
        filteredDownloads.map((download, index) => (
          <div key={index} className="download-item">
            <h3>{download.title}</h3>
            {download.resource_type === 'video' ? (
              <video
                width="300"
                height="200"
                src={`http://127.0.0.1:8000/media/${download.file}`}
                title={download.title}
                frameBorder="0"
                allowFullScreen
                // controls
                autoPlay
                // muted
              ></video>
            ) : (
              <a href={`http://127.0.0.1:8000/media/${download.file}`} target="_blank" rel="noopener noreferrer">
                {download.title}
              </a>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Downloads;
