const AddActivityForm = ({ setActivities }) => {
  const [activityName, setActivityName] = useState('');
  const [description, setDescription] = useState('');

  const handleAddActivity = () => {
    const newActivity = { name: activityName, description };
    const existingActivities = JSON.parse(localStorage.getItem('activities')) || [];
    existingActivities.push(newActivity);
    localStorage.setItem('activities', JSON.stringify(existingActivities));
    setActivities(existingActivities);
    setActivityName('');
    setDescription('');
  };

  return (
    <div className="space-y-4">
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

export default AddActivityForm;
