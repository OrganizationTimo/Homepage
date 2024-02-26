import axios from "axios";
import { ReactNode, useEffect, useState } from "react";
import { apiBaseUrl } from "./utils/baseUrl";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    async function validateToken() {
      try {
        await axios.get(apiBaseUrl + "/api/validate-token", {
          headers: {
            Authorization: `Bearer: ${localStorage.getItem("token")}`,
          },
        });

        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
      }
    }
    validateToken();
  }, []);

  return isAuthenticated ? children : <Navigate to={"/login"} />;
}
