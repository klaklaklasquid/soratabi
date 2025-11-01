import { NavLink } from "react-router-dom";
import { routeConfig as appRoutes } from "../main";
import useHamburger from "../Hooks/useHamburger";

function NavigationLinks() {
  const { toggleAnimation } = useHamburger();

  return (
    <nav>
      {appRoutes
        .filter((route) => route.inNav)
        .map((route) => (
          <NavLink key={route.path} to={route.path} onClick={toggleAnimation}>
            {route.name}
          </NavLink>
        ))}
    </nav>
  );
}

export default NavigationLinks;
