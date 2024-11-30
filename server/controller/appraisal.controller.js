import Appraisal from "../models/appraisal.schema.js"; // Import the Appraisal model
import User from "../models/user.schema.js"; // Import the User model

export default class AppraisalController {
  // Admin creates questions for the appraisal
  async addAppraisal(req, res) {
    try {
      const { questions } = req.body; // Expecting an array of questions from the admin
      // Validate that questions is an array and not empty
      if (!Array.isArray(questions) || questions.length === 0) {
        return res.status(400).json({ message: "Questions must be an array." });
      }

      // Create a new appraisal document with the provided questions
      const newAppraisal = new Appraisal({ questions });
      await newAppraisal.save(); // Save the new appraisal to the database
      return res
        .status(201)
        .json({ message: "Appraisal created successfully!" }); // Respond with success message
    } catch (error) {
      console.error("Error creating appraisal:", error); // Log any errors for debugging
      return res.status(500).json({ message: "Something went wrong!" }); // Respond with generic error message
    }
  }

  // Participants submit their answers to the appraisal
  async submitAnswers(req, res) {
    try {
      const { appraisalId, email, answers } = req.body; // Get appraisal ID, user email, and answers from request body
      const appraisal = await Appraisal.findById(appraisalId); // Find the appraisal by ID

      // Check if the appraisal exists
      if (!appraisal) {
        return res.status(404).json({ message: "Appraisal not found." });
      }

      const user = await User.findOne({ email }); // Find the user by email
      // Check if the participant exists
      if (!user) {
        return res.status(404).json({ message: "Participant does not exist!" });
      }

      // Add the user's answers to the appraisal's answers array
      appraisal.answers.push({
        user: {
          name: user.name,
          email: user.email,
          _id: user._id,
          role: user.role,
        },
        answers,
      });

      await appraisal.save(); // Save the updated appraisal
      return res
        .status(200)
        .json({ message: "Answers submitted successfully!" }); // Respond with success message
    } catch (error) {
      console.error("Error submitting answers:", error); // Log any errors for debugging
      return res.status(500).json({ message: "Something went wrong!" }); // Respond with generic error message
    }
  }

  // Retrieve the latest appraisal created
  async seeAppraisal(req, res) {
    try {
      const result = await Appraisal.find().sort({ updatedAt: -1 }).limit(1); // Fetch the latest appraisal
      // Check if there are any appraisals available
      if (result.length === 0) {
        return res.status(404).json({ message: "No appraisal available yet!" });
      }
      return res.status(200).json(result[0]); // Return the latest appraisal object
    } catch (error) {
      console.error("Error fetching appraisal:", error); // Log any errors for debugging
      return res.status(500).json({ message: "Something went wrong!" }); // Respond with generic error message
    }
  }

  // See participation data for a specific user
  async seeParticipate(req, res) {
    const { email } = req.query; // Use query parameters for GET requests to get user email
    try {
      const appraisal = await Appraisal.find().sort({ updatedAt: -1 }).limit(1); // Fetch the latest appraisal
      // Check if there are any appraisals available
      if (appraisal.length === 0) {
        return res.status(404).json({ message: "No appraisal available yet!" });
      }

      const user = await User.findOne({ email }); // Find the user by email
      // Check if the user exists
      if (!user) {
        return res.status(404).json({ message: "User   not found!" });
      }

      // Filter the answers to find submissions by the user
      const participatedData = appraisal[0].answers.filter(
        (appra) =>
          appra.user._id.equals(user._id) || // Check if the user's ID matches
          (user.members && user.members.includes(appra.user._id)) // Check if the user is a member of any submitted answers
      );

      // Check if the user has any submissions
      if (participatedData.length === 0) {
        return res
          .status(404)
          .json({ message: "No submissions found for this participant!" });
      }

      return res.status(200).json(participatedData); // Return the user's participation data
    } catch (error) {
      console.error("Error fetching participation data:", error); // Log any errors for debugging
      return res.status(500).json({ message: "Something went wrong!" }); // Respond with generic error message
    }
  }

  // See all participation data for the latest appraisal
  async seeAllParticipate(req, res) {
    try {
      const appraisal = await Appraisal.find().sort({ updatedAt: -1 }).limit(1); // Fetch the latest appraisal
      // Check if there are any appraisals available
      if (appraisal.length === 0) {
        return res.status(404).json({ message: "No appraisal available yet!" });
      }
      return res.status(200).json(appraisal); // Return all answers for the latest appraisal
    } catch (error) {
      console.error("Error fetching participation data:", error); // Log any errors for debugging
      return res.status(500).json({ message: "Something went wrong!" }); // Respond with generic error message
    }
  }
}
