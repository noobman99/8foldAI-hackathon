import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const ApplicantsPageOutlet = () => {
    
    const [applicants, setApplicants] = useState([]);

    useEffect(() => {
        fetch(`${api}/applicants`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setApplicants(data.msg);
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