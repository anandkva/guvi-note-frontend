import React from "react";

export default function MyTeam() {
  return (
    <>
      <div className="text-xl font-bold pl-6 pt-14">My Team Todo</div>

      <div className="flex flex-row">
        <div className="basis-1/4">
          <div className="pl-6 pt-2">
            <button
              type="button"
              className="bg-sky-600 p-2 rounded-lg text-white hover:bg-sky-800 hover:border-black"
            >
              Create Team
            </button>
          </div>
          <div className="p-8">
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 border border-gray-300">Team Name</th>
                </tr>
              </thead>
              <tbody className="hover:cursor-pointer">
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-4 border border-gray-300">
                    Buy groceries
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-4 border border-gray-300">
                    Buy groceries
                  </td>
                </tr>{" "}
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-4 border border-gray-300">
                    Buy groceries
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="basis-1/2">
          <div className="pl-6 pt-2">
            <button
              type="button"
              className="bg-sky-600 p-2 rounded-lg text-white hover:bg-sky-800 hover:border-black"
            >
              Create Team Goal
            </button>
          </div>
          <div className="p-8">
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
                  <td className="py-2 px-4 border border-gray-300">
                    Buy groceries
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    Incomplete
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    <button className="text-blue-500 pr-5 hover:underline">
                      Edit
                    </button>
                    <button className="text-red-500 hover:underline">
                      Delete
                    </button>
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
                    <button className="text-red-500 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
