import { createContext } from "react";

export const AuthContext = createContext<authContextInterface | undefined>(
  undefined,
);

interface authContextInterface {
  user: UserInterface;
  isAuth: boolean;
  isLoading: boolean;
}
