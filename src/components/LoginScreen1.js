import React, { useEffect, useState } from 'react';
import './LoginScreen1.css';
import AuthService from '../services/AuthService';
import axios from 'axios';

const LoginScreen = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [apiData, setApiData] = useState(null); 

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      // Simulate login API call
      const response = await AuthService.login(email, password);
  
      if (response.success) {
        onLogin();
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  
  const fetchAPI = () => {
    axios.get('/api/data')
      .then((response) => {
        // Handle the API data response
        console.log('API data:', response.data);
        setApiData(response.data); // Update the state with the API data
      })
      .catch((error) => {
        console.error('API data error:', error);
        setApiData(null); // Handle error, clear the state, or show an error message
      });
  };

  useEffect(() => {
    fetchAPI(); // Automatically fetch API data when the component loads
  }, []);
  
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          className="login-field"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="login-field"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="login-button" type="submit">Login</button>
        {error && <p className="error-message">{error}</p>}
        <button className="login-button" type="button" onClick={() => fetchAPI}>API data</button>
      </form>
    </div>
  );
};

export default LoginScreen;
