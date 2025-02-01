import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase'; // Import your Firebase auth instance
import { signOut } from 'firebase/auth'; // Import Firebase signOut function

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
      alert('Logged out successfully!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="bg-blue-400 p-4 flex items-center justify-center">
      <ul className="flex space-x-4 justify-center items-center font-bold gap-10 text-xl">
        <li><Link className="text-white hover:underline underline-offset-8 pt-2" to="/">Home</Link></li>
        <li><Link className="text-white hover:underline underline-offset-8 flex items-center" to="/find-study-buddies">Find Study Buddies</Link></li>
        
        {/* Conditionally render login/signup or user profile and logout */}
        {user ? (
          <li className="flex items-center space-x-4">
            <span className="text-white">{user.email}</span> {/* Display user email */}
            <button
              className="text-white bg-red-500 px-4 py-1 rounded-md cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        ) : (
          <li><Link className="text-white hover:underline underline-offset-8" to="/login">Login/Signup</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
