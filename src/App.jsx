import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Loader from "./common/Loader";

export default function App() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => setLoading(false), 1000);
  }, [pathname]);

  return loading ? (
    <Loader />
  ) : (
    <Routes>
      <Route path="/" index element={<Home />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
    </Routes>
  );
}
