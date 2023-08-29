import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../APIs/auth";
import { createGoal } from "../APIs/TeamGoals";
import { useAuth } from "../context/authContext";
import { toast } from "react-toastify";
import MemberSelection from "../components/MemberSelection";

export default function CreateGoalForm() {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [members, setMembers] = useState([]);

  const handleMemberSelection = (memberId) => {
    setSelectedMembers((prevMembers) =>
      prevMembers.includes(memberId)
        ? prevMembers.filter((id) => id !== memberId)
        : [...prevMembers, memberId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userArray = [user.id, ...selectedMembers];
      const filleterArray = userArray.filter(
        (value, index, array) => array.indexOf(value) === index
      );
      const data = {
        title,
        description,
        deadline,
        memberId: filleterArray,
      };
      const response = await createGoal(token, data);
      if (response.code === 1) {
        setTitle("");
        setDescription("");
        setDeadline("");
        setSelectedMembers([]);
        toast.success(response.message);
        navigate("/team-goal");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAllUsersList = async () => {
    try {
      const response = await getAllUsers(token);
      if (response.code === 1) {
        setMembers(response.users);
      } else {
        console.error("Error:: users not fetched");
      }
    } catch (err) {
      console.error("Error:: users not fetched", err);
    }
  };

  useEffect(() => {
    getAllUsersList();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 w-1/3">Create Goal</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="deadline"
            className="block text-sm font-medium text-gray-700"
          >
            Deadline
          </label>
          <input
            type="date"
            id="deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        <MemberSelection
          members={members}
          selectedMembers={selectedMembers}
          handleMemberSelection={setSelectedMembers}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Create
        </button>
        <button
          type="button"
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-900"
          onClick={() => navigate("/team-goal")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
