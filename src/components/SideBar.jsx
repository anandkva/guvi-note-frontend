import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function SideBar() {
  const { authLogout } = useAuth();
  return (
    <div className="bg-blue-500 w-44 p-4">
      <div className="text-white font-bold text-xl mb-11">Guvi Goals</div>
      <ul>
        <li className="mb-2 font-semibold">
          <Link to="/" className="text-white">
            Home
          </Link>
        </li>
        <li className="mb-2 font-semibold">
          <Link to="/my-goal" className="text-white">
            My Goal
          </Link>
        </li>
        <li className="mb-2 font-semibold">
          <Link to="/team-goal" className="text-white">
           Team Goal
          </Link>
        </li>

        <li className="mb-2 font-semibold mt-80">
          <button onClick={authLogout} className="text-white hover:shadow-2xl">
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
