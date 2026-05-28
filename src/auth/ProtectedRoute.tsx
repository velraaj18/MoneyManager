import { useEffect, useRef, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { authService } from "../services/authService";

const isTokenExpired = (token: string) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (!payload.exp) return true;

    return Date.now() >= payload.exp * 1000;
  } catch {
    return true;
  }
};

const hasValidated = useRef(false);

export const ProtectedRoute = () => {
  const location = useLocation();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    if(hasValidated.current) return;
    const validateSession = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (!accessToken || !refreshToken) {
        setIsAllowed(false);
        setCheckingAuth(false);
        return;
      }

      if (!isTokenExpired(accessToken)) {
        setIsAllowed(true);
        setCheckingAuth(false);
        return;
      }

      try {
        const res = await authService.refreshToken(refreshToken);

        const data = res.data.data;

        localStorage.setItem("accessToken", data.token);
        localStorage.setItem("refreshToken", data.refreshToken);

        setIsAllowed(true);
      } catch {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setIsAllowed(false);
      } finally {
        setCheckingAuth(false);
      }
    };
    hasValidated.current = true;
    validateSession();
  }, []);

  if (checkingAuth) {
    return null;
  }

  if (!isAllowed) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};
