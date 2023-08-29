import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function SideBar() {
  const { authLogout, user } = useAuth();
  return (
    <div className="bg-blue-500 w-44 p-4 flex flex-col justify-between h-screen">
      <div className="text-white font-bold text-xl mb-11">Guvi Goals</div>
      <ul>
        <li className="mb-2 font-semibold">
          <Link to="/" className="text-white">
            Home
          </Link>
        </li>
        <li className="mb-2 font-semibold">
          <Link to="/my-goal" className="text-white">
            Personal Notes{" "}
          </Link>
        </li>
        <li className="mb-2 font-semibold">
          <Link to="/team-goal" className="text-white">
            Goals
          </Link>
        </li>
      </ul>
      <div className="mt-auto">
        <p className="text-lg font-semibold text-white">{user?.username}</p>
        <button onClick={authLogout} className="text-white hover:shadow-2xl">
          Logout
        </button>
      </div>
    </div>
  );
}
