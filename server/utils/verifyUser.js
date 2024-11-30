import { errorHandler } from "./error.js"; // Import the error handling function
import jwt from "jsonwebtoken"; // Import the jsonwebtoken library for handling JWTs

// Middleware function to verify JWT tokens
export const verifyToken = (req, res, next) => {
  // Retrieve the token from the request cookies
  const token = req.cookies.access_token;

  // Check if the token is not present
  if (!token) {
    // If no token, call the error handler with a 401 Unauthorized status
    return next(errorHandler(401, "Unauthorized"));
  }

  // Verify the token using the secret key stored in environment variables
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    // If there is an error during verification
    if (err) {
      // Call the error handler with a 401 Unauthorized status
      return next(errorHandler(401, "Unauthorized!"));
    }

    // If verification is successful, attach the decoded user information to the request object
    req.user = decoded;

    // Call the next middleware in the stack
    next();
  });
};
