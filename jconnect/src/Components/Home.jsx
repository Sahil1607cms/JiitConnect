import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    const user = localStorage.getItem("user");

    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        if (parsedUser.loggedIn) {
          navigate("/find-study-buddies"); // Redirect if logged in
          return;
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }

    navigate("/login"); // Redirect to login if not logged in
  };

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-blue-500 mb-4">Welcome to JiitConnect!</h1>
      <p className="text-lg mb-6">
        Find study buddies, join virtual study rooms, and improve your academic life!
      </p>
      <button
        onClick={handleNavigation}
        className="bg-blue-400 hover:bg-blue-500 text-white px-6 py-2 rounded-md hover:scale-110 transition-transform transform duration-150 ease-in-out"
      >
        Find Your Study Buddy
      </button>
    </div>
  );
};

export default Home;
