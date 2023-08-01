import React from "react";
import { useAuthStatus } from "../../hooks/useAuthStatus";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthGuard() {
  //first destructure the hook
  //condition a tenary operator to check if user is loggedin or <Navigate />
  const { isLoggedIn, isLoading } = useAuthStatus();
  if (isLoading) {
    return <h3 className="m-auto text-gray-500">Loading please wait....</h3>;
  }
  return isLoggedIn ? <Outlet /> : <Navigate to="/auth/sign-in" />;
}
