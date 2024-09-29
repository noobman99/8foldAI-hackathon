import React from "react";
import { useOutletContext, useParams, useSearchParams } from "react-router-dom";
import ApplicantDetails from "../components/ApplicationDetails";
// import samplePDF from './sample.pdf'; // Sample PDF file

const api = process.env.REACT_APP_API_URL;

const ApplicantDetailsPage = () => {
  const { applicantId } = useParams(); // Get the applicant ID from the route
  const [searchparams] = useSearchParams();
  const { applicants } = useOutletContext();

  console.log(searchparams);


  if (!searchparams.size) {
    return <ApplicantDetails applicantId={parseInt(applicantId)} applicant={applicants[applicantId]} />
  }

  return (
    <div className="w-full grid grid-cols-2">
        <ApplicantDetails applicantId={searchparams.get("compare")} applicant={applicants[searchparams.get("compare")]}  isCompare />
        <ApplicantDetails applicantId={parseInt(applicantId)} applicant={applicants[applicantId]} isCompare />
    </div>
  )
};

export default ApplicantDetailsPage;
