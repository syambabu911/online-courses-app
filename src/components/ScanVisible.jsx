import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ScanVisible = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(' http://127.0.0.1:8000/api/qr-code/');
        setImageUrl(response.data.image);
      } catch (error) {
        console.error('Error fetching the QR code image:', error);
      }
    };

    fetchImage();
  }, []);

  const handleImageClick = () => {
    setIsClicked(true);
  };

  return (
    <center>
      <div className="qr">
        <div className="scan">
          <h2>Scan QR</h2>
          {isClicked ? (
            <img src={`http://127.0.0.1:8000${imageUrl}`} alt="new qr code" />
          ) : (
            <img
              src="https://image.freepik.com/free-vector/smartphone-scanning-qr-code-illustration_23-2148625457.jpg"
              alt="click qr"
              style={{ filter: 'blur(5px)', cursor: 'pointer' }}
              onClick={handleImageClick}
            />
          )}
          <Link to='/redirect' className='link'><h3>Redirect</h3></Link>
        </div>
      </div>
    </center>
  );
};

export default ScanVisible;
