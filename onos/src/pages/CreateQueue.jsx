// Form component with added class names
import React, { useState } from 'react';
import '../Style/CreateQueue.style.css';

const Form = () => {
  const [formData, setFormData] = useState({
    type: '',
    maximumRate: '',
    minimumRate: '',
    burst: '',
    priority: '',
  });
  const [priorities, setPriorities] = useState(['High', 'Medium', 'Low']);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);

    // Send data to backend here (replace with your actual backend logic)
    try {
      const response = await fetch('/your-backend-endpoint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle successful submission
        console.log('Data submitted successfully!');
        // Clear form or perform other actions as needed
        setFormData({
          type: '',
          maximumRate: '',
          minimumRate: '',
          burst: '',
          priority: '',
        });
      } else {
        // Handle error
        console.error('Error submitting data:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
        <h1 className='heading'>Create Queue</h1>
      <div className="form-group">
        <label htmlFor="type">Type:</label>
        <input
          type="text"
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="maximumRate">Maximum Rate:</label>
        <input
          type="number"
          id="maximumRate"
          name="maximumRate"
          value={formData.maximumRate}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="minimumRate">Minimum Rate:</label>
        <input
          type="number"
          id="minimumRate"
          name="minimumRate"
          value={formData.minimumRate}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="burst">Burst:</label>
        <input
          type="number"
          id="burst"
          name="burst"
          value={formData.burst}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="priority">Priority:</label>
        <select
          id="priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          required
          className="form-control"
        >
          {priorities.map((priority) => (
            <option key={priority} value={priority}>
              {priority}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
};

export default Form;
