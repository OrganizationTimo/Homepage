import axios from "axios";
import { ReactNode, useEffect } from "react";
import { apiBaseUrl } from "./utils/baseUrl";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: ReactNode;
  isAuthenticated: boolean | undefined;
  setIsAuthenticated: (value: boolean) => void;
};

export default function ProtectedRoute({
  children,
  isAuthenticated,
  setIsAuthenticated,
}: ProtectedRouteProps) {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuthenticated(true);
    }

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
  }, [setIsAuthenticated]);

  return isAuthenticated ? children : <Navigate to={"/login"} />;
}
