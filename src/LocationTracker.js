// src/components/LocationTracker.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AuthService from '../src/services/AuthService';
import './LocationTracker.css'; 

const API_BASE_URL = 'https://a.techcarrel.in/api';

const LocationTracker = () => {
  const defaultLatitude = '26.2124°';
  const defaultLongitude = '78.1772°';
  const [locationData, setLocationData] = useState({
    latitude: defaultLatitude,
    longitude: defaultLongitude,
  });

  useEffect(() => {
    const updateLocation = async (latitude, longitude) => {
      try {
        if (AuthService.isAuthenticated()) {
          const token =  AuthService.getAuthToken();
          const saveLocationUrl = `${API_BASE_URL}/location_save`;

          const response = await axios.post(
            saveLocationUrl,
            {
              latitude: latitude,
              longitude: longitude,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setLocationData(response.data); // Set the response data in state
        } else {
          console.log('User is not authenticated');
        }
      } catch (error) {
        console.error('Location tracking error:', error);
      }
    };

    updateLocation(defaultLatitude, defaultLongitude);
  }, []);

  return (
    <div className="location-tracker">
      <h2>Location Tracking</h2>
      <div className="location-info">
        <div className="input-container">
          <label htmlFor="latitude">Latitude</label>
          <input type="text" id="latitude" value={locationData.latitude} readOnly />
        </div>
        <div className="input-container">
          <label htmlFor="longitude">Longitude</label>
          <input type="text" id="longitude" value={locationData.longitude} readOnly />
        </div>
      </div>
    </div>
  );
};

export default LocationTracker;
