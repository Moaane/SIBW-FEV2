import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import ActivityTemplateList from "../components/activity-template/ActivityTemplateList";
import User from "./User";
import Area from "./Area";
import AreaDetail from "./AreaDetail";
import AdminRoute from "../routes/AdminRoute";
import Notfound from "./Notfound";

export default function Dashboard() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route element={<AdminRoute />}>
          <Route path="user" element={<User />} />
          <Route path="activity-template" element={<ActivityTemplateList />} />
          <Route path="area" element={<Area />} />
          <Route path="area/:id" element={<AreaDetail />} />
        </Route>
      </Route>
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
}
