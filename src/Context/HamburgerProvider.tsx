import { ReactNode } from "react";
import { useHamburgerAnimation } from "../Hooks/useHamburgerAnimation";
import { HamburgerContext } from "./HamburgerContext";

function HamburgerProvider({ children }: { children: ReactNode }) {
  const { isOpen, barTop, barBottom, toggleAnimation } =
    useHamburgerAnimation();
  return (
    <HamburgerContext.Provider
      value={{ isOpen, barTop, barBottom, toggleAnimation }}>
      {children}
    </HamburgerContext.Provider>
  );
}

export default HamburgerProvider;
