import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleFindStudyBuddy = () => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        if (parsedUser.loggedIn) {
          navigate("/find-study-buddies");
          return;
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
    navigate("/login");
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-gradient-to-r from-black via-gray-900 to-black text-white flex flex-col items-center">

      {/* Header */}
      <header className="w-full py-6 px-8 flex justify-between items-center bg-gray-900 shadow-md">
        <h1 className="text-3xl font-bold">JiitConnect</h1>
        <nav>
          <button onClick={handleFindStudyBuddy} className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-md shadow">
            Find a Study Buddy
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center py-20 px-6 w-full max-w-4xl">
        <h2 className="text-4xl font-bold mb-4">Study Smarter, Together</h2>
        <p className="text-lg text-gray-300">
          Connect with like-minded students, join virtual study rooms, and stay on track with your academic goals. JiitConnect makes learning collaborative and fun!
        </p>
        <button onClick={handleFindStudyBuddy} className="mt-6 bg-indigo-600 hover:bg-indigo-700 px-8 py-4 rounded-md shadow-md hover:scale-105 transition-transform">
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 py-12 text-center w-full max-w-6xl">
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-2">Find Study Buddies</h3>
          <p className="text-gray-300">Match with students based on subjects and interests to boost productivity.</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-2">Join Study Rooms</h3>
          <p className="text-gray-300">Collaborate in real-time with peers in virtual study sessions.</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-2">Track Your Progress</h3>
          <p className="text-gray-300">Set academic goals and monitor your learning journey.</p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 px-8 text-center w-full max-w-4xl">
        <h2 className="text-3xl font-bold mb-6">What Our Users Say</h2>
        <p className="text-gray-300">“JiitConnect has transformed the way I study. I’ve met amazing study buddies and improved my grades significantly!”</p>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-center py-6 text-gray-400 w-full z-99">
      <p>&copy; 2025 JiitConnect. All Rights Reserved.</p>
    </footer> 
    </div>
  );
};

export default Home;