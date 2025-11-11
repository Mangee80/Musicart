import React, { useState } from 'react';
import styles from './Review.module.css';
import thumbsUpIcon from '../../assets/like.png';

function Reviewform() {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState('');
  const handleStarClick = () => { 
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      setRating(0);
      setReviewText('');
    }, 2000); 
  }

  const handleSubmit = () => {
    if (reviewText.trim() || rating > 0) {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        setRating(0);
        setReviewText('');
      }, 2000);
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }
  // const handleStarClick = async (value) => {
  //   try {
  //     setRating(value);
      
  //     // Prepare the review data
  //     const reviewData = {
  //       rating: value,
  //       comment: reviewText || 'Default comment',
  //       userId: 'user123'  // Replace with actual userId if needed
  //     };
      
  //     // Submit the review to the backend
  //     const response = await fetch(`/products/your-product-id/reviews`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(reviewData),
  //     });
      
  //     if (response.ok) {
  //       setShowPopup(true);
  //       setTimeout(() => {
  //         setShowPopup(false);
  //         setRating(0);
  //         setReviewText('');
  //       }, 2000);
  //       setError('');
  //     } else {
  //       setError('Error submitting review. Please try again.');
  //     }
  //   } catch (err) {
  //     console.error('Error submitting review:', err);
  //     setError('Error submitting review. Please try again.');
  //   }
  // };

  return (
    <div className={styles.reviewWrapper}>
      <div className={`${styles.reviewContainer} ${showPopup ? styles.hidden : ''}`}>
        
        <div className={styles.stars}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`${styles.star} ${rating >= star ? styles.selected : ''}`}
              onClick={() => {
                setRating(star);
                handleStarClick();
              }}
            >
              ★
            </span>
          ))}
        </div>
        <div>
          <p className={styles.feedbackText}>Your feedback helps us grow!</p>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Write your review here... (Press Enter to submit)"
            className={styles.textarea}
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
      </div>

      {showPopup && (
        <div className={styles.successPopup}>
          <img src={thumbsUpIcon} alt="Thumbs Up" className={styles.thumbsUp} />
          <p>Success</p>
        </div>
      )}
    </div>
  );
}

export default Reviewform;
