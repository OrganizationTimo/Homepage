import { Dispatch, SetStateAction, createContext } from "react";

export const ThemeContext = createContext<{
  theme: "light" | "dark" | null;
  setTheme: Dispatch<SetStateAction<"light" | "dark" | null>>;
}>({
  theme: null,
  setTheme: () => {},
});
