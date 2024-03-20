import React from "react";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function AdminRoute() {
  const admin = localStorage.getItem("admin");
  if (!admin) {
    return <Navigate to="/area" />;
  }
  return <Outlet />;
}
