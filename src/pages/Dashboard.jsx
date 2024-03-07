import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import UserList from "../components/user/UserList";
import ActivityTemplateList from "../components/activity-template/ActivityTemplateList";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="user" element={<UserList />} />
        <Route path="activity-template" element={<ActivityTemplateList />} />
      </Routes>
    </DashboardLayout>
  );
}
