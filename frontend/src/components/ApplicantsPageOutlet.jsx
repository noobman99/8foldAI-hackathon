import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

const ApplicantsPageOutlet = () => {
    
    const [applicants, setApplicants] = useState([]);
    const location = useLocation();

    const role = location.pathname.split("/").slice(-1)[0];  

    const api = process.env.REACT_APP_API_URL;

    useEffect(() => {
        fetch(`${api}/roles/${role}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setApplicants(data.msg.map((applicant) => [applicant.name, applicant.score, applicant.appliedOn.split('T')[0], applicant.id]));
            })
            .catch((error) => {
                console.error("Error:", error);
                alert(error);
            });
    }, []);

    return (
        <>
            <Outlet context={{applicants}} />
        </>
    );
    };

export default ApplicantsPageOutlet;