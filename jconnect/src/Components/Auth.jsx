import React, { useState } from 'react';
import { auth } from '../firebase'; // Import the Firebase auth instance
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'; // Firebase functions
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false); // Toggle between Login and Signup
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('User created successfully!');
      setEmail('');
      setPassword('');
      navigate('/'); // Redirect to home after signup
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Logged in successfully!');
      setEmail('');
      setPassword('');
      navigate('/'); // Redirect to home after login
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg'>
      <h2 className='text-3xl font-semibold mb-4'>{isSignup ? 'Sign Up' : 'Login'}</h2>
      <form onSubmit={isSignup ? handleSignup : handleLogin}>
        <div className='mb-4'>
          <label htmlFor='email' className='block text-sm'>
            Email
          </label>
          <input
            type='email'
            id='email'
            className='w-full p-2 border border-gray-300 rounded'
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='password' className='block text-sm'>
            Password
          </label>
          <input
            type='password'
            id='password'
            className='w-full p-2 border border-gray-300 rounded'
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        {error && (
          <div className='text-red-500 text-sm mb-4'>{error}</div>
        )}
        <button
          type='submit'
          className='w-full bg-blue-500 text-white py-2 rounded-md'
          disabled={loading}
        >
          {loading ? (isSignup ? 'Signing Up...' : 'Logging In...') : (isSignup ? 'Sign Up' : 'Login')}
        </button>
      </form>
      <div className='mt-4 text-center'>
        <button
          className='text-blue-500 text-sm'
          onClick={() => {
            setIsSignup(!isSignup);
            setError(''); // Reset error when switching forms
            setEmail('');
            setPassword('');
          }}
        >
          {isSignup ? 'Already have an account? Login' : 'Don\'t have an account? Sign up'}
        </button>
      </div>
    </div>
  );
};

export default Auth;
