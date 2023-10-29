// src/components/VehicleDetailsForm.js
import React, { useState } from 'react';
import axios from 'axios';
import AuthService from '../services/AuthService';

const API_BASE_URL = 'https://a.techcarrel.in/api'; // Your API base URL

const VehicleDetailsForm = () => {
  const [plateNumber, setPlateNumber] = useState('');
  const [deviceName, setDeviceName] = useState('');

  const handleSubmit = async () => {
    const response1 = axios.get('/api/data');
    console.log(response1);

    const headers = {};
    AuthService.setAuthorizationHeader(headers);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/save_plate_number`,
        { plate_number: plateNumber, device_name: deviceName },
        { headers }
      );

      // Handle success
      console.log('Vehicle details saved:', response.data);
    } catch (error) {
      console.error('Save vehicle details error:', error);
      // Handle error
    }
  };

  const fetchAPI = () => {
    const response1 = axios('/api/data');
    console.log(response1);
  }

  return (
    <div>
      <h3>Save Vehicle Details</h3>
      <input
        type="text"
        placeholder="Plate Number"
        value={plateNumber}
        onChange={(e) => setPlateNumber(e.target.value)}
      />
      <button type='button' onClick={()=> fetchAPI()}>
        API data
      </button>
      <input
        type="text"
        placeholder="Device Name"
        value={deviceName}
        onChange={(e) => setDeviceName(e.target.value)}
      />
      <button onClick={handleSubmit}>Save</button>
      
    </div>
  );
};

export default VehicleDetailsForm;
