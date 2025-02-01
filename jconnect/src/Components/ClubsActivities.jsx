import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const clubsData = [
  { name: 'Panache ', id: 'panache' },
  { name: 'RPH ', id: 'rph' },
  { name: 'Abhivyakti ', id: 'dramatics' },
  { name: 'Ffortissimo', id: 'music' },
];

const ClubsActivities = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-black via-gray-900 to-black text-white">
      <header className="w-full py-6 px-8 flex justify-between items-center bg-gray-900 shadow-md">
        <h1 className="text-3xl font-bold">Clubs & Activities</h1>
      </header>
      <div className="flex-grow flex items-center justify-center px-6">
        <div className="w-full max-w-3xl text-center p-8 bg-gray-800 bg-opacity-70 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold mb-4">JIIT CLUBS!</h2>
          <p className="mb-6 text-gray-300">Choose a club to view activities and notices.</p>
          <ul className="space-y-4">
            {clubsData.map((club) => (
              <li
                key={club.id}
                className="cursor-pointer p-4 bg-gray-700 rounded-lg hover:bg-gray-600"
                onClick={() => navigate(`/club/${club.id}`)}
              >
                <h3 className="text-xl font-medium">{club.name}</h3>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <footer className="bg-gray-900 text-center py-6 text-gray-400 w-full">
        <p>&copy; 2025 JiitConnect. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default ClubsActivities;
