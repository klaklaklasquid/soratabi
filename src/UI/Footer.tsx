import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-tertiary-blue/20 bg-primary-blue/30 mt-16 border-t backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand Section */}
          <div className="flex flex-col items-center gap-3 md:items-start">
            <h3 className="text-tertiary text-2xl font-bold">Soratabi</h3>
            <p className="text-center text-sm text-gray-300 md:text-left">
              Reach for the stars
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center gap-3">
            <h4 className="text-sm font-semibold tracking-wider text-gray-400 uppercase">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2 text-center">
              <Link
                to="/about"
                className="hover:text-tertiary-blue text-sm text-gray-300 transition-colors"
              >
                About
              </Link>
              <Link
                to="/browse-destination"
                className="hover:text-tertiary-blue text-sm text-gray-300 transition-colors"
              >
                Browse Tours
              </Link>
              <Link
                to="/account"
                className="hover:text-tertiary-blue text-sm text-gray-300 transition-colors"
              >
                Account
              </Link>
            </nav>
          </div>

          {/* Credits Section */}
          <div className="flex flex-col items-center gap-3 md:items-end">
            <h4 className="text-sm font-semibold tracking-wider text-gray-400 uppercase">
              Credits
            </h4>
            <div className="flex flex-col gap-1 text-center text-xs text-gray-400 md:text-right">
              <p>Airplane by jeremy [CC-BY] via Poly Pizza</p>
              <p>Rainbow by Poly by Google [CC-BY] via Poly Pizza</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-tertiary-blue/20 mt-8 border-t pt-6">
          <p className="text-center text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Soratabi | Jordy Van Belle. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
