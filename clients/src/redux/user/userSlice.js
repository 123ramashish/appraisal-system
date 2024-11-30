import { createSlice } from "@reduxjs/toolkit"; // Import createSlice from Redux Toolkit to create a slice of state

// Retrieve user from localStorage, if exists
const storedUser = localStorage.getItem("currentUser ") // Check if there is a user stored in localStorage
  ? JSON.parse(localStorage.getItem("currentUser ")) // If it exists, parse it from JSON
  : null; // If it doesn't exist, set storedUser  to null

// Create a slice for user state management
const userSlice = createSlice({
  name: "user", // Name of the slice
  initialState: {
    currentUser: storedUser, // Set the initial state for currentUser  from localStorage
    error: null, // Initialize error state to null
    loading: false, // Initialize loading state to false
  },
  reducers: {
    // Action to indicate sign-in process has started
    signInStart: (state) => {
      state.loading = true; // Set loading to true
      state.error = null; // Reset any previous error
    },
    // Action to handle successful sign-in
    signInSuccess: (state, action) => {
      state.currentUser = action.payload; // Set currentUser  to the payload from the action (user data)
      state.loading = false; // Set loading to false
      state.error = null; // Reset any previous error

      // Store user in localStorage for persistence
      localStorage.setItem("currentUser ", JSON.stringify(action.payload)); // Save the user data in localStorage
    },
    // Action to handle sign-in failure
    signInFailure: (state, action) => {
      state.loading = false; // Set loading to false
      state.error = action.payload; // Set error to the payload from the action (error message)
    },
    // Action to handle successful sign-out
    signoutSuccess: (state) => {
      state.currentUser = null; // Clear currentUser  state
      state.loading = false; // Set loading to false
      state.error = null; // Reset any previous error
      // Remove user from localStorage on sign out
      localStorage.removeItem("currentUser "); // Remove the user data from localStorage
    },
  },
});

// Export actions for use in components
export const { signInStart, signInSuccess, signInFailure, signoutSuccess } =
  userSlice.actions;

// Export the reducer to be used in the store
export default userSlice.reducer;
