import { useState } from "react";
import { FilterContext } from "./FilterContext";

function FilterProvider({ children }: FilterProviderProps) {
  const [search, setSearch] = useState<string>("");
  const [type, setType] = useState<boolean>(true);
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [minDuration, setMinDuration] = useState<number | undefined>(undefined);
  const [maxDuration, setMaxDuration] = useState<number | undefined>(undefined);
  const [minRatingAverage, setMinRatingAverage] = useState<number | undefined>(
    undefined,
  );
  const [maxRatingAverage, setMaxRatingAverage] = useState<number | undefined>(
    undefined,
  );

  return (
    <FilterContext.Provider
      value={{
        search,
        setSearch,
        type,
        setType,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        minDuration,
        setMinDuration,
        maxDuration,
        setMaxDuration,
        minRatingAverage,
        setMinRatingAverage,
        maxRatingAverage,
        setMaxRatingAverage,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

interface FilterProviderProps {
  children: React.ReactNode;
}

export default FilterProvider;
