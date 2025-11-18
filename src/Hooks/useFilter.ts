import { useContext } from "react";
import { FilterContext } from "../Context/FilterContext/FilterContext";

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};
