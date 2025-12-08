import { useContext } from "react";
import { ModelContext } from "../Context/ModelsContext/ModelContext";

export const useModels = () => {
  const context = useContext(ModelContext);
  if (!context)
    throw new Error("useModels must be used within a ModelsProvider");
  return context;
};
