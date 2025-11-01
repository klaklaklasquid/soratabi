import { useContext } from "react";
import { HamburgerContext } from "../Context/HamburgerContext";

function useHamburger() {
  const context = useContext(HamburgerContext);
  if (!context) {
    throw new Error("useHamburger must be used within a HamburgerProvider");
  }
  return context;
}

export default useHamburger;
