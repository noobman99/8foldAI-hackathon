import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const api = process.env.REACT_APP_API_URL;

const RolesOutlet = () => {
    // Dummy data for the applicants (this can be dynamic)
    const [rows, setRows] = useState([]);

    useEffect(() => {
        fetch(`${api}/roles`)
            .then((response) => response.json())
            .then((data) => {
                // convert data to json
                console.log(data);
                setRows(data.msg);
            })
            .catch((error) => {
                console.error("Error:", error);
                alert(error);
            });
    }, []);

    return (
        <>
            <Outlet context={{roles: rows}} />
        </>
    );
    };

export default RolesOutlet;