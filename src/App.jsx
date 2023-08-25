import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectPageRoutes from "./ProtectPageRoutes";
import ForgotPassword from "./pages/forgotPassword";
import ForgotPasswordOTP from "./pages/ForgotPasswordOTP";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/authContext";

const App = () => {
  return (
    <AuthProvider>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route exact path="/*" element={<ProtectPageRoutes />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/forgot-password" element={<ForgotPassword />} />
          <Route exact path="/submit-otp" element={<ForgotPasswordOTP />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
