// ProtectRoute.js
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const ProtectRoute = () => {
  const { authenticated } = useAuth();
  return authenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectRoute;
