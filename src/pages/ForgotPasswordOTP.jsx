import React from "react";
import { Link } from "react-router-dom";

function ForgotPasswordOTP() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-md w-96">
        <h1 className="text-2xl font-semibold mb-4">Forgot password</h1>
        <form>
          <div className="mb-4">
            <input
              type="email"
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring"
              placeholder="Enter your email"
            />
          </div>
          <button className="w-full py-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring">
            Send OTP
          </button>
        </form>
        <div className="flex pt-4 text-sm">
          <Link to="/login" className="text-blue-900  pr-4 hover:underline">
            Resend OPT?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordOTP;
