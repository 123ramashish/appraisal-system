import express from "express"; // Import the Express framework
import UserController from "../controller/user.controller.js"; // Import the UserController class

const usercontroller = new UserController(); // Create an instance of UserController
const router = express.Router(); // Create a new router object for handling routes

// Define a route for adding a new user, invoking the manageUser  method of UserController
router.post("/adduser", usercontroller.manageUser);

// Define a route for user sign-in, invoking the signin method of UserController
router.post("/signin", usercontroller.signin);

// Define a route for user sign-out, invoking the signout method of UserController
router.post("/signout", usercontroller.signout);

export default router; // Export the router for use in other parts of the application
