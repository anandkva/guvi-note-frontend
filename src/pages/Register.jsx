import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../APIs/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const inputStyles = "w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, username, password };
    try {
      const res = await register("no-auth", data);
      if (res.code === 1) {
        toast.success(res.message);
        navigate("/login");
        setUsername("");
        setEmail("");
        setPassword("");
      } else if (res.code === 0) {
        toast.error(res.message);
        setResponse(res);
      }
    } catch (err) {
      console.error(`ERROR:: ${err}`);
    }
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-md w-96">
        <h1 className="text-2xl font-semibold mb-4">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              className={inputStyles}
              placeholder="Enter your Username"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className={inputStyles}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputStyles}
                placeholder="Enter your password"
                required
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
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring"
          >
            Sign Up
          </button>
        </form>
        {response && (
          <p className="pt-3 text-red-600">{response.message}</p>
        )}
        <div className="pt-4 text-sm">
          <Link to="/login" className="text-blue-900 hover:underline">
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
