import React from "react";
import ReactDOM from "react-dom/client";
//import "./index.css"; // Global styles for the app
import App from "./components/chat"; // Main App component

// Render the React application
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
