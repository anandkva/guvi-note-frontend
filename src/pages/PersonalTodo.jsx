import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import {
  createTodo,
  getAllPersonalTodo,
  deletePersonalTodo,
  editPersonalTodo,
} from "../APIs/PersonalTodo";
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

  useEffect(() => {
    handleGetAllTodo();
  }, []);
  const handleGetAllTodo = async () => {
    try {
      const response = await getAllPersonalTodo(token);
      if (response.personalTodos) {
        setAllTodo(response.personalTodos);
      }
    } catch (err) {
      console.log("ERROR:: ", err);
    }
  };
  const handleGoalCreate = async (e) => {
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
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deletePersonalTodo(id, token);
      if (response.code === 1) {
        const updatedTodos = allTodo.filter((todo) => todo._id !== id);
        setAllTodo(updatedTodos);
        toast.success(response.message);
      }
    } catch (err) {
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
    e.preventDefault();
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
    } else {
      toast.error(response.message);
    }
  };

  return (
    <>
      <div className="p-8">
        <div className="text-xl font-bold p-4">My Personal Todo</div>
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
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border border-gray-300">Title</th>
              <th className="py-2 px-4 border border-gray-300">Description</th>
              <th className="py-2 px-4 border border-gray-300">Status</th>
              <th className="py-2 px-4 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allTodo &&
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
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PersonalTodo;
