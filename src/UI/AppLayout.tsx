import { Outlet } from "react-router-dom";
import App from "../App";
import NavBar from "./NavBar";
import NavigationLinks from "./NavigationLinks";
import useHamburger from "../Hooks/useHamburger";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

function AppLayout() {
  const { isOpen } = useHamburger();

  return (
    <>
      <div className="fixed inset-0 -z-20 h-screen w-screen bg-gradient-to-br from-[#0d1b2e] via-[#0d324d] to-[#004553]"></div>
      <div className="from-tertiary-blue/20 fixed inset-0 -z-10 h-screen w-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] via-transparent to-transparent"></div>
      <div className="from-secondary-blue/15 fixed inset-0 -z-10 h-screen w-screen bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] via-transparent to-transparent"></div>
      <div className="flex h-full flex-col">
        <App>
          <ScrollToTop />
          <NavBar />

          {/* Main */}
          <main className="mt-16 min-h-svh grow">
            {!isOpen ? <Outlet /> : <NavigationLinks />}
          </main>

          {!isOpen && <Footer />}
        </App>
      </div>
    </>
  );
}

export default AppLayout;
