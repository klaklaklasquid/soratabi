import { Outlet } from "react-router-dom";
import App from "../App";
import Footer from "./Footer";
import NavBar from "./NavBar";
import NavigationLinks from "./NavigationLinks";
import useHamburger from "../Hooks/useHamburger";

function AppLayout() {
  const { isOpen } = useHamburger();

  return (
    <>
      <div
        className="h-screen w-screen fixed inset-0 bg-cover bg-top-right -z-20"
        style={{ backgroundImage: "url('/geminiBgv2.png')" }}></div>
      <div className="flex flex-col z-0">
        <App>
          <NavBar />

          {/* Main */}
          <main className={`grow h-svh pl-5 ${!isOpen && "pt-5"}`}>
            {!isOpen ? <Outlet /> : <NavigationLinks />}
          </main>

          {/* Footer */}
          {!isOpen && <Footer />}
        </App>
      </div>
    </>
  );
}

export default AppLayout;
