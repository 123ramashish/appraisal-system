import { useState } from "react"; // Import useState to manage local state
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation after sign-in
import { Card, Label, Spinner, Alert } from "flowbite-react"; // Import UI components from Flowbite
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice.js"; // Import Redux actions for sign-in process
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch and useSelector for Redux state management

// Define the Signin component
export default function Signin() {
  // State to hold form data for email and password
  const [formData, setFormData] = useState({
    email: "", // Initialize email to an empty string
    password: "", // Initialize password to an empty string
  });

  const dispatch = useDispatch(); // Get the dispatch function from Redux
  const { loading, error } = useSelector((state) => state.user); // Get loading and error state from Redux
  const navigate = useNavigate(); // Get the navigate function for redirecting

  // Update form data as user types in the input fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() }); // Update the specific field in formData
  };

  // Handle form submission when the user clicks the submit button
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      dispatch(signInStart()); // Dispatch action to indicate sign-in process has started

      // Make the sign-in request to the server
      const res = await fetch("http://localhost:8000/api/user/signin", {
        method: "POST", // Use POST method for sign-in
        headers: { "Content-Type": "application/json" }, // Set content type to JSON
        body: JSON.stringify(formData), // Convert formData to JSON string for the request body
      });
      const data = await res.json(); // Parse the JSON response from the server

      // Check if the response indicates an error
      if (!res.ok || data.success === false) {
        return dispatch(signInFailure(data.message)); // Dispatch failure action with error message
      }

      // If sign-in is successful, dispatch success action with user data
      dispatch(signInSuccess(data.user));
      navigate("/dashboard"); // Redirect to the dashboard page after successful sign-in
    } catch (error) {
      return dispatch(signInFailure("Something Wrong!")); // Dispatch failure action if an error occurs
    }
  };

  return (
    <section className="py-40 ">
      {/* Card component to hold the sign-in form */}
      <Card className="max-w-md m-auto bg-gray-200 shadow-lg border border-gray-500">
        {/* Heading for the sign-in form */}
        <h1 className=" text-center text-2xl ">Log-In Account</h1>
        {/* Form for user to input email and password */}
        <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
          <div>
            {/* Label for email input */}
            <div className="mb-2 block">
              <Label htmlFor="email" value="Your Email" className=" text-xl" />
            </div>
            {/* Input field for email */}
            <input
              id="email" // Set id to "email" for identification
              type="email" // Input type is email
              placeholder="name@gmail.com" // Placeholder text for the input
              value={formData.email} // Bind input value to formData.email
              onChange={handleChange} // Call handleChange on input change
              required // Make this field required
              className="w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 "
            />
          </div>

          <div>
            {/* Label for password input */}
            <div className="mb-2 block">
              <Label
                htmlFor="password"
                value="Your Password"
                className=" text-xl"
              />
            </div>
            {/* Input field for password */}
            <input
              id="password" // Set id to "password" for identification
              type="password" // Input type is password
              placeholder="Your password" // Placeholder text for the input
              value={formData.password} // Bind input value to formData.password
              onChange={handleChange} // Call handleChange on input change
              required // Make this field required
              className="w-full py-2 border border-gray- 300 rounded-md focus:outline-none focus:ring-2"
            />
          </div>

          {/* Submit button for the form */}
          <button
            type="submit" // Set button type to submit
            disabled={loading} // Disable button if loading is true
            className="bg-cyan-500 p-2 text-xl text-white rounded-md m-auto shadow-lg hover:bg-cyan-700"
          >
            {loading ? ( // Show loading spinner if loading is true
              <>
                <Spinner size="sm" />{" "}
                {/* Spinner component to indicate loading */}
                <span className="pl-2">Loging...</span> {/* Loading text */}
              </>
            ) : (
              "Submit" // Show "Submit" text if not loading
            )}
          </button>

          {/* Display error message if there is an error */}
          {error && (
            <Alert color="failure" className="mt-4">
              {error} {/* Show the error message */}
            </Alert>
          )}
        </form>
      </Card>
    </section>
  );
}
