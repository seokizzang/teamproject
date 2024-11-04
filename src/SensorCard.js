// SensorCard.js
import React from 'react';
import './SensorCard.css';

const SensorCard = ({ type, value }) => {
  return (
    <div className="sensor-card">
      <h3>{type}</h3>
      <p>{value}</p>
    </div>
  );
};

export default SensorCard;
