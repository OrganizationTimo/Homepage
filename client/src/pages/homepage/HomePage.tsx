import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function HomePage() {
  const theme = useContext(ThemeContext);

  return (
    <>
      <div className="w-full h-screen bg-white dark:bg-gray-500">
        <button
          onClick={() => {
            theme.setTheme(theme.theme === "light" ? "dark" : "light");
            localStorage.setItem(
              "theme",
              theme.theme === "light" ? "dark" : "light"
            );
          }}
        >
          Change Color{" "}
        </button>
      </div>
    </>
  );
}
