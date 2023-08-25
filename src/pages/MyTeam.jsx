import React from "react";

export default function MyTeam() {
  return (
    <div className="p-8">
      <div className="text-xl font-bold p-4">My Team Todo</div>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border border-gray-300">Task</th>
            <th className="py-2 px-4 border border-gray-300">Status</th>
            <th className="py-2 px-4 border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-50">
            <td className="py-2 px-4 border border-gray-300">Buy groceries</td>
            <td className="py-2 px-4 border border-gray-300">Incomplete</td>
            <td className="py-2 px-4 border border-gray-300">
              <button className="text-blue-500 pr-5 hover:underline">
                Edit
              </button>
              <button className="text-red-500 hover:underline">Delete</button>
            </td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="py-2 px-4 border border-gray-300">
              Finish project report
            </td>
            <td className="py-2 px-4 border border-gray-300">Complete</td>
            <td className="py-2 px-4 border border-gray-300">
              <button className="text-blue-500 pr-5 hover:underline">
                Edit
              </button>
              <button className="text-red-500 hover:underline">Delete</button>
            </td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
}
