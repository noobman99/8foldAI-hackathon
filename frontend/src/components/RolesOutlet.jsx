import { Outlet } from "react-router-dom";

const RolesOutlet = () => {
    // Dummy data for the applicants (this can be dynamic)
    const rows = [
        ["Software Engineer", "5", "20"],
        ["Product Manager", "3", "12"],
        ["Data Analyst", "2", "8"],
        ["Sales Associate", "4", "15"],
        ["Marketing Specialist", "1", "5"],
      ];


    return (
        <>
            <Outlet context={{roles: rows}} />
        </>
    );
    };

export default RolesOutlet;