import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <NavLink to="/">HomePage</NavLink>
      <NavLink to="/catalog">CatalogPage</NavLink>
    </nav>
  );
};
export default Navigation;
