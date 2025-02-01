import React, { useState, useEffect } from 'react';

const ClubsActivities = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Fetch activities from localStorage
    const storedActivities = JSON.parse(localStorage.getItem('activities')) || [];
    setActivities(storedActivities);
  }, []);

  return (
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
    </div>
  );
};

export default ClubsActivities;
