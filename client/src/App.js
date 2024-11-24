// App.js
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute for authentication checks
import LoadingModal from "./components/LoadingModal"; // Import LoadingModal for the loading screen
import Home from "./components/pages/Home"; // Import Home page component

function App() {
  const [isLoading, setIsLoading] = useState(true); // State for managing loading state
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication status

  useEffect(() => {
    // Simulate a loading delay (like fetching initial data)
    setTimeout(() => {
      setIsLoading(false); // Hide loading modal after 3 seconds
      // Check if the user is authenticated (e.g., check for a token in localStorage)
      const token = localStorage.getItem("authToken"); // Assuming you store a token in localStorage
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    }, 3000);
  }, []);

  const handleLogout = () => {
    // Clear the authentication status (e.g., clear token from localStorage)
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      {/* Show the LoadingModal while isLoading is true */}
      <LoadingModal isVisible={isLoading} />

      <Routes>
        {/* Public Routes: Accessible by anyone */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              // If the user is authenticated, redirect them to the home page
              <Navigate to="/" replace />
            ) : (
              <Login />
            )
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected Routes: Accessible only when authenticated */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          {/* Add more protected routes here */}
          {/* <Route path="/profile" element={<Profile />} /> */}
          {/* <Route path="/story" element={<StoryPage />} /> */}
        </Route>

        {/* Route for logging out */}
        <Route path="/logout" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App
