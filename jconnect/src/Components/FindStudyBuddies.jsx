import React from 'react'

const FindStudyBuddies = () => {
    return (
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-4">Find Study Buddies</h2>
          <p className="mb-6">Search for students who are studying the same subjects at the same time!</p>
          <div className="space-y-4">
            <div>
              <label htmlFor="course" className="block text-sm">Enter Course</label>
              <input type="text" id="course" className="w-full p-2 border border-gray-300 rounded" placeholder="e.g. Math 101" />
            </div>
            <div>
              <label htmlFor="availability" className="block text-sm">Select Availability</label>
              <select id="availability" className="w-full p-2 border border-gray-300 rounded">
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
              </select>
            </div>
            <button className="bg-blue-500 text-white px-6 py-2 rounded-md">Search</button>
          </div>
        </div>
      );
}

export default FindStudyBuddies
