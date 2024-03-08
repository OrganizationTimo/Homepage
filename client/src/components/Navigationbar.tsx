import { Button } from "./Button";
import { useLocation, useNavigate } from "react-router-dom";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

type NavigationbarProps = {
  disabledNavigationbar: string[];
  routesPath: ({ name: string | undefined; path: string } | undefined)[];
};

export default function Navigationbar({
  routesPath,
  disabledNavigationbar,
}: NavigationbarProps) {
  const theme = useContext(ThemeContext);
  const auth = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  if (disabledNavigationbar.find((path) => location.pathname.includes(path))) {
    return null;
  }

  function changeTheme() {
    theme.setTheme(theme.theme === "light" ? "dark" : "light");
    localStorage.setItem("theme", theme.theme === "light" ? "dark" : "light");
  }

  return (
    <div className="w-full h-28 bg-secondary flex justify-between items-center px-10 text-white dark:bg-fourth dark:text-black">
      <p>[ICON]</p>
      <div className="flex gap-5 items-center">
        {routesPath.map((route, index) => {
          return (
            <Button key={index} buttonName={route?.name} to={route?.path} />
          );
        })}
        <Button
          buttonName={
            theme.theme === "light" ? <MdOutlineDarkMode /> : <MdDarkMode />
          }
          onClick={changeTheme}
        />
        {!auth.isAuthenticated && (
          <Button
            buttonName={"Login"}
            styled={true}
            onClick={() => {
              navigate("/login");
            }}
          />
        )}
      </div>
    </div>
  );
}
