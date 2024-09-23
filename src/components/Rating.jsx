import React, { useState } from 'react';
import axios from 'axios';

function Rating() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleClick = (rate) => {
    setRating(rate);
  };

  const handleMouseOver = (newHover) => {
    setHover(newHover);
  };

  const handleMouseLeave = () => {
    setHover(rating);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send the rating and review to the server
    axios.post('http://localhost:8000/api/submit_rating_review/', { rating, review })
      .then(response => {
        console.log('Rating and review submitted successfully:', response.data);
        setSuccessMessage('Rating and review submitted successfully!');
        setRating(0);
        setHover(0);
        setReview('');
      })
      .catch(error => {
        console.error('There was an error submitting the rating and review!', error);
      });
  };

  return (
    <div className="rating">
      <h2>Rate and Review</h2>
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => handleClick(star)}
            onMouseOver={() => handleMouseOver(star)}
            onMouseLeave={handleMouseLeave}
            className={star <= (hover || rating) ? 'filled' : ''}
          >
            ★
          </span>
        ))}
      </div>
      <p>Rating: {rating}</p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review here..."
          rows="4"
          required
        ></textarea>
        <button type="submit">Submit</button>
      </form>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
}

export default Rating;
