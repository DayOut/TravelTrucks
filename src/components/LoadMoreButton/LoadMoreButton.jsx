import s from "./LoadMoreButton.module.css";

const LoadMoreButton = ({ onClick, isLoading }) => {
  return (
    <button
      onClick={onClick}
      className={s.loadMore}
      disabled={isLoading}
    ></button>
  );
};
export default LoadMoreButton;
