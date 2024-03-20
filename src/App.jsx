import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Loader from "./common/Loader";
import Area from "./pages/Area";
import { useNavigate } from "react-router-dom";
import AreaDetail from "./pages/AreaDetail";
import Login from "./pages/Login";
import AuthProvider from "./auth/AuthProvider";
import PrivateRoute from "./routes/PrivateRoute";
import UserLayout from "./layout/UserLayout";
import AuthRoute from "./routes/AuthRoute";
import AdminRoute from "./routes/AdminRoute";
import Notfound from "./pages/Notfound";
import Register from "./pages/Register";

export default function App() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (pathname === "/dashboard/" || pathname === "/dashboard") {
      navigate("/dashboard/user", { replace: true });
    }
    if (pathname === "/") {
      navigate("/login", { replace: true });
    }
    setTimeout(() => setLoading(false), 1000);
  }, [pathname, navigate]);

  return loading ? (
    <Loader />
  ) : (
    <AuthProvider>
      <Routes>
        <Route element={<AuthRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route element={<UserLayout />}>
            <Route path="/area" element={<Area />} />
            <Route path="/area/:id" element={<AreaDetail />} />
          </Route>
          <Route element={<AdminRoute />}>
            <Route path="/dashboard/*" element={<Dashboard />} />
          </Route>
        </Route>
        <Route path="*" element={<Notfound />} />
      </Routes>
    </AuthProvider>
  );
}
