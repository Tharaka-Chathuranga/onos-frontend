import React from 'react';
import '../Style/Dashboard.style.css';
export default function Dashboard() {
  return (
    <div className="outer-header">
    <h1><b>Static QoS</b></h1>
        <div className="dashboard-container">
             <div className="dashboard-item">
             <a href='/queues/create'>Create Queue</a>
             </div>

             <div className="dashboard-item">
             <a href='/queues/details'>View Queue</a>
             </div>
        </div>
    </div>
  );
}
