import { Avatar, Dropdown, Navbar } from "flowbite-react"; // Import UI components from Flowbite
import { useSelector } from "react-redux"; // Import useSelector to access the Redux state
import { Link } from "react-router-dom"; // Import Link for navigation between routes

export default function Header() {
  // Get the current user from the Redux store
  const { currentUser } = useSelector((state) => state.user);

  return (
    // Create a Navbar component with specific styles
    <Navbar
      fluid // Make the navbar fluid to take full width
      rounded // Round the corners of the navbar
      className="fixed top-0 left-0 w-full z-40 bg-gray-300 shadow-lg" // Set position, size, and styling
    >
      {/* Brand link for the Navbar (currently no content) */}
      <Navbar.Brand href="https://flowbite-react.com"></Navbar.Brand>

      {/* Container for user-related actions, aligned to the right */}
      <div className="flex md:order-2">
        {/* Check if there is a current user logged in */}
        {currentUser ? (
          // If the user is logged in, show a dropdown menu
          <Dropdown
            arrowIcon={false} // Disable the arrow icon for the dropdown
            inline // Display the dropdown inline with the avatar
            label={
              // Display the user's avatar
              <Avatar
                alt="User  settings" // Alt text for the avatar
                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" // Placeholder image URL
                rounded // Make the avatar rounded
              />
            }
          >
            {/* Header section of the dropdown displaying user info */}
            <Dropdown.Header>
              {/* Display the user's name */}
              <span className="block text-sm">{currentUser.name}</span>
              {/* Display the user's email */}
              <span className="block truncate text-sm font-medium">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            {/* Link to the dashboard page */}
            <Link to="/dashboard">
              <Dropdown.Item>Dashboard</Dropdown.Item>
            </Link>
            {/* Divider between menu items */}
            <Dropdown.Divider />
            {/* Link to the signout page */}
            <Link to="/signout">
              <Dropdown.Item>Sign out</Dropdown.Item>
            </Link>
          </Dropdown>
        ) : (
          // If no user is logged in, show a login button
          <a
            href="/signin" // Link to the sign-in page
            className="p-2 rounded-lg shadow-lg text-center bg-cyan-500 hover:bg-cyan-700" // Styling for the login button
          >
            Login
          </a>
        )}
        {/* Button to toggle the navbar (for mobile views) */}
        <Navbar.Toggle />
      </div>

      {/* Collapsible section of the Navbar for additional links */}
      <Navbar.Collapse>
        {/* Link to the home page */}
        <Navbar.Link href="/" active>
          Home
        </Navbar.Link>
        {/* Link to the dashboard page */}
        <Navbar.Link href="/dashboard" active>
          Dashboard
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
