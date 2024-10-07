import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'; // Import useNavigate and Router
import Cookies from 'js-cookie'; // Import js-cookie
// import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
  const navigate = useNavigate(); // Create navigate function
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

    // Store user data in session cookies
    Cookies.set('user', JSON.stringify({ username, mobileNumber }), { expires: 1 }); // Set cookie to expire in 1 day

    // Navigate to the dashboard
    navigate('/Header.js');
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </div>
        <div>
          <label htmlFor="mobileNumber">Mobile Number:</label>
          <input
            type="tel"
            id="mobileNumber"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder="Enter your mobile number"
          />
        </div>
        <button type="submit">SUBMIT</button>
      </form>
    </div>
  );
};

export default Login;
