import React from "react";
import { useAuthStatus } from "../../hooks/useAuthStatus";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../../components/Loader";

export default function AuthGuard() {
  const { isLoggedIn, isLoading } = useAuthStatus();
  if (isLoading) {
    return <Loader />;
  }
  return isLoggedIn ? <Outlet /> : <Navigate to="/auth/sign-in" />;
}
