import axios from "axios";
import { ReactNode, useContext, useEffect } from "react";
import { apiBaseUrl } from "./utils/baseUrl";
import { Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

type ProtectedRouteProps = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const auth = useContext(AuthProvider);

  useEffect(() => {
    async function validateToken() {
      try {
        await axios.get(apiBaseUrl + "/api/validate-token", {
          headers: {
            Authorization: `Bearer: ${localStorage.getItem("token")}`,
          },
        });

        auth.setIsAuthenticated(true);
      } catch (err) {
        auth.setIsAuthenticated(false);
      }
    }
    validateToken();
  }, [auth]);

  return auth.isAuthenticated ? children : <Navigate to={"/login"} />;
}
