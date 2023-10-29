// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import LocationTracker from './LocationTracker';
import MapComponent from '../src/components/MapComponent';
import FormComponent from '../src/components/FormComponent';
import LoginScreen from '../src/components/LoginScreen1';
import SignUpScreen from '../src/components/SignUpScreen';
import AuthService from '../src/services/AuthService';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [vehicleData, setVehicleData] = useState([]);
  const [vehiclePosition, setVehiclePosition] = useState({ x: 0 });

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
  };

  const handleSignUp = (userData) => {
    console.log('Sign up data:', userData);
    setIsSignUp(false);
  };

  const handleSave = (newData) => {
    setVehicleData([...vehicleData, newData]);
  };

  useEffect(() => {
    // Move the vehicle by updating the x position
    const interval = setInterval(() => {
      setVehiclePosition((prevPosition) => ({ x: prevPosition.x + 10 }));
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="logo-container">
          <img src="https://cdn-icons-png.flaticon.com/128/3736/3736562.png" alt="Vehicle Tracking Logo" className="logo" />
          <h1>Vehicle Tracking App</h1>
        </div>
        {!isAuthenticated && (
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        )}
      </header>

      <main className="App-main">
        {!isAuthenticated && isSignUp ? (
           <div className="sign-up-container">
             {!isAuthenticated && (
          <>
            <SignUpScreen onSignUp={handleSignUp} />
          </>
        )}  
         </div>
        ) : !isAuthenticated ? (
          <LoginScreen onLogin={handleLogin} />
        ) : (
          <>
            {/* Display the moving vehicle */}
            <div className="vehicle" style={{ right: vehiclePosition.x }}>
              🚗
            </div>
            
            <div className="content-container">
              {/* Display the LocationTracker component */}
              <LocationTracker />

              {/* Display the MapComponent */}
              <MapComponent latitude={26.2124} longitude={78.1772} />

              {/* Display the FormComponent */}
              <FormComponent onSave={handleSave} />
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;





