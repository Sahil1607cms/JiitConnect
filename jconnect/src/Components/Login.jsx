import React from 'react'

const Login = () => {
    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold mb-4">Login</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm">Email</label>
              <input type="email" id="email" className="w-full p-2 border border-gray-300 rounded" required />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm">Password</label>
              <input type="password" id="password" className="w-full p-2 border border-gray-300 rounded" required />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">Login</button>
          </form>
        </div>
      );
}

export default Login
