import { createRoot } from "react-dom/client"; // Import createRoot from react-dom/client for rendering the React app
import "./index.css"; // Import global CSS styles for the application
import App from "./App.jsx"; // Import the main App component
import store from "./redux/store.js"; // Import the Redux store to provide state management
import { Provider } from "react-redux"; // Import Provider from react-redux to connect the Redux store to the React app

// Render the React application
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App /> {/* Render the main App component */}
  </Provider>
);
