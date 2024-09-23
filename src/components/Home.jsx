import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Toggle from './Toggle';
import Navbar from './Navbar';

const Home = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('userdetails')));
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/images/')
      .then(response => response.json()) 
      .then(data => setImages(data));
  }, []);
console.log("images", images);
  const handleCourses = () => {
    navigate('/courses');
  };
  const handleMenu = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const handleyoutube = () => {
    window.location.href = 'https://www.youtube.com/embed/Xo14f1f2MzM';
  };
  const handleJobAlerts = () => {
    navigate('/alerts');
  };
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <div className="home-container">
      <Navbar/>
        <header className="header">
        <a onClick={handleMenu}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
</svg></a>
            <p className='title' style={{ color: 'blue' }}>Hello,{user.username}!</p>
            <img src='\assets\logovcube1.png' height="100" width="200" id="image" />
        </header>
        <section>
          <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              {images.map((image, index) => (
                <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={image.id} data-bs-interval="10000">
                  <img src={image.image} className="d-block w-100" alt={image.title} />
              <button className="carousel-control-prev" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" ></span>
              <span className='previous'>Previous</span>
            </button>
            <button className="carousel-control-next" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
              <span className="carousel-control-next-icon" ></span>
              <span className='previous'>Next</span>
            </button>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="ourcourses">
          <img src=".\assets\courses.png" alt="courses" onClick={handleCourses} />
          <h3>Courses Available:</h3>
          <p>Python</p>
          <p>Java</p>
          <p>Aws</p>
          <p>mysql</p>
          <p>Testing</p>
          <p>Html&css</p>
          <p>Javscript</p>
        </section>
        <div className="youtube-channel">
          <img src=".\assets\youtubelogo.png" alt="youtube" onClick={handleyoutube} />
          <img src=".\assets\job-alert.png" alt="jobalerts" onClick={handleJobAlerts} id='jobalertimage' />
        </div>
        <div className="sec">
          <footer>
          <div id="footer">
          <p>&copy; 2024 Your Company Name. All rights reserved.</p>
          <p>Contact us at: <a href="mailto:support@yourcompany.com">support@yourcompany.com</a></p>
          <p>Follow us on:
              <a href="https://www.facebook.com/yourcompany" target="_blank">Facebook</a> |
              <a href="https://www.twitter.com/yourcompany" target="_blank">Twitter</a> |
              <a href="https://www.linkedin.com/company/yourcompany" target="_blank">LinkedIn</a>
              <p><a href="/terms">Terms of Service</a> | <a href="/privacy">Privacy Policy</a></p>
          </p>
      </div>
     </footer>
        </div>
      </div>
      <Toggle isOpen={isSidebarOpen} onClose={closeSidebar} />
    </>
  );
};

export default Home;
