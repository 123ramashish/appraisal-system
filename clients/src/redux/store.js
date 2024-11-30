import { configureStore } from "@reduxjs/toolkit"; // Import configureStore from Redux Toolkit to create the Redux store
import userReducer from "./user/userSlice.js"; // Import the user reducer from the user slice

// Create the Redux store
const store = configureStore({
  reducer: {
    user: userReducer, // Add the user reducer to the store under the key 'user'
  },
});

// Export the store for use in the application
export default store;
