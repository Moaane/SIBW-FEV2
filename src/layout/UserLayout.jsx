import React from "react";
import NavbarUser from "../components/navbar/NavbarUser";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

export default function UserLayout() {
  const user = useAuth();
  const admin = user.admin;
  if (admin) {
    return <Navigate to="/dashboard/area" />;
  }

  return (
    <div>
      <NavbarUser />
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
