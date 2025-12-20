import { NavLink, useLocation } from "react-router-dom";
import { routeConfig as appRoutes } from "../main";
import useHamburger from "../Hooks/useHamburger";
import useAuth from "@/Auth/useAuth";

function NavigationLinks() {
  const { user } = useAuth();
  const { toggleAnimation } = useHamburger();
  const location = useLocation();

  return (
    <nav className="fixed inset-0 flex flex-col items-center justify-center gap-8 backdrop-blur-xl">
      {/* Navigation Links */}
      {appRoutes
        .filter((route) => route.inNav)
        .map((route, index) => {
          // Custom active logic for BROWSE
          let isBrowseActive = false;
          if (route.name === "BROWSE") {
            isBrowseActive =
              location.pathname === "/browse-destination" ||
              location.pathname.startsWith("/tour/");
          }

          if (route.name === "CREATE TOUR" && user.role !== "admin") return;

          return (
            <NavLink
              key={route.path}
              to={route.path}
              onClick={toggleAnimation}
              className={({ isActive }) =>
                `text-3xl font-bold transition-all duration-300 ${
                  (route.name === "BROWSE" ? isBrowseActive : isActive)
                    ? "scale-110 text-white"
                    : "text-gray-400 hover:scale-105 hover:text-white"
                }`
              }
              style={{
                animationDelay: `${index * 0.1}s`,
                animation: "slideInRight 0.5s ease-out both",
              }}
            >
              {route.name}
            </NavLink>
          );
        })}

      {/* Decorative blur elements */}
      <div className="bg-tertiary-blue/20 pointer-events-none absolute top-1/4 left-1/4 h-64 w-64 rounded-full blur-[100px]"></div>
      <div className="bg-secondary-blue/20 pointer-events-none absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full blur-[100px]"></div>
    </nav>
  );
}

export default NavigationLinks;
