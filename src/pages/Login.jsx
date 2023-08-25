import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function Login() {
  const { login } = useAuth();

  const navigate = useNavigate();
  const handleLogin = (event) => {
    event.preventDefault();
    login();
    navigate("/");
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 shadow-md rounded-md w-96">
          <h1 className="text-2xl font-semibold mb-4">Login</h1>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="button"
              className="w-full py-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring"
              onClick={handleLogin}
            >
              Log In
            </button>
          </form>
          <div className="flex pt-4 text-sm">
            <Link
              to="/register"
              className="text-blue-900  pr-4 hover:underline"
            >
              Don't have an account?
            </Link>
            <Link
              to="/forgot-password"
              className="text-blue-900 hover:underline"
            >
              Forgotten account?
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
