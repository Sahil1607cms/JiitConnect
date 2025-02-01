import React from 'react'
import {Link} from 'react-router-dom'

const Home = () => {
    return (
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-500 mb-4">Welcome to JiitConnect!</h1>
          <p className="text-lg mb-6">Find study buddies, join virtual study rooms, and improve your academic life!</p>
          <Link to="/find-study-buddies" className="bg-blue-500 text-white px-6 py-2 rounded-md">Find Your Study Buddy</Link>
        </div>
      );
}

export default Home
