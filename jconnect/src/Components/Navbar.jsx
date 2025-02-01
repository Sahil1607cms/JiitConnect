import React from 'react'
import {Link} from 'react-router-dom'
const Navbar = () => {
    return (
        <nav className="bg-blue-400 p-4">
          <ul className="flex space-x-4 justify-center font-bold gap-10 text-xl">
            <li><Link className="text-white hover:underline underline-offset-8" to="/">Home</Link></li>
            <li><Link className="text-white hover:underline underline-offset-8" to="/login">Login</Link></li>
            <li><Link className="text-white hover:underline underline-offset-8" to="/signup">Signup</Link></li>
            <li><Link className="text-white hover:underline underline-offset-8" to="/find-study-buddies">Find Study Buddies</Link></li>
          </ul>
        </nav>
      );
}

export default Navbar
