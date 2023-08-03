import React from "react";
import { useAuthStatus } from "../../hooks/useAuthStatus";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../../components/Loader";

export default function AuthGuard() {
  //first destructure the hook
  //condition a tenary operator to check if user is loggedin or <Navigate />
  const { isLoggedIn, isLoading } = useAuthStatus();
  if (isLoading) {
    return <Loader />;
  }
  return isLoggedIn ? <Outlet /> : <Navigate to="/auth/sign-in" />;
}
