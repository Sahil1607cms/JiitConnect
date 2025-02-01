import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddActivityForm from './AddActivityForm';

const ActivitiesDashboard = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Check if the representative is logged in
    const isLoggedIn = localStorage.getItem('clubLoggedIn');
    if (!isLoggedIn) {
      navigate('/club-login'); // Redirect to login page if not logged in
    }

    // Fetch activities from localStorage or backend
    const storedActivities = JSON.parse(localStorage.getItem('activities')) || [];
    setActivities(storedActivities);
  }, [navigate]);

  return (
    <div className="text-center">
      <h2 className="text-3xl font-semibold mb-4">Activities Dashboard</h2>
      <AddActivityForm setActivities={setActivities} />
      <div className="space-y-4 mt-8">
        <h3 className="text-2xl font-semibold">Activities List</h3>
        {activities.length === 0 ? (
          <p>No activities available. Add a new activity!</p>
        ) : (
          activities.map((activity, index) => (
            <div key={index} className="mb-4">
              <h4 className="text-xl font-medium">{activity.name}</h4>
              <p>{activity.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ActivitiesDashboard;
