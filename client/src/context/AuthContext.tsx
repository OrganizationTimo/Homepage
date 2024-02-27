import { Dispatch, SetStateAction, createContext } from "react";

export const AuthProvider = createContext<{
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
}>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});
createContext;
