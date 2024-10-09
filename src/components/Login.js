import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import loginBg from '../assets/login_bg.png'; // Import the image

const Login = ({ setIsLoggedIn, onLoginSuccess, resetAppState }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!username || !mobileNumber) {
      setErrorMessage('Username and Mobile Number are required');
      return;
    }
    // Clear the error message
    setErrorMessage('');
    // Check if the user already exists
    const existingUserData = localStorage.getItem(username);
    if (existingUserData) {
      // User exists, load their data
      const userData = JSON.parse(existingUserData);
      Cookies.set('user', JSON.stringify({ username, mobileNumber }), { expires: 1 });
      onLoginSuccess(userData);
    } else {
      // New user, reset the app state
      resetAppState();
      // Create new user data
      const newUserData = {
        username,
        mobileNumber,
        // Add any other initial user data here
      };
      // Store new user data
      localStorage.setItem(username, JSON.stringify(newUserData));
      Cookies.set('user', JSON.stringify({ username, mobileNumber }), { expires: 1 });
      onLoginSuccess(newUserData);
    }
    // Update login state
    setIsLoggedIn(true);
    // Navigate to the main page
    navigate('/main');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${loginBg})` }} // Use the imported image
    >
      <div className="bg-white bg-opacity-0 p-8 rounded shadow-md w-full max-w-sm"> {/* Set background opacity */}
        {/* <h2 className="text-2xl font-bold mb-4">Login</h2> */}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            {/* <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username:</label> */}
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="USER NAME"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            {/* <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700">Mobile Number:</label> */}
            <input
              type="tel"
              id="mobileNumber"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="MOBILE NUMBER"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4 flex justify-center"> {/* Flex container to center the button */}
            <button type="submit" className="w-20 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">SUBMIT</button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
