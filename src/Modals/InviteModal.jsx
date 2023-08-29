import { useState } from "react";
import ReactModal from "react-modal";
import { inviteMail } from "../APIs/inviteMail";
import { toast } from "react-toastify";

const InviteModal = ({ isOpen, onClose, setModalOpen }) => {
  const [inviteEmail, setInviteEmail] = useState("");
  const handleInvite = async (e) => {
    e.preventDefault();
    try {
      const data = {
        email: inviteEmail,
      };
      const response = await inviteMail("no-auth", data);

      if (response.code === 1) {
        toast.success(response.message);
        setModalOpen(false);
        setInviteEmail("");
      } else {
        toast.error(response.message);
        setModalOpen(false);
        setInviteEmail("");
      }
    } catch (error) {
      console.log("Error:: ", error);
    }
  };
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Invite Modal"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm">
        <div className="bg-white w-full md:w-1/2 p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Invite Emails</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              Close
            </button>
          </div>
          <form onSubmit={handleInvite}>
            <label className="block mb-2 text-gray-800">Email Addresses:</label>
            <input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter email addresses"
              required
            />
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Invite
            </button>
          </form>
        </div>
      </div>
    </ReactModal>
  );
};

export default InviteModal;
