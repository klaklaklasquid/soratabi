import { NavLink } from "react-router-dom";
import { routeConfig as appRoutes } from "../main";
import useHamburger from "../Hooks/useHamburger";

function NavigationLinks() {
  const { toggleAnimation } = useHamburger();

  return (
    <nav className="h-svh flex flex-col justify-center items-center gap-8">
      {appRoutes
        .filter((route) => route.inNav)
        .map((route) => (
          <NavLink
            key={route.path}
            to={route.path}
            onClick={toggleAnimation}
            className={({ isActive }) =>
              `text-2xl transition-opacity duration-200 ${
                isActive
                  ? "text-[rgba(192,192,192,1)]"
                  : "text-[rgba(192,192,192,0.5)] hover:text-[rgba(192,192,192,0.8)]"
              }`
            }>
            {route.name}
          </NavLink>
        ))}
    </nav>
  );
}

export default NavigationLinks;
