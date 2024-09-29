import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";

const ApplicantDetails = ({ applicantId, isCompare = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const {applicants} = useOutletContext();

  const [details, setDetails] = useState({});

  const compare = () => {
    const prefix = location.pathname.split("/").slice(0, -1).join("/");
    navigate(`${prefix}?compare=${applicantId}`);
  };

  // Get the applicant details from the context

  var text_color = useMemo(() => {
    if (parseInt(details.finalScore) >= 90) {
      return "text-green-500";
    } else if (parseInt(details.finalScore) >= 50) {
      return "text-orange-500";
    } else {
      return "text-red-600";
    }
  }, [details]);

  // Dummy data for the sections
  const skills = ["JavaScript", "React", "Node.js", "MongoDB"];

  const workExperience = [
    "Software Engineer at XYZ Corp",
    "Frontend Developer at ABC Inc",
  ];

  const recommendations = [
    { recommendation: "Highly recommended by John Doe", trustScore: "95%" },
    { recommendation: "Endorsed by Jane Smith", trustScore: "90%" },
  ];

  const connections = ["John Doe", "Jane Smith", "Sam Brown"];

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/application/${applicantId}`)
      .then((response) => response.json())
      .then((data) => setDetails(data.msg))
      .catch((e) => console.log(e));
  }, [applicantId]);

  console.log(details)

  return (
    <div className={"py-8 px-4" + (isCompare ? "w-1/2 br-2" : "w-full")}>
      <div className={isCompare ? "" : `grid grid-cols-5 gap-8`}>
        {/* Left column: PDF viewer */}
        <div className="col-span-3">
          <object
            data={process.env.REACT_APP_BASE_URL + details.resume}
            type="application/pdf"
            width="95%"
            height={isCompare ? "500" : "100%"}
            className="mx-auto"
          />
        </div>

        {/* Right column: Sections */}
        <div className="col-span-2 p-4">
          <div className="relative mb-10">
            <h1 className="text-4xl font-bold mb-4 text-center">
              {details.name}
            </h1>
            <h3
              className={`text-xl font-semibold mb-2 text-center ${text_color}`}
            >
              Score: {details.finalScore}
            </h3>
          </div>

          {/* Skills Section */}
          <div
            className="mb-6 p-8 bg-white rounded-2xl"
            style={{
              boxShadow:
                "0 0 10px rgba(0,0,0, 0.2), -5px 5px 10px rgba(0,0,0,0.1)",
            }}
          >
            <h2 className="text-xl font-bold mb-2">Skills</h2>
            <ul className="list-disc ml-6">
              {skills.map((skill, index) => (
                <li key={index} className="mb-2">
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Work Experience Section */}
          {/* add box shadow to the div */}
          <div
            className="mb-6 p-8 bg-white rounded-2xl"
            style={{
              boxShadow:
                "0 0 10px rgba(0,0,0, 0.2), -5px 5px 10px rgba(0,0,0,0.1)",
            }}
          >
            <h2 className="text-xl font-bold mb-2">Work Experience</h2>
            <ul className="list-disc ml-6">
              {workExperience.map((exp, index) => (
                <li key={index} className="mb-2">
                  <span>{exp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommendations Section */}
          <div
            className="mb-6 p-8 bg-white rounded-2xl"
            style={{
              boxShadow:
                "0 0 10px rgba(0,0,0, 0.2), -5px 5px 10px rgba(0,0,0,0.1)",
            }}
          >
            <h2 className="text-xl font-bold mb-2">Recommendations</h2>
            <ul className="list-disc ml-6">
              {details.recommendation && details.recommendation.map((rec, index) => (
                <li key={index} className="mb-2">
                  <a href={process.env.REACT_APP_BASE_URL + rec} target="_blank">
                    <span>Recommentation {index}</span>
                  </a>
                  <span className="text-sm text-gray-600 ml-2">
                    Trust Score: {rec.trustScore}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Connections Section */}
          <div
            className="mb-6 p-8 bg-white rounded-2xl"
            style={{
              boxShadow:
                "0 0 10px rgba(0,0,0, 0.2), -5px 5px 10px rgba(0,0,0,0.1)",
            }}
          >
            <h2 className="text-xl font-bold mb-2">Connections</h2>
            <ul className="list-disc ml-6">
              {connections.map((connection, index) => (
                <li key={index} className="mb-2">
                  <span>{connection}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            className="block bg-blue-500 text-white font-bold px-8 py-4 mx-auto rounded-xl hover:bg-blue-600"
            onClick={compare}
          >
            Compare
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicantDetails;
