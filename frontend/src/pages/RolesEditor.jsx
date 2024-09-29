import { useState } from "react";
import { useNavigate } from "react-router-dom";

const api = process.env.REACT_APP_API_URL;

const RolesEditor = () => {
    const [roleName, setRoleName] = useState("");
    const [expectations, setExpectations] = useState(["", "", ""]);

    const navigate = useNavigate();

    const handleRoleNameChange = (e) => {
        setRoleName(e.target.value);
    };

    const handleExpectationChange = (e, index) => {
        const newExpectations = [...expectations];
        newExpectations[index] = e.target.value;
        setExpectations(newExpectations);
    };

    const handleSave = () => {

        // check if role name is empty
        if (!roleName) {
            alert("Role name cannot be empty");
            return;
        }
        // check if at least on expectation is present
        if (expectations.filter((exp) => exp.trim() !== "").length === 0) {
            alert("Please enter at least one expectation");
            return;
        }
        // handle fetch errors
        fetch(`${api}/roles`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: roleName,
                expectations,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                // redirect to roles page
                navigate("/roles");
                alert("Role created successfully");
            })
            .catch((error) => {
                console.error("Error:", error);
                alert(error);
            }
        );
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <h1 className="text-4xl font-semibold text-gray-800 mb-4">
                Create a new role
            </h1>
            <div className="border p-4 rounded-md shadow-md mb-4">
                <label className="block text-lg font-medium mb-2">
                    Role Name
                </label>
                <input
                    type="text"
                    value={roleName}
                    onChange={handleRoleNameChange}
                    placeholder="Enter role name"
                    className="block w-full text-sm border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
            <div className="border p-4 rounded-md shadow-md mb-4">
                <label className="block text-lg font-medium mb-2">
                    Expectations
                </label>
                {expectations.map((expectation, index) => (
                    <input
                        key={index}
                        type="text"
                        value={expectation}
                        onChange={(e) => handleExpectationChange(e, index)}
                        placeholder={`Enter expectation ${index + 1}`}
                        className="block w-full text-sm border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
                    />
                ))}
            </div>
            <button
                onClick={handleSave}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
            >
                Save
            </button>
        </div>
    );
}

export default RolesEditor;