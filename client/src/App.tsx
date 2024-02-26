import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/authentication/LoginPage";
import RegisterPage from "./pages/authentication/RegisterPage";
import HomePage from "./pages/homepage/HomePage";
import ProtectedRoute from "./ProtectedRoute";

export default function App() {
  /* TODO: DARK and LIGHT MODE:
   * window.matchMedia('(prefers-color-scheme: dark)').matches -> true or false
   */

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={"/"}
          element={<ProtectedRoute children={<HomePage />} />}
        />
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/register"} element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}
