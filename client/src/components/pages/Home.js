import React, { useEffect, useState } from "react";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      // Fetch user data using the token
      fetch("http://localhost:5000/api/auth/verify-token", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setUser(data.user); // The user data should now include the user's name
          } else {
            setUser(null);
          }
        })
        .catch((error) => console.error("Error:", error));
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>; // Show loading if the user data is not yet available
  }

  return (
    <div>
      <h1>Welcome, {user.name}!</h1> {/* Display the user's name */}
      <p>This is your homepage.</p>
    </div>
  );
};

export default Home;
