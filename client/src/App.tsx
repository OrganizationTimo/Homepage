import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth-page/LoginPage";
import RegisterPage from "./pages/auth-page/RegisterPage";
import HomePage from "./pages/home-page/HomePage";
import ProtectedRoute from "./ProtectedRoute";
import { AuthContext } from "./contexts/AuthContext";
import { useAuthentication } from "./hooks/AuthHook";
import { ThemeContext } from "./contexts/ThemeContext";
import { useState } from "react";
import Navigationbar from "./components/Navigationbar";
import BlogPage from "./pages/blog-page/BlogPage";

export default function App() {
  /* TODO: DARK and LIGHT MODE:
   * window.matchMedia('(prefers-color-scheme: dark)').matches -> true or false
   */
  const { isAuthenticated, setIsAuthenticated } = useAuthentication();
  const [theme, setTheme] = useState<"light" | "dark" | null>(
    localStorage.getItem("theme") === "dark" ? "dark" : "light"
  );

  const routing = {
    routes: [
      {
        name: "Home",
        path: "/",
        element: <ProtectedRoute children={<HomePage />} />,
      },
      {
        name: "Blogs",
        path: "/blogs",
        element: <ProtectedRoute children={<BlogPage />} />,
      },
      {
        isVisibleInNavigationbar: false,
        path: "/login",
        element: !isAuthenticated ? <LoginPage /> : <Navigate to="/" />,
      },
      {
        isVisibleInNavigationbar: false,
        path: "/register",
        element: !isAuthenticated ? <RegisterPage /> : <Navigate to="/" />,
      },
    ],
    disabledNavigationbar: ["login", "register"],
  };

  return (
    <div
      className={`${theme} bg-fourth dark:bg-secondary transition-colors duration-700`}
    >
      <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <BrowserRouter>
            <Navigationbar
              disabledNavigationbar={routing.disabledNavigationbar}
              routesPath={routing.routes.map((route) => {
                return {
                  name: route.name,
                  path: route.path,
                };
              })}
            />
            <Routes>
              {routing.routes.map((route, index) => (
                <Route key={index} {...route} />
              ))}
            </Routes>
          </BrowserRouter>
        </ThemeContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}
