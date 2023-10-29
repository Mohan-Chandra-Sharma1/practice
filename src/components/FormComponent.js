import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making API requests
import './FormComponent.css';

const FormComponent = ({ onSave }) => {
  const [plateNumber, setPlateNumber] = useState('');
  const [deviceName, setDeviceName] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSave = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        'https://a.techcarrel.in/api/save_plate_number',
        {
          plate_number: plateNumber,
          device_name: deviceName,
        }
      );
  
      if (response.status === 200) {
        setSuccessMessage('Vehicle details saved successfully.');
        setError('');
        onSave(); // Call the onSave prop to update the list of vehicle details
      } else {
        setSuccessMessage('');
        setError('An error occurred while saving vehicle details. Please try again later.');
      }
    } catch (error) {
      if (error.response) {
        console.error('API Error Response:', error.response.data);
        setError('An error occurred while saving vehicle details. Please try again later.');
      } else if (error.request) {
        console.error('API Request Error:', error.request);
        setError('A network error occurred. Please check your internet connection.');
      } else {
        console.error('Error:', error.message);
        setError('An unknown error occurred.');
      }
      setSuccessMessage('');
    }
  };
  

  return (
    <div className="form-container">
      <h3 className="form-title">Save Vehicle Details</h3>
      <form className="form-fields" onSubmit={handleSave}>
        <input
          className="form-field"
          type="text"
          placeholder="Plate Number"
          value={plateNumber}
          onChange={(e) => setPlateNumber(e.target.value)}
          required
        />
        <input
          className="form-field"
          type="text"
          placeholder="Device Name"
          value={deviceName}
          onChange={(e) => setDeviceName(e.target.value)}
          required
        />
        <button className="form-button" type="submit">Save</button>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
  );
};

export default FormComponent;
