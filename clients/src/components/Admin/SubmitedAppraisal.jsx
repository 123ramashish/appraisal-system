import { useEffect, useState } from "react"; // Import React, useEffect, and useState for managing component state and lifecycle
import axios from "axios"; // Import axios for making HTTP requests

// Define the SubmittedAppraisal component
export default function SubmittedAppraisal() {
  // State to hold the submitted forms
  const [submittedForms, setSubmittedForms] = useState([]);

  // State to hold any error messages
  const [error, setError] = useState(null);

  // Function to fetch submitted appraisal forms from the server
  const fetchSubmittedForms = async () => {
    setError(null); // Reset any previous error messages
    try {
      // Make a GET request to fetch submitted forms
      const response = await axios.get(
        "http://localhost:8000/api/appraisals/participations"
      );
      // Check if the response status is not 200 OK
      if (response.status !== 200) {
        setError("Something went wrong!"); // Set error message if the response is not OK
        return; // Exit the function early
      }
      console.log(response.data); // Log the response data for debugging
      setSubmittedForms(response.data); // Set the submittedForms state with the fetched data
    } catch (error) {
      console.error("Error fetching appraisal forms:", error); // Log any error that occurs during the fetch
      setError("Failed to fetch appraisal forms."); // Set error message if fetching fails
    }
  };

  // useEffect hook to fetch submitted forms when the component mounts
  useEffect(() => {
    fetchSubmittedForms(); // Call the function to fetch submitted forms
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    // Main container for displaying submitted forms
    <div className="p-6 bg-gray-50 rounded-lg shadow-md max-w-3xl mx-auto mt-12">
      {/* Heading for the submitted forms section */}
      <h2 className="text-2xl font-semibold mb-4">Submitted Forms</h2>
      {/* Display error message if there is an error */}
      {error && (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
          role="alert"
        >
          {error} {/* Show the error message */}
        </div>
      )}
      {/* Check if there are any submitted forms */}
      {submittedForms.length > 0 ? (
        // Map through each submitted form and display its details
        submittedForms.map((item, index) => (
          <div
            key={item._id} // Use unique ID from the submitted form for the key
            className="mb-6 border p-4 rounded-md shadow-sm bg-white"
          >
            {/* Heading for each submission with its index */}
            <h3 className="font-semibold text-lg mb-2">
              Submission {index + 1} {/* Display submission number */}
            </h3>
            {/* Table to display questions and answers */}
            <table className="min-w-full border-collapse border border-gray-300 mb-4">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2">Question</th>{" "}
                  {/* Table header for questions */}
                  <th className="border border-gray-300 p-2">Answer</th>{" "}
                  {/* Table header for answers */}
                </tr>
              </thead>
              <tbody>
                {/* Map through answers to display each question and its corresponding answer */}
                {item.answers.map((answerObj, i) => (
                  <tr key={i}>
                    {" "}
                    {/* Use index as key for each answer row */}
                    <td className="border border-gray-300 p-2">
                      {item.questions[i]}{" "}
                      {/* Access and display the question */}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {answerObj.answers[0]}{" "}
                      {/* Access and display the answer */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-2">
              {/* Map through answers to display user information */}
              {item.answers.map((answerObj, i) => (
                <div key={i}>
                  {" "}
                  {/* Use index as key for each user info section */}
                  <p>
                    <strong>Name:</strong> {answerObj.user.name}{" "}
                    {/* Access and display the user's name */}
                  </p>
                  <p>
                    <strong>Email:</strong> {answerObj.user.email}{" "}
                    {/* Access and display the user's email */}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        // Message to display  when no submitted forms are available
        <p>No submitted forms found.</p>
      )}
    </div>
  );
}
