import s from "./LoadMoreButton.module.css";

const LoadMoreButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className={s.loadMore}>
      Load More
    </button>
  );
};

export default LoadMoreButton;
