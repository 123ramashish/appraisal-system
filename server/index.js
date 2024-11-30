import express from "express"; // Import the Express framework for building the server
import mongoose from "mongoose"; // Import Mongoose for MongoDB object modeling
import cors from "cors"; // Import CORS middleware to enable Cross-Origin Resource Sharing
import bodyParser from "body-parser"; // Import body-parser to parse incoming request bodies
import UserRoute from "./routes/user.routes.js"; // Import user routes from the user.routes file
import AppraisalRoute from "./routes/appraisals.routes.js"; // Import appraisal routes from the appraisals.routes file
import dotenv from "dotenv"; // Import dotenv to load environment variables from a .env file

// Load environment variables from .env file
dotenv.config();

// Create an instance of the Express application
const app = express();

// Use CORS middleware to allow cross-origin requests
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to parse URL-encoded request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Middleware to parse JSON request bodies (redundant if express.json() is used)

// Connect to MongoDB using Mongoose
mongoose
  .connect(process.env.MONGO_URI, {
    // Use the MongoDB URI from environment variables
    useNewUrlParser: true, // Use the new URL parser
    useUnifiedTopology: true, // Use the new topology engine
  })
  .then(() => console.log("Database connected")) // Log success message when connected
  .catch((err) => console.log(err)); // Log any errors during connection

// Define routes for the application
app.use("/api/user", UserRoute); // Route for user-related operations
app.use("/api/appraisals", AppraisalRoute); // Route for appraisal-related operations

// Define the port to run the server on, using environment variable or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server and listen on the specified port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Log message indicating the server is running
