// Dashboard.js
import React from 'react';
import SensorCard from './SensorCard';
import Chart from './Chart';

const Dashboard = () => {
  return (
    <div>
      <h1>독거노인 상태 모니터링</h1>
      <div className="sensor-cards">
        <SensorCard type="온도" value="24°C" />
        <SensorCard type="습도" value="60%" />
        <SensorCard type="가스" value="안전" />
        <SensorCard type="움직임" value="정상" />
      </div>
      <Chart />
    </div>
  );
};

export default Dashboard;
