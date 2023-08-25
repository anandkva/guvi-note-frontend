import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { resetPassword } from "../APIs/auth";
import { toast } from "react-toastify";

function ForgotPasswordOTP() {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState(location.state.email);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = { email, otp, newPassword };
      const response = await resetPassword("no-auth", data);
      if (response.code === 1) {
        toast.success(response.message);
        navigate("/login");
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      console.error(`Error:: ${err}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-md w-96">
        <h1 className="text-2xl font-semibold mb-4">Create New password</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">OTP</label>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              type="number"
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring"
              placeholder="--- ---"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">New Password</label>
            <input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type="text"
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring"
              placeholder="Enter New Password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring"
          >
            Create Password
          </button>
        </form>
        <div className="flex pt-4 text-sm">
          <Link
            to="/forgot-password"
            className="text-blue-900  pr-4 hover:underline"
          >
            Resend OPT?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordOTP;
