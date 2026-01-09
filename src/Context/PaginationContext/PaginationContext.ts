import { createContext } from "react";

export const PaginationContext = createContext<
  PaginationContextInterface | undefined
>(undefined);

interface PaginationContextInterface {
  toursPage: number;
  cruisesPage: number;
  setToursPage: React.Dispatch<React.SetStateAction<number>>;
  setCruisesPage: React.Dispatch<React.SetStateAction<number>>;
}
