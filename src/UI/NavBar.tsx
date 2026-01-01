import useHamburger from "../Hooks/useHamburger";
import { NavLink } from "react-router-dom";
import { routeConfig as appRoutes } from "../main";
import NavigateBackPage from "../Components/NavigateBackPage";
import { useLocationMatch } from "../Hooks/useLocationMatch";
import { UserRound } from "lucide-react";
import useAuth from "@/Auth/useAuth";
import { useUserProfile } from "@/Hooks/useUserProfile";

function NavBar() {
  const auth = useAuth();
  const { data: userProfile } = useUserProfile();
  const { barTop, barBottom, toggleAnimation, isOpen } = useHamburger();
  const showBack = useLocationMatch([
    "/filter-settings",
    "/tour/:type/:id",
    "/tour/:type/:id/date/:dateId",
    "/review/:id",
    "/info-tour/:id",
  ]);

  return (
    <header className="fixed top-0 right-0 left-0 z-9999 px-4 py-4 sm:px-6 lg:px-12">
      <nav className="flex w-full items-center justify-between">
        {/* Left: Back button and Brand together */}
        <div className="flex items-center gap-5">
          {showBack && (
            <NavigateBackPage className="static top-0 left-0 size-8" />
          )}
          <NavLink
            to="/"
            className={`border-tertiary-blue/30 bg-tertiary-blue/5 hover:border-tertiary-blue/50 hover:bg-tertiary-blue/10 inline-flex items-center gap-2 rounded-full border px-4 py-2 backdrop-blur-sm transition-all duration-300 ${showBack ? "ml-2" : ""}`}
          >
            <div className="bg-tertiary-blue h-2 w-2 animate-pulse rounded-full"></div>
            <span className="text-tertiary-blue text-sm font-medium tracking-wider">
              SORATABI
            </span>
          </NavLink>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 md:flex">
          <NavLink
            to={auth.isAuthenticated ? "/account" : "/login"}
            className={({ isActive }) =>
              `group relative grid aspect-square place-items-center rounded-full border backdrop-blur-sm transition-all duration-300 ${
                isActive
                  ? "border-secondary-blue bg-secondary-blue/20 shadow-secondary-blue/30 shadow-lg"
                  : "border-tertiary-blue/30 bg-tertiary-blue/5 hover:border-tertiary-blue/50 hover:bg-tertiary-blue/15 hover:shadow-tertiary-blue/20 hover:shadow-md"
              } w-12 overflow-hidden md:w-14`
            }
          >
            {auth.isAuthenticated && userProfile?.userphoto ? (
              <img
                src={userProfile.userphoto}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <UserRound
                className={`h-5 w-5 transition-all duration-300 group-hover:scale-110`}
              />
            )}
          </NavLink>
          <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-2 backdrop-blur-md">
            {appRoutes
              .filter((route) => route.inNav)
              .map((route) => {
                let isBrowseActive = false;
                if (route.name === "BROWSE") {
                  isBrowseActive =
                    window.location.pathname === "/browse-destination" ||
                    window.location.pathname.startsWith("/tour/");
                }

                if (
                  route.name === "CREATE TOUR" &&
                  (!auth.isAuthenticated ||
                    auth.user?.profile?.role !== "admin")
                ) {
                  return null;
                }

                return (
                  <NavLink
                    key={route.path}
                    to={route.path}
                    className={({ isActive }) =>
                      `rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                        (route.name === "BROWSE" ? isBrowseActive : isActive)
                          ? "bg-secondary-blue shadow-secondary-blue/50 text-white shadow-lg"
                          : "text-gray-300 hover:bg-white/10 hover:text-white"
                      }`
                    }
                  >
                    {route.name}
                  </NavLink>
                );
              })}
          </div>
        </div>

        {/* Mobile: Login + Hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <NavLink
            to={auth.isAuthenticated ? "/account" : "/login"}
            onClick={() => isOpen && toggleAnimation()}
            className={({ isActive }) =>
              `group relative grid aspect-square place-items-center rounded-full border backdrop-blur-sm transition-all duration-300 ${
                isActive
                  ? "border-secondary-blue bg-secondary-blue/20 shadow-secondary-blue/30 shadow-lg"
                  : "border-tertiary-blue/30 bg-tertiary-blue/5 hover:border-tertiary-blue/50 hover:bg-tertiary-blue/15 hover:shadow-tertiary-blue/20 hover:shadow-md"
              } w-10 overflow-hidden sm:w-12`
            }
          >
            {auth.isAuthenticated && userProfile?.userphoto ? (
              <img
                src={userProfile.userphoto}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <UserRound
                className={`h-4 w-4 transition-all duration-300 group-hover:scale-110 sm:h-5 sm:w-5`}
              />
            )}
          </NavLink>
          <button
            onClick={toggleAnimation}
            className="group flex flex-col gap-1.5 rounded-lg p-2 transition-all duration-300 hover:bg-white/10"
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
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
