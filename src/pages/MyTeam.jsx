import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { getGoalByMember } from "../APIs/TeamGoals";
import DateDisplay from "../assets/dateFormat";

const MyTeam = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [teamGoals, setTeamGoals] = useState([]);

  const handleGetAll = async () => {
    try {
      const memberId = user.id;
      const response = await getGoalByMember(token, memberId);
      if (response.code === 1) {
        setTeamGoals(response.teamTodos);
      }
    } catch (error) {
      console.error(response.message);
    }
  };
  useEffect(() => {
    handleGetAll();
  }, []);

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
                  <p className="text-xl font-semibold text-gray-800">
                    {goal.title}
                  </p>
                  <p className="text-gray-600 mt-2 line-clamp-3">
                    {goal.description}
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-sm text-gray-500">
                      DeadLine: <DateDisplay date={goal.deadline} />
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
