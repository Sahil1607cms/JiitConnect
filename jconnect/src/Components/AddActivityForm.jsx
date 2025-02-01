import React, { useState } from 'react';

const AddActivityForm = ({ setActivities }) => {
  const [activityName, setActivityName] = useState('');
  const [description, setDescription] = useState('');

  const handleAddActivity = () => {
    const newActivity = { name: activityName, description };
    const existingActivities = JSON.parse(localStorage.getItem('activities')) || [];
    existingActivities.push(newActivity);

    localStorage.setItem('activities', JSON.stringify(existingActivities));
    setActivities(existingActivities); // Update state in ActivitiesDashboard

    setActivityName('');
    setDescription('');
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="activity-name" className="block text-sm">Activity Name</label>
        <input
          type="text"
          id="activity-name"
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter Activity Name"
          value={activityName}
          onChange={(e) => setActivityName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm">Description</label>
        <textarea
          id="description"
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter Activity Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button
        onClick={handleAddActivity}
        className="bg-blue-500 text-white px-6 py-2 rounded-md"
      >
        Add Activity
      </button>
    </div>
  );
};

export default AddActivityForm;
