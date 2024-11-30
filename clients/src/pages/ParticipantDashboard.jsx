import { useEffect, useState } from "react"; // Import React, useEffect, and useState for managing component state and lifecycle
import { Button } from "flowbite-react"; // Import Button component from Flowbite for styling
import { useSelector } from "react-redux"; // Import useSelector to access Redux store state
import axios from "axios"; // Import axios for making HTTP requests

// Define the JuniorsDashboard component
export default function ParticipantDashboard() {
  // Get the current user's information from the Redux store
  const { currentUser } = useSelector((state) => state.user);

  // State to control whether to show the form or the submitted forms
  const [seeForm, setSeeForm] = useState(true);

  // State to hold any error messages
  const [error, setError] = useState(null);

  // State to hold the submitted forms for the current user
  const [submittedForm, setSubmittedForm] = useState([]);

  // State to hold the questions for the appraisal form
  const [formData, setFormData] = useState([]);

  // State to hold the new form data to be submitted
  const [newFormData, setNewFormData] = useState({
    answers: [], // Array to hold answers for the questions
    appraisalId: "", // ID for the appraisal
    email: "", // Email of the current user
  });

  // Fetch appraisal forms when the component mounts
  useEffect(() => {
    const fetchForms = async () => {
      try {
        // Make a GET request to fetch appraisal forms
        const response = await axios.get(
          "http://localhost:8000/api/appraisals/"
        );
        // Check if the response status is not 200 OK
        if (response.status !== 200) {
          alert("Something went wrong!"); // Alert the user if there is an error
          return; // Exit the function early
        }
        newFormData.appraisalId = response.data._id; // Get the appraisal ID from the response

        // Set the questions from the response data
        setFormData(response.data.questions); // Assuming response.data contains { questions: [...] }
      } catch (error) {
        console.error("Error fetching appraisal forms:", error); // Log any error that occurs during the fetch
        alert("Failed to fetch appraisal forms."); // Alert the user if fetching fails
      }
    };
    fetchForms(); // Call the function to fetch forms
  }, []); // Empty dependency array means this runs once when the component mounts

  // Fetch submitted forms for the current user
  useEffect(() => {
    const fetchSubmittedForms = async () => {
      try {
        // Make a GET request to fetch submitted forms for the current user
        const response = await axios.get(
          `http://localhost:8000/api/appraisals/participate?email=${currentUser.email}`
        );
        // Check if the response status is not 200 OK
        if (response.status !== 200) {
          alert("Something went wrong!"); // Alert the user if there is an error
          return; // Exit the function early
        }
        console.log("paticiap", response.data); // Log the submitted forms data for debugging
        setSubmittedForm(response.data); // Set the submitted forms state with the fetched data
      } catch (error) {
        console.error("Error fetching submitted forms:", error); // Log any error that occurs during the fetch
        alert("Failed to fetch submitted forms."); // Alert the user if fetching fails
      }
    };
    fetchSubmittedForms(); // Call the function to fetch submitted forms
  }, [currentUser.email]); // Depend on currentUser .email to refetch if the email changes

  // Handle form submission when the user submits the form
  const handleSubmit = async (e) => {
    setError(null); // Reset any previous error messages
    console.log(formData); // Log the form data for debugging
    e.preventDefault(); // Prevent default form submission behavior
    newFormData.email = currentUser.email; // Set email to the current user's email

    try {
      // Make a POST request to submit the new form data
      const response = await axios.post(
        "http://localhost:8000/api/appraisals/submit",
        newFormData
      );
      // Check if the response status is not 200 OK
      if (response.status !== 200) {
        alert("Something went wrong!"); // Alert the user if there is an error
        const errorData = response.json(); // Try to get error details
        setError(errorData); // Set the error state with the error details return; // Exit the function early
      }
      alert("Form submitted successfully!"); // Alert the user on successful submission
      setNewFormData({ answers: [], appraisalId: "", email: "" }); // Reset the form data
      setError(null); // Clear any error messages
    } catch (err) {
      console.error("Error submitting form:", err); // Log any error that occurs during submission
      setError("Something went wrong!"); // Set a generic error message
    }
  };

  return (
    // Main container for the dashboard
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-24">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        {/* Buttons to toggle between submitting a form and viewing submitted forms */}
        <div className="flex flex-wrap gap-12 justify-center items-center mb-6">
          <Button onClick={() => setSeeForm(true)}>Submit Form</Button>{" "}
          {/* Button to show the form */}
          <Button onClick={() => setSeeForm(false)}>
            View Submitted Form
          </Button>{" "}
          {/* Button to show submitted forms */}
        </div>

        {/* Render the form for submission if seeForm is true */}
        {seeForm && (
          <form onSubmit={handleSubmit}>
            <div>
              {/* Map through the formData to display each question */}
              {formData.map((question, index) => (
                <div key={index} className="mb-4">
                  <label htmlFor={`question${index}`} className="block mb-2">
                    {question} {/* Display the question */}
                  </label>
                  <input
                    type="text" // Input field for the answer
                    onChange={(e) => {
                      const updatedAnswers = [...newFormData.answers]; // Create a copy of the current answers
                      updatedAnswers[index] = e.target.value; // Update the answer for the specific question
                      setNewFormData((prev) => ({
                        ...prev,
                        answers: updatedAnswers, // Update the answers in the state
                      }));
                    }}
                    required // Make this field required
                    className="border border-gray-300 rounded-md p-2 w-full" // Styling for the input
                  />
                </div>
              ))}
              <Button type="submit" className="w-full">
                Submit
              </Button>{" "}
              {/* Button to submit the form */}
            </div>
            {/* Display error message if there is an error */}
            {error && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {error} {/* Show the error message */}
              </div>
            )}
          </form>
        )}

        {/* Render submitted forms if seeForm is false */}
        {!seeForm && (
          <div>
            {/* Check if there are any submitted forms */}
            {submittedForm.length > 0 ? (
              // Map through each submitted form and display its details
              submittedForm.map((item, index) => (
                <div key={index} className="mb-6">
                  <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                      <tr>
                        <th className="border border-gray-300 p-2">Question</th>{" "}
                        {/* Table header for questions */}
                        <th className="border border-gray-300 p-2">
                          Answer
                        </th>{" "}
                        {/* Table header for answers */}
                      </tr>
                    </thead>
                    <tbody>
                      {/* Map through answers to display each question and its corresponding answer */}
                      {item.answers.map((answer, i) => (
                        <tr key={i}>
                          <td className="border border-gray-300 p-2">
                            {formData[i]} {/* Display the question */}
                          </td>
                          <td className="border border-gray-300 p-2">
                            {answer} {/* Display the answer */}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="mt-2">
                    <p>Name: {item.user.name}</p>{" "}
                    {/* Display the user's name */}
                    <p>Email: {item.user.email}</p>{" "}
                    {/* Display the user's email */}
                  </div>
                </div>
              ))
            ) : (
              <p>No submitted forms found.</p> // Message when no submitted forms are available
            )}
          </div>
        )}
      </div>
      {/* Display error message if there is an error */}
      {error && (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray -800 dark:text-red-400"
          role="alert"
        >
          {error} {/* Show the error message */}
        </div>
      )}
    </div>
  );
}
