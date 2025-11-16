import useHamburger from "../Hooks/useHamburger";

function NavBar() {
  const { barTop, barBottom, toggleAnimation } = useHamburger();

  return (
    <header className="fixed top-5 right-4 z-50">
      {/* mobile hamburger menu */}
      <div
        onClick={toggleAnimation}
        className="flex cursor-pointer flex-col gap-2 p-2"
      >
        <div
          ref={barTop}
          className="h-1 w-10 rounded-2xl bg-[#fafafa] opacity-50"
        ></div>
        <div
          ref={barBottom}
          className="h-1 w-10 rounded-2xl bg-[#fafafa] opacity-50"
        ></div>
      </div>
    </header>
  );
}

export default NavBar;
