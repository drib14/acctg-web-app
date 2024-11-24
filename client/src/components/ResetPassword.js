import React, { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert(""); // Clear any previous alerts

    if (!newPassword || !confirmPassword) {
      setAlert("Please fill in both password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setAlert("Passwords do not match.");
      return;
    }

    const resetToken = searchParams.get("token"); // Get the token from URL

    if (!resetToken) {
      setAlert("Invalid or missing reset token.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ resetToken, newPassword }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setAlert("Password successfully reset!");
        setTimeout(() => {
          navigate("/login"); // Redirect to login after success
        }, 2000);
      } else {
        setAlert(data.message || "Failed to reset password.");
      }
    } catch (error) {
      setAlert("Error occurred. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <i className="fas fa-lock"></i>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <i className="fas fa-lock"></i>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn">
          Reset Password
        </button>
        {alert && <div id="alert">{alert}</div>}
      </form>
      <div>
        <Link to="/login">Back to Login</Link>
      </div>
    </div>
  );
};

export default ResetPassword;
