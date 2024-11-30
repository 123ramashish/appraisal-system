import { useEffect } from "react"; // Import useEffect to run side effects in the component
import { useSelector, useDispatch } from "react-redux"; // Import hooks to interact with Redux state
import { useNavigate } from "react-router-dom"; // Import hook to programmatically navigate between routes
import axios from "axios"; // Import axios for making HTTP requests
import { signoutSuccess } from "../redux/user/userSlice.js"; // Import the action to update user state on signout

export default function Signout() {
  // Use the navigate hook to redirect the user
  const navigate = useNavigate();

  // Get the current user from the Redux store
  const { currentUser } = useSelector((state) => state.user);

  // Get the dispatch function to send actions to the Redux store
  const dispatch = useDispatch();

  // Log a message to the console for debugging purposes
  console.log("signout call");

  // useEffect runs the signout logic when the component mounts or when dependencies change
  useEffect(() => {
    // Define an asynchronous function to handle the signout process
    const handleSignout = async () => {
      // Check if there is no current user
      if (!currentUser) {
        // If there's no user, redirect to the sign-in page
        navigate("/signin");
        return; // Exit the function early
      }

      try {
        // Make a POST request to the signout endpoint
        const res = await axios.post(
          "http://localhost:5173/api/user/signout", // API endpoint for signout
          {}, // No data is sent in the request body
          {
            withCredentials: true, // Include cookies in the request for session management
          }
        );

        // Log the success message from the server response
        console.log("Signout successful:", res.data.message);

        // Dispatch the signoutSuccess action to update the Redux state
        dispatch(signoutSuccess());

        // Redirect the user to the sign-in page after successful signout
        navigate("/signin");
      } catch (error) {
        // Handle any errors that occur during the signout process
        if (error.response) {
          // If the error has a response from the server, log the error message
          console.error("Signout error:", error.response.data.message);
        } else {
          // If there was an error without a response, log the error message
          console.error("Signout failed:", error.message);
        }
      }
    };

    // Call the handleSignout function to execute the signout logic
    handleSignout();
  }, [dispatch, navigate, currentUser]); // Dependencies for useEffect: re-run if these change

  return null; // Optionally, you can return a loading spinner or message here
}
