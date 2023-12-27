import React, { useState, useEffect } from 'react';
import '../Style/ViewQueues.style.css';
const QueueTable = () => {
  const [queues, setQueues] = useState([]);

  useEffect(() => {
    // Fetch queue data from your backend here
    const fetchQueues = async () => {
      try {
        const response = await fetch('/your-backend-endpoint-to-fetch-queues');
        const data = await response.json();
        setQueues(data);
      } catch (error) {
        console.error('Error fetching queues:', error);
      }
    };
    fetchQueues();
  }, []);

  const handleDelete = async (queueId) => {
    // Implement delete logic here (e.g., send a DELETE request to your backend)
    try {
      const response = await fetch(`/your-backend-endpoint-to-delete-queue/${queueId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Handle successful deletion
        setQueues(queues.filter((queue) => queue.id !== queueId));
      } else {
        // Handle error
        console.error('Error deleting queue:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = (queueId) => {
    // Implement edit logic here (e.g., open a modal or redirect to an edit page)
    console.log('Edit queue:', queueId);
  };

  return (
    <div className='header'><h1><b> View Queues</b></h1>
    <table className="queue-table">
      <thead>
        <tr className="header-row">
          <th>Type</th>
          <th>Maximum Rate</th>
          <th>Minimum Rate</th>
          <th>Burst</th>
          <th>Priority</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {queues.map((queue) => (
          <tr key={queue.id} className="data-row">
            <td>{queue.type}</td>
            <td>{queue.maximumRate}</td>
            <td>{queue.minimumRate}</td>
            <td>{queue.burst}</td>
            <td>{queue.priority}</td>
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

export default QueueTable;