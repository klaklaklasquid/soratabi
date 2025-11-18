import { createContext } from "react";

export const FilterContext = createContext<FilterContextInterface | undefined>(
  undefined,
);

interface FilterContextInterface {
  search: string;
  type: boolean;
  minPrice: number | undefined;
  maxPrice: number | undefined;
  minDuration: number | undefined;
  maxDuration: number | undefined;
  minRatingAverage: number | undefined;
  maxRatingAverage: number | undefined;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setType: React.Dispatch<React.SetStateAction<boolean>>;
  setMinPrice: React.Dispatch<React.SetStateAction<number | undefined>>;
  setMaxPrice: React.Dispatch<React.SetStateAction<number | undefined>>;
  setMinDuration: React.Dispatch<React.SetStateAction<number | undefined>>;
  setMaxDuration: React.Dispatch<React.SetStateAction<number | undefined>>;
  setMinRatingAverage: React.Dispatch<React.SetStateAction<number | undefined>>;
  setMaxRatingAverage: React.Dispatch<React.SetStateAction<number | undefined>>;
}
