import React, { useState } from "react";
import {
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";

const ApplicantsPage = () => {
  const { positionId } = useParams(); // Get the position ID from the route
  const location = useLocation();
  const navigate = useNavigate();
  const { applicants: rows } = useOutletContext();

  const nav = (to) => {
    const prefix = location.pathname;
    const search = location.search;
    console.log(prefix);
    var path = `${prefix}/${to}`;
    if (search) {
      path += search;
    }
    navigate(path);
  };

  const headings = ["Name of Person", "Viability Score", "Applied On"];

  return (
    <div className="container mx-auto p-8">
      {/* Heading */}
      <h1 className="text-3xl font-bold mb-6 text-center">
        Applicants for {positionId.split("-").join(" ")}
      </h1>

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
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="bg-white hover:bg-gray-50 hover:cursor-pointer"
                onClick={() => nav(rowIndex)}
              >
                {row.map((cell, cellIndex) => {
                  let textColor = "text-black";

                  if (cellIndex === 1) {
                    if (parseInt(cell) < 50) {
                      textColor = "text-red-600";
                    } else if (parseInt(cell) > 50 && parseInt(cell) < 90) {
                      textColor = "text-orange-500";
                    } else if (parseInt(cell) > 90) {
                      textColor = "text-green-500";
                    }
                  }
                  return (
                    <td
                      key={cellIndex}
                      className={`px-8 py-4 border-b border-gray-200 ${textColor}`}
                      style={{ maxWidth: "250px", wordBreak: "break-word" }}
                    >
                      {cell}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicantsPage;
