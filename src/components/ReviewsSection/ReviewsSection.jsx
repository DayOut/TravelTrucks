import s from "./Reviews.module.css";

const ReviewsSection = ({ reviews }) => {
  return (
    <div className={s.reviews}>
      <h3>Customer Reviews</h3>
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={review.id || `review-${index}`} className={s.review}>
            <strong>{review.reviewer_name}</strong>
            <p>{review.comment}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default ReviewsSection;
