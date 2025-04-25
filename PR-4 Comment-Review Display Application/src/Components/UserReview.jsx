import { useState } from "react";
import "./UserReview.css";

const UserReview = () => {
  const initialInput = {
    username: "",
    Review: "",
    rating: 0,
    hoverRating: 0
  };

  const [formValues, setFormValues] = useState(initialInput);
  const [errors, setErrors] = useState({});
  const [reviews, setReviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleStarClick = (rating) => {
    setFormValues({ ...formValues, rating });
  };

  const handleStarHover = (rating) => {
    setFormValues(prev => ({ ...prev, hoverRating: rating }));
  };

  const handleStarLeave = () => {
    setFormValues(prev => ({ ...prev, hoverRating: 0 }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formValues.username.trim()) {
      newErrors.username = "Name is required";
    } else if (formValues.username.trim().length < 3) {
      newErrors.username = "Name must be at least 3 characters";
    }
    
    if (!formValues.Review.trim()) {
      newErrors.Review = "Review is required";
    } else if (formValues.Review.trim().length < 10) {
      newErrors.Review = "Review must be at least 10 characters";
    }
    
    if (formValues.rating === 0) {
      newErrors.rating = "Please rate your experience";
    }
    return newErrors;
  };

  const handleSubmit =  (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      
      
      const newReview = {
        ...formValues,
        id: Date.now(),
        date: new Date().toLocaleDateString("en-US", {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
      };
      
      setReviews([newReview, ...reviews]);
      setFormValues(initialInput);
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating, interactive = false) => {
    return [1, 2, 3, 4, 5].map((star) => (
      <span
        key={star}
        className={`star ${star <= (interactive ? (formValues.hoverRating || formValues.rating) : rating) ? "filled" : ""} ${interactive ? "interactive" : ""}`}
        onClick={() => interactive && handleStarClick(star)}
        onMouseEnter={() => interactive && handleStarHover(star)}
        onMouseLeave={() => interactive && handleStarLeave()}
      >
        {star <= (interactive ? (formValues.hoverRating || formValues.rating) : rating) ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="none">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" strokeWidth="1.5"/>
          </svg>
        )}
      </span>
    ));
  };

  const getRatingColor = (rating) => {
    if (rating >= 4) return "#4CAF50"; 
    if (rating >= 2.5) return "#FFC107"; 
    return "#F44336"; 
  };

  return (
    <div className="review-app">
      <div className="review-form-container glassmorphism">
        <div className="form-header">
          <h2>Share Your Experience</h2>
          <p>We value your feedback to improve our services</p>
        </div>
        
        <form onSubmit={handleSubmit} className="review-form">
          <div className={`form-group ${errors.username ? "error" : ""}`}>
            <label>Your Name</label>
            <div className="input-container">
              <input
                type="text"
                name="username"
                value={formValues.username}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
              <span className="input-icon">
                <i className="fas fa-user"></i>
              </span>
            </div>
            {errors.username && <span className="error-message">{errors.username}</span>}
          </div>
          
          <div className={`form-group ${errors.Review ? "error" : ""}`}>
            <label>Your Review</label>
            <div className="input-container">
              <textarea
                name="Review"
                value={formValues.Review}
                onChange={handleChange}
                placeholder="Tell us about your experience..."
                rows={4}
              />
              <span className="input-icon">
                <i className="fas fa-comment"></i>
              </span>
            </div>
            {errors.Review && <span className="error-message">{errors.Review}</span>}
          </div>
          
          <div className={`form-group ${errors.rating ? "error" : ""}`}>
            <label>Your Rating</label>
            <div className="star-rating-container">
              <div className="star-rating">
                {renderStars(formValues.rating, true)}
              </div>
              <span className="rating-text">
                {formValues.rating > 0 ? (
                  <>
                    <span style={{ color: getRatingColor(formValues.rating) }}>
                      {formValues.rating} out of 5
                    </span>
                    {formValues.rating === 5 && " ⭐ Excellent!"}
                    {formValues.rating === 4 && " 👍 Good"}
                    {formValues.rating === 3 && " 🙂 Average"}
                    {formValues.rating === 2 && " 👎 Poor"}
                    {formValues.rating === 1 && " ❌ Terrible"}
                  </>
                ) : "Not rated"}
              </span>
            </div>
            {errors.rating && <span className="error-message">{errors.rating}</span>}
          </div>
          
          <button 
            type="submit" 
            className="submit-btn gradient-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                Submitting...
              </>
            ) : (
              <>
                <i className="fas fa-paper-plane"></i> Submit Review
              </>
            )}
          </button>
        </form>
      </div>

      <div className="reviews-section glassmorphism">
        <div className="section-header">
          <h3>Customer Reviews</h3>
          <div className="reviews-count">
            <i className="fas fa-comments"></i> {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
          </div>
        </div>
        
        {reviews.length === 0 ? (
          <div className="empty-state">
            <i className="fas fa-comment-slash"></i>
            <p>No reviews yet. Be the first to share your thoughts!</p>
          </div>
        ) : (
          <div className="reviews-grid">
            {reviews.map((review) => (
              <div 
                key={review.id} 
                className="review-card"
                style={{ 
                  borderTop: `4px solid ${getRatingColor(review.rating)}`,
                  boxShadow: `0 4px 20px ${getRatingColor(review.rating)}20`
                }}
              >
                <div className="card-header">
                  <div 
                    className="user-avatar"
                    style={{ 
                      background: `linear-gradient(135deg, ${getRatingColor(review.rating)}, ${getRatingColor(review.rating + 1) || getRatingColor(review.rating)})`
                    }}
                  >
                    {review.username.charAt(0).toUpperCase()}
                  </div>
                  <div className="user-info">
                    <h4>{review.username}</h4>
                    <span className="review-date">
                      <i className="far fa-calendar-alt"></i> {review.date}
                    </span>
                  </div>
                </div>
                <div className="card-rating">
                  <div className="stars">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <div className="card-content">
                  <p>{review.Review}</p>
                </div>
                <div className="card-footer">
                  <span className="helpful-btn">
                    <i className="fas fa-thumbs-up"></i> Helpful
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserReview;