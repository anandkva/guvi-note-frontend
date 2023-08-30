import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { Link } from "react-router-dom";
import InviteModal from "../Modals/InviteModal";

export default function Home() {
  const { user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className="bg-blue-500 py-16">
        <div className="container mx-auto text-center text-white">
          <h1 className="text-4xl font-bold mb-4 capitalize">
            welcome, {user?.username}
          </h1>
          <p className="text-lg mb-8">
            This Guvi Goal App can be set to personal and Team goals.
          </p>
          <Link
            to="/my-goal"
            className="bg-white text-blue-700 py-2 px-6 rounded-full font-semibold hover:bg-blue-100 transition duration-300"
          >
            Set Goal
          </Link>
       
          <button
            className="bg-green-600 text-white py-2 px-6 rounded-full font-semibold hover:bg-green-700 transition duration-300"
            onClick={openModal}
          >
            Invite
          </button>
        </div>
      </div>
      <div className="container mx-auto p-8">
        <InviteModal isOpen={modalOpen} onClose={closeModal} setModalOpen={setModalOpen} />
      </div>
    </>
  );
}
