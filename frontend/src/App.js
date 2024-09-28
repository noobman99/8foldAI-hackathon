import ApplicantsPageOutlet from "./components/ApplicantsPageOutlet";
import Navbar from "./components/Navbar";
import RolesOutlet from "./components/RolesOutlet";
import ApplicantDetailsPage from "./pages/ApplicantDetailsPage";
import ApplicantsPage from "./pages/ApplicantsPage";
import RolesEditor from "./pages/RolesEditor";
import PositionsPage from "./pages/RolesPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const App = () => {
  const headings = ["Name", "Age", "Location"];
  const rows = [
    ["John Doe", "30", "New York"],
    ["Jay Smith", "25", "San Francisco"],
    ["Sam Brown", "45", "Chicago"],
  ];

  return (
    <div className="w-full mx-auto min-h-screen">
      <Router>
        <Navbar />
        <div className="p-4">
          <Routes>
            <Route
              path="/candidates/:positionId"
              element={<ApplicantsPageOutlet />}
            >
              <Route index element={<ApplicantsPage />} />
              <Route path=":applicantId" element={<ApplicantDetailsPage />} />
            </Route>
            <Route path="/roles" element={<RolesOutlet />}>
              <Route index element={<PositionsPage />} />
              <Route path="new" element={<RolesEditor />} />
              <Route path="edit" element={<RolesEditor edit />} />
            </Route>
            <Route path="*" element={<Navigate to="/roles" />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
