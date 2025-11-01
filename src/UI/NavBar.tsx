import useHamburger from "../Hooks/useHamburger";

function NavBar() {
  const { barTop, barBottom, toggleAnimation } = useHamburger();

  return (
    <header className="fixed right-5 top-5 z-50">
      {/* mobile hamburger menu */}
      <div
        onClick={toggleAnimation}
        className="flex flex-col gap-2 p-2 cursor-pointer">
        <div
          ref={barTop}
          className="bg-[#fafafa] opacity-50 w-10 h-1 rounded-2xl"></div>
        <div
          ref={barBottom}
          className="bg-[#fafafa] opacity-50 w-10 h-1 rounded-2xl"></div>
      </div>
    </header>
  );
}

export default NavBar;
