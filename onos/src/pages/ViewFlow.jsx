import React, { useState, useEffect } from 'react';
import '../Style/ViewQueues.style.css';
const FLowTable = () => {
  const [flows, setFlows] = useState([]);

  useEffect(() => {
    // Fetch queue data from your backend here
    const fetchQueues = async () => {
      try {
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic b25vczpyb2Nrcw=='
          },
          body: JSON.stringify(yourRequestBodyObject)
        };
        const response = await fetch('http://localhost:8181/onos/v1/flows', requestOptions);
        const data = await response.json();
        setFlows(data);
      } catch (error) {
        console.error('Error fetching queues:', error);
      }
    };
    fetchQueues();
  }, []);

  const handleDelete = async (deviceId,flowId) => {
    // Implement delete logic here (e.g., send a DELETE request to your backend)
    try {
      const response = await fetch(`http://localhost:8181/onos/v1/flows/${deviceId}/${flowId} `, {
        method: 'DELETE',
        headers: {
          Authorization: 'Basic b25vczpyb2Nrcw=='
        }
      });

      if (response.ok) {
        // Handle successful deletion
        setFlows(flows.filter((flow) => flow.id !== flowId));
      } else {
        // Handle error
        console.error('Error deleting queue:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = (flowId) => {
    // Implement edit logic here (e.g., open a modal or redirect to an edit page)
    console.log('Edit queue:', flowId);
  };

  return (
    <div className='header'><h1><b> View Flows</b></h1>
    <table className="flow-table">
      <thead>
        <tr className="flow-row">
          <th>Group ID</th>
          <th>State</th>
          <th>Life</th>
          <th>Live Type</th>
          <th>Last Seen</th>
          <th>Packets</th>
          <th>Bytes</th>
          <th>ID</th>
          <th>App ID</th>
          <th>Priority</th>
          <th>Timeout</th>
          <th>Is Permanent</th>
          <th>Device ID</th>
          <th>Table ID</th>
          <th>Table Name</th>
        </tr>
      </thead>
      <tbody>
        {flows.map((flow) => (
          <tr key={flow.id} className="data-row">
            <td>{flow.groupId}</td>
            <td>{flow.state}</td>
            <td>{flow.life}</td>
            <td>{flow.liveType}</td>
            <td>{flow.lastSeen}</td>
            <td>{flow.packets}</td>
            <td>{flow.bytes}</td>
            <td>{flow.id}</td>
            <td>{flow.appId}</td>
            <td>{flow.priority}</td>
            <td>{flow.timeout}</td>
            <td>{flow.isPermanent}</td>
            <td>{flow.deviceId}</td>
            <td>{flow.tableId}</td>
            <td>{flow.tableName}</td>
            <td className="actions-cell">
              <button className="delete-button">Delete</button>
              <button className="edit-button">Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default FLowTable;