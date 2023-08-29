import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import {
  createTodo,
  getAllPersonalTodo,
  deletePersonalTodo,
  editPersonalTodo,
} from "../APIs/personalTodo";
import { toast } from "react-toastify";

const PersonalTodo = () => {
  const { user, token } = useAuth();
  const [title, setTitle] = useState("");
  const [todoId, setTodoId] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [isCreate, setIsCreate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [allTodo, setAllTodo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    handleGetAllTodo();
  }, []);
  const handleGetAllTodo = async () => {
    setIsLoading(true);

    try {
      const response = await getAllPersonalTodo(token);
      if (response.personalTodos) {
        setAllTodo(response.personalTodos);
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      console.log("ERROR:: ", err);
    }
  };
  const handleGoalCreate = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const userId = user.id;
      const data = { userId, title, description };
      const response = await createTodo(token, data);

      if (response.code === 1) {
        toast.success(response.message);
        setTitle("");
        setDescription("");
        setIsCreate(false);
        handleGetAllTodo();
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error(response.message);
      }
    } catch (err) {
      setIsLoading(false);
      console.log("Error:", err);
    }
  };

  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      const response = await deletePersonalTodo(id, token);
      if (response.code === 1) {
        const updatedTodos = allTodo.filter((todo) => todo._id !== id);
        setAllTodo(updatedTodos);
        toast.success(response.message);
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      console.error(`Error:: ${err}`);
    }
  };

  const handleEdit = async (data) => {
    setIsEdit(true);
    setTodoId(data._id);
    setTitle(data.title);
    setDescription(data.description);
    setStatus(data.status);
  };

  const handleUpdate = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const id = todoId;
      const data = { id, status, title, description };
      const response = await editPersonalTodo(id, token, data);
      if (response.code === 1) {
        toast.success(response.message);
        setIsEdit(false);
        setTodoId("");
        setTitle("");
        setStatus("");
        setDescription("");
        handleGetAllTodo();
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error(response.message);
      }
    } catch (err) {
      console.log("Error:: ", err);
    }
  };

  return (
    <>
      <div className="p-8">
        <div className="text-xl font-bold p-4">My Personal Goal</div>
        {!isCreate && !isEdit ? (
          <div className="pb-4">
            <button
              onClick={() => setIsCreate(true)}
              type="button"
              className="bg-sky-600 p-2 rounded-lg text-white hover:bg-sky-800 hover:border-black"
            >
              Create Goal
            </button>
          </div>
        ) : isCreate && !isEdit ? (
          <div>
            <form onSubmit={handleGoalCreate}>
              <div className="mb-6 w-1/3">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring"
                  placeholder="Title"
                  required
                />
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring"
                  placeholder="Description"
                  required
                />
                <button className="mt-3 text-white bg-sky-600 hover:bg-sky-800 rounded-md p-2">
                  Add Goal
                </button>
                <button
                  className="mt-3 ml-2 text-gray-500 hover:underline"
                  type="button"
                  onClick={() => setIsCreate(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : null}
        {isEdit ? (
          <form onSubmit={handleUpdate}>
            <div className="mb-6 w-1/3">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring"
                placeholder="Title"
                required
              />
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring"
                placeholder="Description"
                required
              />
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring"
                required
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
              <button className="mt-3 text-white bg-sky-600 hover:bg-sky-800 rounded-md p-2">
                Edit Goal
              </button>
              <button
                className="mt-3 ml-2 text-gray-500 hover:underline"
                type="button"
                onClick={() => {
                  setTodoId("");
                  setTitle("");
                  setStatus("");
                  setDescription("");
                  setIsEdit(false);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : null}
        <div
          className="overflow-x-auto max-w-full"
          style={{ maxWidth: "100%", overflowX: scroll }}
        >
          <table
            className="min-w-full border border-gray-300"
            style={{ maxWidth: "100%", overflowX: scroll }}
          >
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border border-gray-300">Title</th>
                <th className="py-2 px-4 border border-gray-300">
                  Description
                </th>
                <th className="py-2 px-4 border border-gray-300">Status</th>
                <th className="py-2 px-4 border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="py-4 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500 mx-auto"></div>
                  </td>
                </tr>
              ) : (
                allTodo &&
                allTodo.map((data) => {
                  return (
                    <tr className="hover:bg-gray-50 text-center" key={data._id}>
                      <td className="py-2 px-4 border border-gray-300">
                        {data.title}
                      </td>
                      <td className="py-2 px-4 border border-gray-300">
                        {data.description}
                      </td>
                      <td className="py-2 px-4 border border-gray-300 capitalize">
                        {data.status}
                      </td>
                      <td className="py-2 px-4 border border-gray-300">
                        <button
                          onClick={() => handleEdit(data)}
                          className="text-blue-500 pr-5 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(data._id)}
                          className="text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PersonalTodo;
