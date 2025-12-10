import useHamburger from "../Hooks/useHamburger";
import { NavLink } from "react-router-dom";
import { routeConfig as appRoutes } from "../main";

function NavBar() {
  const { barTop, barBottom, toggleAnimation } = useHamburger();

  return (
    <header className="fixed top-0 right-0 left-0 z-50 px-4 py-4 sm:px-6 lg:px-12">
      <nav className="flex w-full items-center justify-between">
        {/* Brand Badge */}
        <NavLink
          to="/"
          className="border-tertiary-blue/30 bg-tertiary-blue/5 hover:border-tertiary-blue/50 hover:bg-tertiary-blue/10 inline-flex items-center gap-2 rounded-full border px-4 py-2 backdrop-blur-sm transition-all duration-300"
        >
          <div className="bg-tertiary-blue h-2 w-2 animate-pulse rounded-full"></div>
          <span className="text-tertiary-blue text-sm font-medium tracking-wider">
            SORATABI
          </span>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-2 backdrop-blur-md md:flex">
          {appRoutes
            .filter((route) => route.inNav)
            .map((route) => (
              <NavLink
                key={route.path}
                to={route.path}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-secondary-blue shadow-secondary-blue/50 text-white shadow-lg"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                {route.name}
              </NavLink>
            ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={toggleAnimation}
          className="group flex flex-col gap-1.5 rounded-lg p-2 transition-all duration-300 hover:bg-white/10 md:hidden"
          aria-label="Toggle menu"
        >
          <div
            ref={barTop}
            className="h-0.5 w-7 rounded-full bg-white transition-all duration-300"
          ></div>
          <div
            ref={barBottom}
            className="h-0.5 w-7 rounded-full bg-white transition-all duration-300"
          ></div>
        </button>
      </nav>
    </header>
  );
}

export default NavBar;
