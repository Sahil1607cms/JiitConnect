import React, { useState, useEffect } from 'react';

const ClubsActivities = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Fetch activities from localStorage
    const storedActivities = JSON.parse(localStorage.getItem('activities')) || [];
    setActivities(storedActivities);
  }, []);

  return (
<<<<<<< HEAD
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-r from-black via-gray-900 to-black text-white">
      <div className="w-full max-w-3xl text-center p-8 bg-gray-800 bg-opacity-70 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-4">Clubs and Activities</h2>
        <p className="mb-6 text-gray-300">Join a club or activity to meet like-minded people!</p>
        <ul>
          {activities.length === 0 ? (
            <p className="text-gray-400">No activities available yet.</p>
          ) : (
            activities.map((activity, index) => (
              <li key={index} className="mb-4 p-4 border border-gray-600 rounded-lg">
                <h3 className="text-xl font-medium">{activity.name}</h3>
                <p className="text-gray-300">{activity.description}</p>
              </li>
            ))
          )}
        </ul>
      </div>
=======
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-black via-gray-900 to-black text-white">
      <header className="w-full py-6 px-8 flex justify-between items-center bg-gray-900 shadow-md">
        <h1 className="text-3xl font-bold">Clubs & Activities</h1>
      </header>

      <div className="flex-grow pt-24 px-6"> {/* Allow content to grow and take up remaining space */}
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-4">Clubs and Activities</h2>
          <p className="mb-6">Join a club or activity to meet like-minded people!</p>
          <ul>
            {activities.length === 0 ? (
              <p>No activities available yet.</p>
            ) : (
              activities.map((activity, index) => (
                <li key={index} className="mb-4">
                  <h3 className="text-xl font-medium">{activity.name}</h3>
                  <p>{activity.description}</p>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-center py-6 text-gray-400 w-full">
        <p>&copy; 2025 JiitConnect. All Rights Reserved.</p>
      </footer>
>>>>>>> 1c4946e2986d09b6ce9d89c098bffebcd8eccd52
    </div>
  );
};

export default ClubsActivities;
