import React, { useState } from "react";
import { sentOPT } from "../APIs/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    try {
      e.preventDefault();
      const data = { email };
      const response = await sentOPT("no-auth", data);
      if (response.code === 1) {
        toast.success(response.message);
        toast.success("Check Your Email have a received OTP");
        setIsLoading(false);
        await navigate("/submit-otp", { state: data });
      } else {
        toast.error(response.message);
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      console.error("Error::", err);
    }
  };
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-md w-96">
        <h1 className="text-2xl font-semibold mb-4">Forgot password</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring"
              placeholder="Enter your email"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring"
          >
            Send OTP
          </button>
        </form>
        <div className="flex pt-4 text-sm">
          <Link to="/login" className="text-blue-900  pr-4 hover:underline">
            Go to Login Page?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
