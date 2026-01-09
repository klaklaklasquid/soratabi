import { useState, useEffect } from "react";
import { PaginationContext } from "./PaginationContext";
import { useFilter } from "@/Hooks/useFilter";

interface PaginationProviderProps {
  children: React.ReactNode;
}

function PaginationProvider({ children }: PaginationProviderProps) {
  const [toursPage, setToursPage] = useState<number>(1);
  const [cruisesPage, setCruisesPage] = useState<number>(1);

  const {
    search,
    minPrice,
    maxPrice,
    minDuration,
    maxDuration,
    minRatingAverage,
    maxRatingAverage,
    minDate,
    maxDate,
  } = useFilter();

  useEffect(() => {
    setToursPage(1);
    setCruisesPage(1);
  }, [
    search,
    minPrice,
    maxPrice,
    minDuration,
    maxDuration,
    minRatingAverage,
    maxRatingAverage,
    minDate,
    maxDate,
  ]);

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
