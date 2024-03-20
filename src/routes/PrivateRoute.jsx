import React from "react";
import { useAuth } from "../auth/AuthProvider";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const user = useAuth();
  if (!user.token) return <Navigate to="/login" />;
  return <Outlet />;
}
