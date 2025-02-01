import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ClubLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Function to handle login logic
  const handleLogin = () => {
    const validUsername = 'representative'; // Example username
    const validPassword = 'password123'; // Example password

    // Check if the credentials match
    if (username === validUsername && password === validPassword) {
      localStorage.setItem('clubLoggedIn', 'true'); // Save login status in localStorage
      navigate('/activities-dashboard'); // Redirect to the Activities Dashboard after login
    } else {
      alert('Invalid login credentials');
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl font-semibold mb-4">Club Representative Login</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm">Username</label>
          <input
            type="text"
            id="username"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm">Password</label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-6 py-2 rounded-md"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default ClubLogin;
