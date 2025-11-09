import { Outlet } from "react-router-dom";
import App from "../App";
// import Footer from "./Footer";
import NavBar from "./NavBar";
import NavigationLinks from "./NavigationLinks";
import useHamburger from "../Hooks/useHamburger";
import Footer from "./Footer";

function AppLayout() {
  const { isOpen } = useHamburger();

  return (
    <>
      <div
        className="fixed inset-0 -z-20 h-screen w-screen bg-cover bg-top-right"
        style={{ backgroundImage: "url('/geminiBgv2.png')" }}
      ></div>
      <div className="flex h-full flex-col">
        <App>
          <NavBar />

          {/* Main */}
          <main className={`h-svh grow`}>
            {!isOpen ? <Outlet /> : <NavigationLinks />}
          </main>

          {!isOpen && <Footer />}
        </App>
      </div>
    </>
  );
}

export default AppLayout;
