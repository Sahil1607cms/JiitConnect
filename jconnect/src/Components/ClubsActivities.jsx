import React, { useState, useEffect } from 'react';

const ClubsActivities = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Fetch activities from localStorage
    const storedActivities = JSON.parse(localStorage.getItem('activities')) || [];
    setActivities(storedActivities);
  }, []);

  return (
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
  );
};

export default ClubsActivities;
