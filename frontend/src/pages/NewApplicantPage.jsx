import React, { useState } from "react";

const NewApplicantPage = () => {
  const [resume, setResume] = useState(null); // State for uploaded resume PDF
  const [recommendations, setRecommendations] = useState([]); // State for multiple recommendation files
  const [candidateName, setCandidateName] = useState(""); // State for candidate name
  const [role, setRole] = useState(""); // State for role

  const handleResumeUpload = (e) => {
    setResume(e.target.files[0]);
  };

  const handleRecommendationUpload = (e) => {
    if (e.target.files.length === 0) return;
    if (e.target.files.length + recommendations.length > 5) {
      alert("You can upload a maximum of 5 recommendations");
      return;
    }
    setRecommendations([...recommendations, ...e.target.files]);
  };

  const currentDate = new Date().toISOString().split("T")[0]; // Current date in 'yyyy-MM-dd' format

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-16">Candidate Application Form</h1>

      {/* Form */}
      <form className="grid grid-cols-5 gap-8">
        {/* Upload Resume Section */}
        <div className="col-span-3 grid grid-cols-2 gap-5">
          <div
            className="border p-4 rounded-md shadow-md flex flex-col h-full"
            style={{ height: "31rem" }}
          >
            <label className="block text-lg font-medium my-2 text-center">
              Upload Resume (PDF)
            </label>
            {!resume && (
              <div
                className="relative flex-grow m-4 border-dashed border-blue-300 border-2 rounded-xl flex justify-center items-center text-center"
                style={{ width: "calc(100% - 2rem)" }}
              >
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleResumeUpload}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent absolute top-0 left-0 opacity-0 width-full h-full"
                />
                <div className="text-blue-700">
                  <p className="text-4xl">+</p>
                  <p className="text-lg">Upload File</p>
                </div>
              </div>
            )}
            {resume && (
              <div className="mt-4">
                <div
                  className="border rounded-md p-4"
                  style={{ height: "400px" }}
                >
                  <object
                    data={URL.createObjectURL(resume)}
                    type="application/pdf"
                    width="100%"
                    height="100%"
                  >
                    <p>PDF cannot be displayed</p>
                  </object>
                </div>
              </div>
            )}
          </div>
          {/* Recommendations Section */}
          <div className="border p-4 rounded-md shadow-md flex flex-col h-full">
            <label className="block text-lg font-medium my-2 text-center">
              Upload Recommendations (Multiple TXTs)
            </label>

            {recommendations.length < 5 && (
              <div
                className="flex-grow m-4 relative w-auto border-dashed border-blue-300 border-2 rounded-xl flex justify-center items-center text-center"
                style={{ width: "calc(100% - 2rem)" }}
              >
                <input
                  type="file"
                  accept=".txt"
                  multiple
                  onChange={handleRecommendationUpload}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent absolute top-0 left-0 opacity-0 width-full h-full"
                />
                <div className="text-blue-700">
                  <p className="text-4xl">+</p>
                  <p className="text-lg">Upload Files</p>
                </div>
              </div>
            )}
            {/* List uploaded recommendations */}
            {recommendations.length > 0 && (
              <div className="mt-4 px-3">
                <h3 className="text-lg font-bold mb-2">
                  Uploaded Recommendations:
                </h3>
                <ul className="list-disc ml-6">
                  {recommendations.map((file, index) => (
                    <li key={index} className="mb-2">
                      <a
                        href={URL.createObjectURL(file)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {file.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="col-span-2 flex flex-col h-full justify-around m-0">
          {/* Candidate Name */}
          <div className="border p-4 rounded-md shadow-md">
            <label className="block text-lg font-medium mb-2">
              Candidate Name
            </label>
            <input
              type="text"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              placeholder="Enter candidate's name"
              className="block w-full text-sm border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Date of Upload */}
          <div className="border p-4 rounded-md shadow-md">
            <label className="block text-lg font-medium mb-2">
              Date of Upload
            </label>
            <input
              type="text"
              value={currentDate}
              readOnly
              className="block w-full text-sm border border-gray-300 rounded-md py-2 px-4 bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Role Applying For */}
          <div className="border p-4 rounded-md shadow-md">
            <label className="block text-lg font-medium mb-2">
              Role Applying For
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="block w-full text-sm border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="" disabled>
                Select a role
              </option>
              <option value="Software Engineer">Software Engineer</option>
              <option value="Product Manager">Product Manager</option>
              <option value="Data Analyst">Data Analyst</option>
              <option value="UI/UX Designer">UI/UX Designer</option>
            </select>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Submit Application
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewApplicantPage;
