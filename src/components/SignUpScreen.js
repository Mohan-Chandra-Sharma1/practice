import React, { useState } from 'react';
import AuthService from '../services/AuthService';

const signUpContainerStyle = {
  maxWidth: '500px',
  margin: '0 auto',
  padding: '20px',
  border: '1px solid #ddd',
  borderRadius: '10px',
  backgroundColor: '#fff',
  boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
};

const signUpTitleStyle = {
  fontSize: '24px',
  marginBottom: '20px',
};

const signUpFormStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
};

const signUpInputStyle = {
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  fontSize: '16px',
};

const signUpButtonStyle = {
  padding: '12px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  fontSize: '16px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease-in-out',
};

const errorMessageStyle = {
  color: 'red',
};

const SignUpScreen = ({ onSignUp }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();

    if (
      !name ||
      !email ||
      !phone ||
      !gender ||
      !city ||
      !state ||
      !password
    ) {
      setError('Please fill in all fields');
      return;
    }

    const userData = {
      name,
      email,
      phone,
      gender,
      city,
      state,
      password,
    };

  //   onSignUp(userData);
  // };

  try {
    // Call the register function from AuthService
    const response =  AuthService.register(userData);

    if (response.success) {
      onSignUp(); // Trigger the onSignUp callback
    } else {
      setError('Registration failed');
    }
  } catch (error) {
    setError('An error occurred during registration');
  }
};



  return (
    <div style={signUpContainerStyle}>
      <h2 style={signUpTitleStyle}>Sign Up</h2>
      <form style={signUpFormStyle} onSubmit={handleSignUp}>
        <div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={signUpInputStyle}
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={signUpInputStyle}
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            style={signUpInputStyle}
          />
        </div>
       
        <div>
          {/* <label>Password:</label> */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={signUpInputStyle}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            style={signUpInputStyle}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
            style={signUpInputStyle}
          />
        </div>
        <div>
          <label>Gender:</label>
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={gender === 'Male'}
            onChange={() => setGender('Male')}
            required
          />{' '}
          Male
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={gender === 'Female'}
            onChange={() => setGender('Female')}
            required
          />{' '}
          Female
          <input
            type="radio"
            name="gender"
            value="Others"
            checked={gender === 'Others'}
            onChange={() => setGender('Others')}
            required
          />{' '}
          Others
        </div>
        <div>
          <button type="submit" style={signUpButtonStyle} onSubmit={handleSignUp}>
            Sign Up
          </button>
        </div>
        {error && <p style={errorMessageStyle}>{error}</p>}
      </form>
    </div>
  );
};

export default SignUpScreen;
