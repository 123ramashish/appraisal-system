import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Router and Route components for routing
import { useSelector } from "react-redux"; // Import useSelector to access Redux state
import AdminDashboard from "./pages/AdminDashboard"; // Import AdminDashboard component
import SupervisorDashboard from "./pages/SupervisorDashboard"; // Import SupervisorDashboard component
import PeersDashboard from "./pages/PeersDashboard"; // Import PeersDashboard component
import JuniorsDashboard from "./pages/JuniorsDashboard"; // Import JuniorsDashboard component
import ParticipantDashboard from "./pages/ParticipantDashboard"; // Import ParticipantDashboard component
import Home from "./pages/Home"; // Import Home component
import Header from "./components/Header"; // Import Header component for the top navigation
import Signin from "./pages/Signin"; // Import Signin component for user sign-in
import Signout from "./components/Signout"; // Import Signout component for user sign-out

// Define the main App component
const App = () => {
  // Get the current user from the Redux store
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser); // Log the current user for debugging

  return (
    <Router>
      {" "}
      {/* Wrap the application in the Router component for routing */}
      <Header /> {/* Render the Header component */}
      <Routes>
        {" "}
        {/* Define the routes for the application */}
        <Route path="/" element={<Home />} /> {/* Route for the home page */}
        <Route path="/signin" element={<Signin />} />{" "}
        {/* Route for the sign-in page */}
        <Route path="/signout" element={<Signout />} />{" "}
        {/* Route for the sign-out page */}
        <Route
          path="/dashboard"
          element={getDashboardElement(currentUser)}
        />{" "}
        {/* Route for the dashboard, dynamically rendering based on user role */}
      </Routes>
    </Router>
  );
};

// Function to determine which dashboard to display based on user role
const getDashboardElement = (user) => {
  // Check if the user is not logged in
  if (!user) {
    return (
      <div className="flex items-center justify-center m-auto">
        Please sign in to access your dashboard.{" "}
        {/* Message prompting user to sign in */}
      </div>
    );
  }

  // Switch statement to render the appropriate dashboard based on user role
  switch (user.role) {
    case "admin": // If user role is admin
      return <AdminDashboard />; // Render AdminDashboard
    case "supervisor": // If user role is supervisor
      return <SupervisorDashboard />; // Render SupervisorDashboard
    case "peer": // If user role is peer
      return <PeersDashboard />; // Render PeersDashboard
    case "junior": // If user role is junior
      return <JuniorsDashboard />; // Render JuniorsDashboard
    case "participant": // If user role is participant
      return <ParticipantDashboard />; // Render ParticipantDashboard
    default: // If user role is not recognized
      return <div>Invalid role</div>; // Display an invalid role message
  }
};

// Export the App component as the default export
export default App;
