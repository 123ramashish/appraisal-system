import User from "../models/user.schema.js"; // Import the User model
import bcryptjs from "bcryptjs"; // Import bcryptjs for password hashing
import { errorHandler } from "../utils/error.js"; // Import custom error handler (not used in this snippet)
import jwt from "jsonwebtoken"; // Import jsonwebtoken for token generation

export default class UserController {
  // Manage user creation and updates
  async manageUser(req, res, next) {
    try {
      const userData = req.body; // Get user data from request body
      // Validate required fields for the user
      const { name, email, password, role, id, members } = userData;
      if (!name || !email || !password || !role || !id) {
        return res
          .status(400)
          .json({ message: "All fields are required for the user!" });
      }

      // Create and save members if they exist
      const memberIds = []; // Array to store member IDs
      if (members && Array.isArray(members)) {
        for (const member of members) {
          const {
            id: memberId,
            name: memberName,
            email: memberEmail,
            password: memberPassword,
            role: memberRole,
          } = member;

          // Validate member fields
          if (
            !memberId ||
            !memberName ||
            !memberEmail ||
            !memberPassword ||
            !memberRole
          ) {
            return res
              .status(400)
              .json({ message: "All fields are required for each member!" });
          }

          // Hash the member's password
          const hashedMemberPassword = await bcryptjs.hash(memberPassword, 10);

          // Create and save the member
          const newMember = new User({
            name: memberName,
            email: memberEmail,
            password: hashedMemberPassword,
            role: memberRole,
            id: memberId, // Use the provided member ID
          });

          await newMember.save(); // Save the new member to the database

          // Store the member ID
          memberIds.push(newMember._id); // Add the new member's ID to the array
        }
      }

      // Now handle the main user
      const hashedPassword = await bcryptjs.hash(password, 10); // Hash the main user's password
      const existingUser = await User.findOne({ email }); // Check if the user already exists

      if (!existingUser) {
        // Create a new user if not found
        const newUser = new User({
          name,
          email,
          password: hashedPassword,
          role,
          id, // Use the provided user ID
          members: memberIds, // Push the member IDs into the user's members array
        });
        await newUser.save(); // Save the new user to the database
      } else {
        // If the user already exists, update their details and members array
        existingUser.name = name; // Update the user's name
        existingUser.password = hashedPassword; // Update password if needed
        existingUser.role = role; // Update the user's role
        existingUser.members.push(...memberIds); // Add new member IDs to the existing user's members
        await existingUser.save(); // Save the updated user
      }

      return res
        .status(200)
        .json({ message: "User  (s) processed successfully!" }); // Respond with success message
    } catch (error) {
      console.error("Error in manageUser  :", error); // Log any errors for debugging
      return res.status(500).json({ message: error.message }); // Respond with error message
    }
  }

  // User sign-in functionality
  async signin(req, res, next) {
    try {
      const { email, password } = req.body; // Get email and password from request body
      // Validate that email and password are provided
      if (
        !email ||
        !password ||
        email.trim(" ") === "" ||
        password.trim(" ") === ""
      ) {
        return res.status(400).json({ message: "All fields are required!" }); // Respond with error if fields are missing
      }
      const validUser = await User.findOne({ email }); // Check if the user exists in the database
      if (!validUser) {
        return res.status(400).json({ message: "User  not found!" }); // Respond with error if user not found
      }

      // Compare provided password with the stored hashed password
      const validPassword = await bcryptjs.compare(
        password,
        validUser.password
      );
      if (!validPassword) {
        return res.status(400).json({ message: "Invalid password" }); // Respond with error if password is incorrect
      }

      // Generate a JWT token upon successful sign-in
      const token = jwt.sign(
        { id: validUser._id, role: validUser.role },
        process.env.JWT_SECRET,
        {
          expiresIn: "1y", // Set token expiration time
        }
      );
      const { password: pass, ...rest } = validUser._doc; // Exclude password from the response
      return res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true, // Set cookie to be accessible only by the server
        })
        .json({ user: rest }); // Respond with user data
    } catch (error) {
      return res.status(500).json({ message: "Something Wrong!" }); // Respond with generic error message
    }
  }

  // User sign-out functionality
  async signout(req, res, next) {
    try {
      res.clearCookie("access_token"); // Clear the access token cookie
      return res.status(200).json({ message: "Signed out successfully" }); // Respond with success message
    } catch (error) {
      return res
        .status(500)
        .json({ message: "An error occurred during signout" }); // Respond with error message
    }
  }
}
