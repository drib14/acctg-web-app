import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Get token from localStorage
        if (!token) {
          setIsAuthenticated(false); // No token, not authenticated
          return;
        }

        // Verify the token with the backend
        const response = await axios.get(
          "http://localhost:5000/api/auth/verify-token",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setIsAuthenticated(response.data.success); // Set authentication status based on token validity
      } catch (error) {
        setIsAuthenticated(false); // Error during verification (e.g., expired token)
      } finally {
        setLoading(false); // Stop loading once verification is complete
      }
    };

    verifyToken();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display loading state while token verification happens
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }

  return <Outlet />; // Render the protected route if authenticated
};

export default ProtectedRoute;
