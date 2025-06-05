import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import s from "./Header.module.css";

const Header = () => {
  return (
    <header className={s.header}>
      <div className={s.container}>
        <Link to="/" className={s.logo}>
          <svg>
            <use href="/icons/icons.svg#icon-TravelTrucks"></use>
          </svg>
        </Link>
        <Navigation />
      </div>
    </header>
  );
};

export default Header;
