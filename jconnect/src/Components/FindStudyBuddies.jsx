import React, { useState } from 'react';

const FindStudyBuddies = () => {
  const [category, setCategory] = useState('college-curriculum');

  return (
    <div className="min-h-screen w-screen bg-gradient-to-r from-black via-gray-900 to-black text-white flex flex-col items-center justify-center pt-24 px-6">
      <h2 className="text-4xl font-bold mb-6 ">Find Study Buddies</h2>
      <p className="text-lg mb-8 text-gray-300">Search for students based on your category of interest!</p>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg space-y-6">
        {/* Category Selection */}
        <div>
          <label htmlFor="category" className="block text-sm text-gray-300 mb-2">Select Category</label>
          <select
            id="category"
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="college-curriculum">College Curriculum</option>
            <option value="skills-development">Skills Development</option>
          </select>
        </div>

        {/* Input Fields based on Selected Category */}
        {category === 'college-curriculum' && (
          <div>
            <label htmlFor="course" className="block text-sm text-gray-300 mb-2">Enter Course</label>
            <input
              type="text"
              id="course"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white"
              placeholder="e.g. Math 101"
            />
          </div>
        )}

        {category === 'skills-development' && (
          <div>
            <label htmlFor="topic" className="block text-sm text-gray-300 mb-2">Enter Topic</label>
            <input
              type="text"
              id="topic"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white"
              placeholder="e.g. Python Programming"
            />
          </div>
        )}

        {/* Availability Selection */}
        <div>
          <label htmlFor="availability" className="block text-sm text-gray-300 mb-2">Select Availability</label>
          <select id="availability" className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white">
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
          </select>
        </div>

        {/* Search Button */}
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md shadow-md font-semibold transition-all">
          Search
        </button>
      </div>
    </div>
  );
};

export default FindStudyBuddies;
