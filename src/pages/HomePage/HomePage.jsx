import { Link } from "react-router-dom";
import s from "./HomePage.module.css";
const HomePage = () => {
  return (
    <>
      <div className={s.container}>
        <div className={s.contentWrapper}>
          <div className={s.titleWrapper}>
            <h1 className={s.mainTitle}>Campers of your dreams</h1>
            <h2 className={s.title}>
              You can find everything you want in our catalog
            </h2>
          </div>
          <Link to={"/catalog"} className={s.link}>
            View Now
          </Link>
        </div>
      </div>
    </>
  );
};
export default HomePage;
