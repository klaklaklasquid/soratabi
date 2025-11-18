import { createContext } from "react";

export const HamburgerContext = createContext<HamburgerContextType | undefined>(
  undefined
);

interface HamburgerContextType {
  isOpen: boolean;
  barTop: React.RefObject<HTMLDivElement>;
  barBottom: React.RefObject<HTMLDivElement>;
  toggleAnimation: () => void;
}
