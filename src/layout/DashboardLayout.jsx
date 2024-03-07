import React from "react";
import NavbarAdmin from "../components/navbar/NavbarAdmin";

export default function DashboardLayout({ children }) {
  return (
    <div>
      <NavbarAdmin />
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
