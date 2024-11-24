document.addEventListener("DOMContentLoaded", () => {
  // Handle Login Form
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const alertDiv = document.getElementById("alert");

      if (!email || !password) {
        alertDiv.innerText = "Please fill in all fields.";
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();

        if (data.success) {
          window.location.href = "dashboard.html"; // Redirect after successful login
        } else {
          alertDiv.innerText = data.message;
        }
      } catch (error) {
        alertDiv.innerText = "Error occurred. Please try again.";
      }
    });
  }

  // Handle Signup Form
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const alertDiv = document.getElementById("alert");

      if (!name || !email || !password) {
        alertDiv.innerText = "Please fill in all fields.";
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
        const data = await response.json();

        if (data.success) {
          window.location.href = "login.html"; // Redirect after successful signup
        } else {
          alertDiv.innerText = data.message;
        }
      } catch (error) {
        alertDiv.innerText = "Error occurred. Please try again.";
      }
    });
  }

  // Handle Forgot Password Form
  const forgotPasswordForm = document.getElementById("forgotPasswordForm");
  if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const alertDiv = document.getElementById("alert");

      if (!email) {
        alertDiv.innerText = "Please enter your email.";
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/forgot-password",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          }
        );
        const data = await response.json();

        if (data.success) {
          alertDiv.innerText = "Password reset link sent!";
          setTimeout(() => {
            window.location.href = "reset.html"; // Redirect after alert
          }, 2000); // 2-second delay to show alert
        } else {
          alertDiv.innerText = data.message;
        }
      } catch (error) {
        alertDiv.innerText = "Error occurred. Please try again.";
      }
    });
  }

  // Handle Password Reset Form
  const resetPasswordForm = document.getElementById("resetPasswordForm");
  if (resetPasswordForm) {
    resetPasswordForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const newPassword = document.getElementById("newPassword").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
      const alertDiv = document.getElementById("alert");

      if (!newPassword || !confirmPassword) {
        alertDiv.innerText = "Please fill in both password fields.";
        return;
      }

      if (newPassword !== confirmPassword) {
        alertDiv.innerText = "Passwords do not match.";
        return;
      }

      try {
        // Assuming you send a reset token to the backend (this part will depend on your backend implementation)
        const urlParams = new URLSearchParams(window.location.search);
        const resetToken = urlParams.get("token");

        const response = await fetch(
          "http://localhost:5000/api/auth/reset-password",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ resetToken, newPassword }),
          }
        );
        const data = await response.json();

        if (data.success) {
          alertDiv.innerText = "Password successfully reset!";
          setTimeout(() => {
            window.location.href = "login.html"; // Redirect after successful reset
          }, 2000); // 2-second delay to show alert
        } else {
          alertDiv.innerText = data.message;
        }
      } catch (error) {
        alertDiv.innerText = "Error occurred. Please try again.";
      }
    });
  }
});
