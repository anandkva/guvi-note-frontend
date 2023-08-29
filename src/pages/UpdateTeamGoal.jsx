import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTeamGoalById, updateTeamTodo } from "../APIs/TeamGoals";
import { useAuth } from "../context/authContext";
import { getAllUsers } from "../APIs/auth";
import { toast } from "react-toastify";

const EditTeamGoal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [goal, setGoal] = useState({});
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [comment, setComment] = useState("");
  const [deadline, setDeadline] = useState("");
  const [members, setMembers] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        title,
        status,
        description,
        deadline,
        comment,
        members: selectedMembers,
      };
      const response = await updateTeamTodo(token, id, data);
      if (response.code === 1) {
        toast.success(response.message);
        navigate("/team-goal");
      }
    } catch (error) {
      console.error("Error:: ", error);
    }
  };

  const handleMemberSelection = (memberId) => {
    setSelectedMembers((prevMembers) =>
      prevMembers.includes(memberId)
        ? prevMembers.filter((id) => id !== memberId)
        : [...prevMembers, memberId]
    );
  };

  const getTeamGoal = async () => {
    try {
      const response = await getTeamGoalById(token, id);
      if (response.code === 1) {
        setGoal(response.teamTodo);
        setTitle(response.teamTodo.title);
        setStatus(response.teamTodo.status);
        setDescription(response.teamTodo.description);
        setDeadline(response.teamTodo.deadline.substr(0, 10));
        setMembers(response.teamTodo.members);
        setSelectedMembers(response.teamTodo.members);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUsersList = async () => {
    try {
      const response = await getAllUsers(token);
      if (response.code === 1) {
        setUsers(response.users);
      } else {
        console.error("Error:: users not fetched");
      }
    } catch (err) {
      console.error("Error:: users not fetched", err);
    }
  };

  useEffect(() => {
    getTeamGoal();
    getAllUsersList();
  }, []);

  return (
    <div
      className="max-w-3xl mx-auto grid grid-cols-2 gap-8 p-6 bg-white rounded shadow overflow-scroll"
      style={{ maxHeight: "90vh" }}
    >
      <div>
        <h2 className="text-xl font-semibold mb-4">Edit Team Goal</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full p-2 border rounded"
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
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Select status</option>
              <option value="pending">pending</option>
              <option value="inProgress">in Progress</option>
              <option value="complete">Completed</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              comments
            </label>
            <input
              type="text"
              name="comments"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="comments"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4 overflow-y-scroll max-h-40">
            <label className="block text-sm font-medium text-gray-700">
              Select Members
            </label>
            <div className="space-y-2">
              {users.map((member) => (
                <label key={member._id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedMembers.includes(member._id)}
                    onChange={() => handleMemberSelection(member._id)}
                    className="mr-2"
                  />
                  {member.username}
                </label>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Update Goal
          </button>
        </form>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Preview Comments</h2>
        <div className="border p-2 rounded max-h-40 md:max-h-[20rem] overflow-y-scroll">
          <ul>
            {goal.comments &&
              goal.comments.map((comment, index) => {
                const user = users.find((val) => val._id === comment.memberId);
                const username = user ? user.username : "Unknown User";

                return (
                  <li key={index} className="mb-2">
                    {username} {"-->"} {comment.text}
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EditTeamGoal;
