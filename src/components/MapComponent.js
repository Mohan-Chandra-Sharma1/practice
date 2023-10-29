import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet'; // Import Leaflet library
import 'leaflet/dist/leaflet.css';
import './MapComponent.css'; 

const customIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/128/684/684908.png', // Replace with your image URL or path
  iconSize: [40, 40], // Adjust icon size as needed
  iconAnchor: [20, 40], // Adjust icon anchor point
});

const MapComponent = ({ latitude, longitude }) => {
  return (
    <div className="map-container">
      <MapContainer center={[latitude, longitude]} zoom={13} className="map">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]} icon={customIcon} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
