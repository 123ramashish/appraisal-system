import { Button, Drawer, Sidebar } from "flowbite-react"; // Import UI components from Flowbite
import { useState } from "react"; // Import useState to manage component state
import { HiLogout } from "react-icons/hi"; // Import logout icon
import { HiUserGroup } from "react-icons/hi2"; // Import user group icon
import { FaFileWaveform } from "react-icons/fa6"; // Import file waveform icon
import { IoIosCreate } from "react-icons/io"; // Import create icon
import { IoMenu } from "react-icons/io5"; // Import menu icon
import { Link } from "react-router-dom"; // Import Link for navigation between routes
import ManageParticipante from "../components/Admin/ManageParticipant"; // Import ManageParticipant component
import AppraisalForm from "../components/Admin/AppraisalForm"; // Import AppraisalForm component
import SubmittedAppraisal from "../components/Admin/SubmitedAppraisal"; // Import SubmittedAppraisal component

export default function AdminDashboard() {
  // State to track which component to display
  const [opencom, setOpencom] = useState("Form"); // Default component is "Form"

  // State to control the visibility of the sidebar
  const [isOpen, setIsOpen] = useState(false); // Sidebar is initially closed

  // Function to close the sidebar
  const handleClose = () => setIsOpen(false);

  return (
    <>
      {/* Header section with a button to open the sidebar and a title */}
      <div className="flex items-center justify-around p-4 bg-white shadow-md mt-24">
        {/* Button to open the sidebar when clicked */}
        <Button onClick={() => setIsOpen(true)}>
          <IoMenu /> {/* Display menu icon on the button */}
        </Button>
        {/* Title of the dashboard */}
        <h1 className="text-lg font-bold">Admin Dashboard</h1>
      </div>

      {/* Main layout for the dashboard */}
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Sidebar component wrapped in a Drawer for responsive behavior */}
        <Drawer open={isOpen} onClose={handleClose}>
          {/* Header of the drawer */}
          <Drawer.Header title="Admin Dashboard" titleIcon={() => <></>} />
          <Drawer.Items>
            {/* Sidebar component for navigation */}
            <Sidebar
              aria-label="Sidebar with multi-level dropdown example"
              className="bg-gray-300" // Background color for the sidebar
            >
              <Sidebar.ItemGroup>
                {/* Item for managing participants */}
                <Sidebar.Item
                  icon={HiUserGroup} // Icon for the item
                  onClick={() => {
                    setOpencom("Participants"); // Set the displayed component to Participants
                    setIsOpen(false); // Close the sidebar
                  }}
                >
                  Manage Participants
                </Sidebar.Item>
                {/* Item for creating questions */}
                <Sidebar.Item
                  icon={IoIosCreate} // Icon for the item
                  onClick={() => {
                    setOpencom("Questions"); // Set the displayed component to Questions
                    setIsOpen(false); // Close the sidebar
                  }}
                >
                  Create Questions
                </Sidebar.Item>
                {/* Item for viewing forms */}
                <Sidebar.Item
                  icon={FaFileWaveform} // Icon for the item
                  onClick={() => {
                    setOpencom("Forms"); // Set the displayed component to Forms
                    setIsOpen(false); // Close the sidebar
                  }}
                >
                  View Forms
                </Sidebar.Item>
              </Sidebar.ItemGroup>
              <Sidebar.ItemGroup>
                {/* Link to the signout page */}
                <Link to="/signout">
                  <Sidebar.Item icon={HiLogout}>Logout</Sidebar.Item>{" "}
                  {/* Logout item */}
                </Link>
              </Sidebar.ItemGroup>
            </Sidebar>
          </Drawer.Items>
        </Drawer>

        {/* Main content area where selected component is displayed */}
        <div className="flex-grow p-4">
          {/* Conditionally render components based on the selected state */}
          {opencom === "Participants" && <ManageParticipante />}{" "}
          {/* Show ManageParticipante if selected */}
          {opencom === "Questions" && <AppraisalForm />}{" "}
          {/* Show AppraisalForm if selected */}
          {opencom === "Forms" && <SubmittedAppraisal />}{" "}
          {/* Show SubmittedAppraisal if selected */}
        </div>
      </div>
    </>
  );
}
