import s from "./ReviewsSection.module.css";

const ReviewsSection = ({ reviews }) => {
  if (!reviews.length) {
    return <p>There is no comment.</p>;
  }

  return (
    <div className={s.reviews}>
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={review.id || `review-${index}`} className={s.review}>
            <div className={s.avatarRating}>
              <div className={s.avatar}>
                <span>{review.reviewer_name[0]}</span>
              </div>
              <div className={s.content}>
                <strong className={s.name}>{review.reviewer_name}</strong>
                <p className={s.rating}>
                  {renderRatingStars(review.reviewer_rating)}
                </p>
              </div>
            </div>
            <p className={s.comment}>{review.comment}</p>
          </div>
        ))
      ) : (
        <p>There is no comment.</p>
      )}
    </div>
  );
};

const renderRatingStars = (rating) => {
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(
      <svg key={i} className={s.starIcon}>
        <use href="/icons/icons.svg#star-yellow"></use>
      </svg>
    );
  }
  for (let i = rating; i < 5; i++) {
    stars.push(
      <svg key={i} className={s.starIcon}>
        <use href="/icons/icons.svg#star"></use>
      </svg>
    );
  }
  return stars;
};

export default ReviewsSection;
