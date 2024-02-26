import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/authentication/LoginPage";
import RegisterPage from "./pages/authentication/RegisterPage";
import HomePage from "./pages/homepage/HomePage";
import ProtectedRoute from "./ProtectedRoute";
import { useState } from "react";

export default function App() {
  /* TODO: DARK and LIGHT MODE:
   * window.matchMedia('(prefers-color-scheme: dark)').matches -> true or false
   */

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={"/"}
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
              children={<HomePage />}
            />
          }
        />
        <Route
          path={"/login"}
          element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path={"/register"}
          element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}
