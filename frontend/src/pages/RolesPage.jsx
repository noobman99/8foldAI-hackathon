import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

const RolesPage = () => {
  // Dummy data for the table
  const headings = ["Position", "Viable Applicants", "Total Applicants"];
  const {roles: rows} = useOutletContext();

  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-8">
      {/* Heading */}
      <div className="relative mb-10">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Employee Positions
        </h1>

        {/* Add Position Button */}
        <div className="mb-4 absolute right-0 top-0">
          <a href="/add-position">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Add New Position
            </button>
          </a>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              {headings.map((heading, index) => (
                <th
                  key={index}
                  className="px-8 py-3 text-left border-b-2 border-gray-300"
                  style={{ maxWidth: "250px", wordBreak: "break-word" }}
                >
                  {heading}
                </th>
              ))}
              <th className="px-8 py-3 text-left border-b-2 border-gray-300">
                    Edit
                </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="bg-white hover:bg-gray-50 hover:cursor-pointer">
                  {row.map((cell, cellIndex) => (
                     <td
                      key={cellIndex}
                      className="px-8 py-4 border-b border-gray-200"
                      style={{ maxWidth: "250px", wordBreak: "break-word" }}
                      onClick={() => navigate("/candidates/" + row[0].split(" ").join("-"))}
                    >
                      {cell}
                    </td>
                  ))}
                  {/* Edit Button */}
                    <td
                        className="px-8 py-4 border-b border-gray-200"
                        style={{ maxWidth: "250px", wordBreak: "break-word" }}
                    >
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => navigate("edit-position")}>
                            Edit
                        </button>
                    </td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RolesPage;
