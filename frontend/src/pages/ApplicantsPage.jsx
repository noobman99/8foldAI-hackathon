import React, { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";

const api = process.env.REACT_APP_API_URL;

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
      <div className="relative mb-20">
        <h1 className="font-bold text-center" style={{ fontSize: "2.7rem" }}>
          Applicants for {positionId.split("-").join(" ")}
        </h1>

        {/* Add Position Button */}
        <div
          className="mb-4 absolute right-0 top-1/2"
          style={{ transform: "translateY(-50%)" }}
        >
          <Link to={location.pathname + "/new"}>
            <button className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600">
              Add New Applicant
            </button>
          </Link>
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
            </tr>
          </thead>
          <tbody>
            {rows.sort((a, b) => parseInt(b[1]) - parseInt(a[1])).map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={"px-8 py-4 border-b border-gray-200 text-center hover:cursor-pointer hover:bg-gray-50" }
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
