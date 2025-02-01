import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase"; // Import Firebase auth instance
import { signOut } from "firebase/auth"; // Import Firebase signOut function

const Navbar = () => {
  const [user, setUser] = useState(null);

  // Listen for auth state changes and update the user state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user); // If logged in, set user; otherwise, null
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="w-full py-6 px-8 flex justify-between items-center bg-gray-900 shadow-md fixed top-0 left-0 z-50">
      <h1 className="text-3xl font-bold text-white">JiitConnect</h1>
      <nav>
        <ul className="flex space-x-6 items-center text-lg font-medium">
          <li>
            <Link className="text-white hover:underline underline-offset-4" to="/">Home</Link>
          </li>
          <li>
            <Link className="text-white hover:underline underline-offset-4" to="/find-study-buddies">Find Study Buddies</Link>
          </li>
          {user ? (
            <li className="flex items-center space-x-4">
              <span className="text-white hidden md:inline-block">{user.email}</span>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md shadow" to="/login">
                Login / Signup
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
