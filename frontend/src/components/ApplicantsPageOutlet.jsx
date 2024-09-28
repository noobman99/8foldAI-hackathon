import { Outlet } from "react-router-dom";

const ApplicantsPageOutlet = () => {
    // Dummy data for the applicants (this can be dynamic)
    const applicants = [
        [ "John Doe", "45%",  "2023-08-15" ],
        [ "Jane Smith", "92%",  "2023-08-17" ],
        [ "Sam Brown", "78%", "2023-08-19" ],
    ];


    return (
        <>
            <Outlet context={{applicants}} />
        </>
    );
    };

export default ApplicantsPageOutlet;