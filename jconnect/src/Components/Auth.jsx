import React, { useState } from 'react'
import { auth } from '../firebase'
import { FaGoogle } from 'react-icons/fa'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const googleProvider = new GoogleAuthProvider()

  const handleUsernameChange = e => setUsername(e.target.value)
  const handleEmailChange = e => setEmail(e.target.value)
  const handlePasswordChange = e => setPassword(e.target.value)

  const handleSignup = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      alert(`User ${username} created successfully!`)
      setUsername('')
      setEmail('')
      setPassword('')
      navigate('/')
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      alert('Logged in successfully!')
      setEmail('')
      setPassword('')
      navigate('/')
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    try {
      await signInWithPopup(auth, googleProvider)
      alert('Logged in with Google successfully!')
      navigate('/')
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-black via-gray-900 to-black">
      <div className="max-w-md w-full p-6 bg-white text-black rounded-lg shadow-lg">

        <h2 className="text-3xl font-semibold mb-4 text-center ">
          {isSignup ? 'Sign Up' : 'Login'}
        </h2>
        <form onSubmit={isSignup ? handleSignup : handleLogin}>
          {isSignup && (
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="w-full p-2 border border-gray-300 rounded text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={username}
                onChange={handleUsernameChange}
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-gray-300 rounded text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border border-gray-300 rounded text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md mb-2 transition-all"
            disabled={loading}
          >
            {loading
              ? isSignup
                ? 'Signing Up...'
                : 'Logging In...'
              : isSignup
              ? 'Sign Up'
              : 'Login'}
          </button>
        </form>

        {/* Google Sign-In Button */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md flex items-center justify-center gap-2 transition-all"
          disabled={loading}
        >
          <FaGoogle className="w-5 h-5" />
          {loading ? 'Signing in with Google...' : 'Sign in with Google'}
        </button>

        <div className="mt-4 text-center">
          <button
            className="text-blue-400 hover:text-blue-600 text-sm transition-all"
            onClick={() => {
              setIsSignup(!isSignup)
              setError('')
              setUsername('')
              setEmail('')
              setPassword('')
            }}
          >
            {isSignup
              ? 'Already have an account? Login'
              : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Auth
