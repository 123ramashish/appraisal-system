import { useState } from "react"; // Import useState to manage local state
import axios from "axios"; // Import axios for making HTTP requests

// Define the AppraisalForm component
export default function AppraisalForm() {
  // State to hold the list of questions
  const [questions, setQuestions] = useState([]);

  // State to hold the current question input by the user
  const [currentQuestion, setCurrentQuestion] = useState("");

  // State to hold any error messages
  const [error, setError] = useState(null);

  // Update the current question as the user types
  const handleQuestionChange = (e) => {
    setCurrentQuestion(e.target.value); // Set currentQuestion to the input value
  };

  // Add the current question to the list of questions
  const handleAddQuestion = () => {
    if (currentQuestion.trim()) {
      // Check if the current question is not empty
      setQuestions([...questions, currentQuestion]); // Add the current question to the list
      setCurrentQuestion(""); // Clear the input field after adding the question
    } else {
      alert("Please enter a question."); // Alert the user to enter a question if the input is empty
    }
  };

  // Remove a question from the list by its index
  const handleRemoveQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index); // Filter out the question at the specified index
    setQuestions(updatedQuestions); // Update the questions state with the filtered list
  };

  // Handle form submission when the user clicks the submit button
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    console.log("Questions submitted: ", questions); // Log the submitted questions
    setError(null); // Reset any previous error messages
    try {
      // Make a POST request to submit the questions
      const response = await axios.post(
        "http://localhost:8000/api/appraisals", // API endpoint for creating appraisals
        { questions }, // Wrap questions in an object to send in the request body
        {
          headers: {
            "Content-Type": "application/json", // Set content type to JSON
          },
        }
      );

      // Check if the response status is not 201 Created
      if (response.status !== 201) {
        console.error("Error response:", response); // Log the error response
        setError(
          response.data.message || "Error creating AppraisalForm, try again!" // Set error message from response or a default message
        );
        return; // Exit the function if there is an error
      }

      // If successful, log the response data
      console.log("data", response.data);
      alert("Appraisal Form created successfully!"); // Alert the user of successful creation
      setQuestions([]); // Clear the questions state after successful submission
    } catch (err) {
      console.error("Network error:", err); // Log any network error
      setError("Network error. Please try again."); // Set a network error message
    }
  };

  return (
    // Main container for the appraisal form
    <div className="bg-gray-300 p-8 rounded-lg shadow-lg max-w-lg m-auto mt-12">
      {/* Heading for the appraisal form */}
      <h1 className="text-3xl font-semibold mb-6">Appraisal Form</h1>
      {/* Form for user to input questions */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          {/* Label for the question input field */}
          <label htmlFor="question" className="block font-medium mb-2">
            Question:
          </label>
          {/* Input field for the user to enter a question */}
          <input
            type="text" // Input type is text
            id="question" // Set id to "question" for identification
            value={currentQuestion} // Bind input value to currentQuestion state
            onChange={handleQuestionChange} // Call handleQuestionChange on input change
            className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your question here" // Placeholder text for the input
          />
        </div>
        {/* Button to add the current question to the list */}
        <button
          type="button" // Set button type to button to prevent form submission
          onClick={handleAddQuestion} // Call handleAddQuestion on button click
          className="bg-blue-500 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 mb-4"
        >
          Add Question
        </button>

        {/* Heading for the list of added questions */}
        <h3 className="text-xl font-semibold mb-4">Added Questions</h3>
        {/* Check if there are any questions added */}
        {questions.length > 0 ? (
          // Map through the questions and display each one
          questions.map((question, index) => (
            <div key={index} className="bg-white p-4 rounded-md mb-2 shadow">
              <p>{question}</p> {/* Display the question */}
              {/* Button to remove the question from the list */}
              <button
                type="button" // Set button type to button to prevent form submission
                onClick={() => handleRemoveQuestion(index)} // Call handleRemoveQuestion with the index of the question
                className="bg-red-500 text-white px-2 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No questions added yet.</p> // Message when no questions are added
        )}

        {/* Submit button for the form */}
        <button
          type="submit" // Set button type to submit
          className="bg-green-500 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
        >
          Submit Questions
        </button>
        {/* Display error message if there is an error */}
        {error && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
            role="alert"
          >
            {error}
          </div>
        )}
      </form>
    </div>
  );
}
