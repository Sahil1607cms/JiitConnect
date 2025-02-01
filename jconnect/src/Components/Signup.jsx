import React, { useState } from 'react';
import { auth } from '../firebase'; // Import the Firebase auth instance
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Firebase function to create user

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // To store error messages
  const [loading, setLoading] = useState(false); // To handle loading state

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true); // Set loading to true when submitting

    try {
      // Create user with email and password
      await createUserWithEmailAndPassword(auth, email, password);
      alert('User created successfully!');
      setEmail(''); // Clear email input
      setPassword(''); // Clear password input
    } catch (error) {
      setError(error.message); // Set the error message if signup fails
    } finally {
      setLoading(false); // Set loading to false once done
    }
  };

  return (
    <div className='max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg'>
      <h2 className='text-3xl font-semibold mb-4'>Sign Up</h2>
      <form onSubmit={handleSignup}>
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
          <div className='text-red-500 text-sm mb-4'>{error}</div> // Display error message
        )}
        <button
          type='submit'
          className='w-full bg-blue-500 text-white py-2 rounded-md'
          disabled={loading}
        >
          {loading ? 'Signing Up...' : 'Sign Up'} {/* Show loading state */}
        </button>
      </form>
    </div>
  );
};

export default Signup;
