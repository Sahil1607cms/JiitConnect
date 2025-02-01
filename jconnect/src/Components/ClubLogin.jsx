import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const clubCredentials = {
  panache: { password: "fashion123", name: "Panache - Fashion Society" },
  rph: { password: "coding456", name: "RPH - Coding Club" },
  dramatics: { password: "drama789", name: "Dramatics Society" },
  music: { password: "music101", name: "Music Club" }
};

const ClubLogin = () => {
  const [clubId, setClubId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (clubCredentials[clubId] && clubCredentials[clubId].password === password) {
      localStorage.setItem('clubHeadId', clubId); // Store club ID in local storage
      navigate(`/club/${clubId}`); // Redirect to the club’s page
    } else {
      setError("Invalid Club ID or Password");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Club Head Login</h2>
        {error && <p className="text-red-400 text-center">{error}</p>}
        <input
          type="text"
          placeholder="Enter Club ID"
          value={clubId}
          onChange={(e) => setClubId(e.target.value)}
          className="w-full p-3 mb-3 bg-gray-700 rounded"
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-3 bg-gray-700 rounded"
        />
        <button onClick={handleLogin} className="w-full p-3 bg-blue-600 hover:bg-blue-500 rounded">
          Login
        </button>
      </div>
    </div>
  );
};

export default ClubLogin;
