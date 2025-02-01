import React, { useState } from 'react';

const FindStudyBuddies = () => {
  const [category, setCategory] = useState('college-curriculum'); // Track selected category

  return (
    <div className="text-center">
      <h2 className="text-3xl font-semibold mb-4">Find Study Buddies</h2>
      <p className="mb-6">Search for students based on your category of interest!</p>

      <div className="space-y-4">
        {/* Category Selection */}
        <div>
          <label htmlFor="category" className="block text-sm">Select Category</label>
          <select
            id="category"
            className="w-full p-2 border border-gray-300 rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)} // Update category state
          >
            <option value="college-curriculum">College Curriculum</option>
            <option value="skills-development">Skills Development</option>
          </select>
        </div>

        {/* Input Fields based on Selected Category */}
        {category === 'college-curriculum' && (
          <div>
            <label htmlFor="course" className="block text-sm">Enter Course</label>
            <input
              type="text"
              id="course"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="e.g. Math 101"
            />
          </div>
        )}

        {category === 'skills-development' && (
          <div>
            <label htmlFor="topic" className="block text-sm">Enter Topic</label>
            <input
              type="text"
              id="topic"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="e.g. Python Programming"
            />
          </div>
        )}

        {/* Availability Selection */}
        <div>
          <label htmlFor="availability" className="block text-sm">Select Availability</label>
          <select id="availability" className="w-full p-2 border border-gray-300 rounded">
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
          </select>
        </div>

        {/* Search Button */}
        <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 cursor-pointer">Search</button>
      </div>
    </div>
  );
};

export default FindStudyBuddies;
