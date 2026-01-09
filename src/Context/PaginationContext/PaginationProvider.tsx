import { useState } from "react";
import { PaginationContext } from "./PaginationContext";

interface PaginationProviderProps {
  children: React.ReactNode;
}

function PaginationProvider({ children }: PaginationProviderProps) {
  const [toursPage, setToursPage] = useState<number>(1);
  const [cruisesPage, setCruisesPage] = useState<number>(1);

  return (
    <PaginationContext.Provider
      value={{
        toursPage,
        cruisesPage,
        setToursPage,
        setCruisesPage,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
}

export default PaginationProvider;
