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
      <div className="relative mb-20">
        <h1 className="font-bold text-center" style={{fontSize: "2.7rem"}}>
          Employee Positions
        </h1>

        {/* Add Position Button */}
        <div className="mb-4 absolute right-0 top-1/2" style={{transform: "translateY(-50%)"}}>
          <a href="/add-position">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600">
              Add New Position
            </button>
          </a>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse rounded-2xl overflow-hidden">
          <thead>
            <tr className="bg-slate-100">
              {headings.map((heading, index) => (
                <th
                  key={index}
                  className={"px-8 py-5 text-left border-b-2 border-gray-300 text-center"}
                  style={{ maxWidth: "250px", wordBreak: "break-word" }}
                >
                  {heading}
                </th>
              ))}
              <th className="px-8 py-3 text-left border-b-2 border-gray-300 text-center">
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
                      className={"px-8 py-4 border-b border-gray-200 text-center" }
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
                        <button className="block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mx-auto" onClick={() => navigate("edit-position")}>
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
