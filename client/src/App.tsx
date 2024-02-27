import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/authentication/LoginPage";
import RegisterPage from "./pages/authentication/RegisterPage";
import HomePage from "./pages/homepage/HomePage";
import ProtectedRoute from "./ProtectedRoute";
import { AuthContext } from "./context/AuthContext";
import { useAuthentication } from "./hooks/AuthHook";
import { ThemeContext } from "./context/ThemeContext";
import { useState } from "react";

export default function App() {
  /* TODO: DARK and LIGHT MODE:
   * window.matchMedia('(prefers-color-scheme: dark)').matches -> true or false
   */
  const { isAuthenticated, setIsAuthenticated } = useAuthentication();
  const [theme, setTheme] = useState<"light" | "dark" | null>(
    localStorage.getItem("theme") === "dark" ? "dark" : "light"
  );

  return (
    <div className={`${theme}`}>
      <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <BrowserRouter>
            <Routes>
              <Route
                path={"/"}
                element={<ProtectedRoute children={<HomePage />} />}
              />
              <Route
                path={"/login"}
                element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />}
              />
              <Route
                path={"/register"}
                element={
                  !isAuthenticated ? <RegisterPage /> : <Navigate to="/" />
                }
              />
            </Routes>
          </BrowserRouter>
        </ThemeContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}
