import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";

const Navigation = () => {
  return (
    <div>
      <nav>
        <ul className={s.navList}>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? s.activeLink : s.link)}
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? s.activeLink : s.link)}
              to="/catalog"
            >
              Catalog
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
