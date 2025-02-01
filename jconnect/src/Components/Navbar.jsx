import React from 'react'
import {Link} from 'react-router-dom'
const Navbar = () => {
    return (
        <nav className="bg-blue-400 p-4">
          <ul className="flex space-x-4 justify-center font-bold">
            <li><Link className="text-white " to="/">Home</Link></li>
            <li><Link className="text-white" to="/login">Login</Link></li>
            <li><Link className="text-white" to="/signup">Signup</Link></li>
            <li><Link className="text-white" to="/find-study-buddies">Find Study Buddies</Link></li>
          </ul>
        </nav>
      );
}

export default Navbar
