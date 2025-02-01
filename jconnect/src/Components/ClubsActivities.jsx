import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const clubsData = [
  { name: 'Optica 📷', id: 'optica' },
  { name: 'IEEE 🌐', id: 'ieee' },
  { name: 'Panache 👔👗', id: 'panache' },
  { name: 'RPH 🖥️', id: 'rph' },
  { name: 'Abhivyakti 🎭', id: 'dramatics' },
  { name: 'ffortissimo 🎼', id: 'music' },
];

const clubCredentials = {
  optica: { password: 'password1', name: 'Optica - Photography Club' },
  ieee: { password: 'password2', name: 'IEEE - Technical Society' },
  panache: { password: 'password3', name: 'Panache - Fashion Society' },
  rph: { password: 'password4', name: 'RPH - Coding Club' },
  dramatics: { password: 'password5', name: 'Dramatics Society' },
  music: { password: 'password6', name: 'Music Club' },
};

const ClubsActivities = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (clubCredentials[loginData.username] && clubCredentials[loginData.username].password === loginData.password) {
      localStorage.setItem('clubHeadId', loginData.username);
      navigate(`/club/${loginData.username}`);
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-black via-gray-900 to-black text-white">
      <div className="w-1/2 flex flex-col p-6 bg-gray-900">
        <h2 className="text-3xl font-bold mb-6 text-center">Clubs</h2>
        <ul className="space-y-4">
          {clubsData.map((club) => (
            <li
              key={club.id}
              className="cursor-pointer p-4 bg-gray-700 rounded-lg hover:bg-gray-600 text-center"
              onClick={() => navigate(`/club/${club.id}`)}
            >
              <h3 className="text-xl font-medium">{club.name}</h3>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-1/2 flex flex-col items-center justify-center p-6 bg-gray-800">
        <h2 className="text-3xl font-bold mb-4">Club Head Login</h2>
        <div className="w-full max-w-md bg-gray-700 p-6 rounded-lg shadow-lg">
          {error && <p className="mb-4 text-red-500">{error}</p>}
          <input
            type="text"
            placeholder="Enter Club ID"
            className="w-full p-2 mb-4 bg-gray-600 text-white rounded-lg"
            value={loginData.username}
            onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
          />
          <input
            type="password"
            placeholder="Enter Password"
            className="w-full p-2 mb-4 bg-gray-600 text-white rounded-lg"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
          />
          <button onClick={handleLogin} className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded-lg">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

const ActivitiesDashboard = () => {
  const { clubId } = useParams();
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [isClubHead, setIsClubHead] = useState(false);

  useEffect(() => {
    const clubHeadId = localStorage.getItem('clubHeadId');
    if (clubHeadId === clubId) {
      setIsClubHead(true);
    }

    const storedActivities = JSON.parse(localStorage.getItem(`activities_${clubId}`)) || [];
    setActivities(storedActivities);
  }, [clubId]);

  const handleAddActivity = (activityName, description) => {
    const newActivity = { name: activityName, description };
    const existingActivities = JSON.parse(localStorage.getItem(`activities_${clubId}`)) || [];
    existingActivities.push(newActivity);
    localStorage.setItem(`activities_${clubId}`, JSON.stringify(existingActivities));
    setActivities(existingActivities);
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl font-semibold mb-4">{clubCredentials[clubId]?.name} Activities</h2>

      {isClubHead && <AddActivityForm onAddActivity={handleAddActivity} />}

      <div className="space-y-4 mt-8">
        <h3 className="text-2xl font-semibold">Activities List</h3>
        {activities.length === 0 ? (
          <p>No activities available. Add a new activity!</p>
        ) : (
          activities.map((activity, index) => (
            <div key={index} className="mb-4 p-4 border border-gray-500 rounded">
              <h4 className="text-xl font-medium">{activity.name}</h4>
              <p>{activity.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const AddActivityForm = ({ onAddActivity }) => {
  const [activityName, setActivityName] = useState('');
  const [description, setDescription] = useState('');

  const handleAddActivity = () => {
    if (activityName && description) {
      onAddActivity(activityName, description);
      setActivityName('');
      setDescription('');
    }
  };

  return (
    <div className="space-y-4 mb-6">
      <input
        type="text"
        placeholder="Enter Activity Name"
        className="w-full p-2 border border-gray-300 rounded"
        value={activityName}
        onChange={(e) => setActivityName(e.target.value)}
      />
      <textarea
        placeholder="Enter Activity Description"
        className="w-full p-2 border border-gray-300 rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleAddActivity} className="bg-blue-500 text-white px-6 py-2 rounded-md">
        Add Activity
      </button>
    </div>
  );
};

export { ClubsActivities, ActivitiesDashboard };
