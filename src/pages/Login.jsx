import React, { useState } from "react";
import { Link } from "react-router-dom";
import { userLogin } from "../APIs/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuth } from "../context/authContext";
import Loader from "../components/Loader";

const Login = () => {
  const { authLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    try {
      const data = { email, password };
      const response = await userLogin("no-auth", data);

      if (response.token && response.code === 1) {
        toast.success(response.message);
        authLogin({
          authToken: response.token,
          user: response.user,
        });
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error(response.message);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Login error:", error);
      toast.error("An error occurred during login.");
    }
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-md w-96">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <input
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring"
              placeholder="Enter your email"
              required
              autoComplete="email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring"
                placeholder="Enter your password"
                required
                autoComplete="password"
              />
              <label
                onClick={handlePasswordToggle}
                className="absolute right-2 top-2 cursor-pointer mt-2"
              >
                {showPassword ? (
                  <FaEyeSlash className="text-gray-400" />
                ) : (
                  <FaEye className="text-blue-400" />
                )}
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring"
          >
            Log In
          </button>
        </form>
        <div className="flex pt-4 text-sm">
          <Link to="/register" className="text-blue-900  pr-4 hover:underline">
            Don't have an account?
          </Link>
          <Link to="/forgot-password" className="text-blue-900 hover:underline">
            Forgotten account?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
