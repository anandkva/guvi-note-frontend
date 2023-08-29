import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { deleteTeamTodo, getGoalByMember } from "../APIs/TeamGoals";
import DateDisplay from "../assets/dateFormat";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const MyTeam = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [teamGoals, setTeamGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetAll = async () => {
    setIsLoading(true);
    try {
      const memberId = user.id;
      const response = await getGoalByMember(token, memberId);
      if (response.code === 1) {
        setTeamGoals(response.teamTodos);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error(response.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const todoId = id;
      const response = await deleteTeamTodo(token, todoId);
      if (response.code === 1) {
        toast.success(response.message);
        handleGetAll();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    handleGetAll();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Ticket List</h1>
          <Link
            to="/create-goal"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 ease-in-out"
          >
            Create
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {teamGoals &&
            teamGoals.map((goal) => (
              <div
                key={goal._id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-300 ease-in-out"
              >
                <div>
                  <p className="text-3xl font-semibold text-gray-800 capitalize">
                    {goal.title}
                  </p>
                  <p className="text-gray-600 mt-2 line-clamp-3">
                    {goal.description}
                  </p>
                  <p className="text-lg text-gray-500 font-bold">
                    Deadline:{" "}
                    <span
                      className={`text-lg font-semibold font-semibold ${
                        goal.deadline < Date.now()
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      <DateDisplay date={goal.deadline} />
                    </span>
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-sm text-gray-500">
                      Created by:{" "}
                      <span className="font-bold text-emerald-600">
                        {goal.created.by.username}
                      </span>{" "}
                      <br />
                      Created at: <DateDisplay date={goal.created.at} />{" "}
                    </p>
                    <span
                      className={`text-sm font-semibold ${
                        goal.status === "complete"
                          ? "text-green-600"
                          : goal.status === "inProgress"
                          ? "text-blue-700"
                          : "text-red-600"
                      }`}
                    >
                      {goal.status}
                    </span>
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    onClick={() => navigate(`/edit-goal/${goal._id}`)}
                    className="bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-700 transition-colors duration-300 ease-in-out"
                  >
                    Open
                  </button>{" "}
                  <button
                    onClick={() => handleDelete(goal._id)}
                    className="bg-red-700 text-white py-1 px-3 rounded-md hover:bg-red-900 transition-colors duration-300 ease-in-out"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MyTeam;
