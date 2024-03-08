import { Dispatch, SetStateAction, createContext } from "react";

export const AuthContext = createContext<{
  isAuthenticated: boolean | null;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
}>({
  isAuthenticated: null,
  setIsAuthenticated: () => {},
});
