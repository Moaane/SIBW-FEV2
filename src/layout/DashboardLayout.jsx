import React from "react";
import NavbarAdmin from "../components/navbar/NavbarAdmin";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div>
      <NavbarAdmin />
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
