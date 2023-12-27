// Form component with added class names
import React, { useState } from 'react';
import '../Style/Login.style.css';

const Form = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });


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
        console.log('Logged in successfully!');
        // Clear form or perform other actions as needed
        setFormData({
          username: '',
          password: '',
        });
      } else {
        // Handle error
        console.error('Error Logged in:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
         <h1 className='heading'>Login</h1>
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="text"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
     
      
      <button type="submit" className="submit-button">
        Login
      </button>
    </form>
  );
};

export default Form;

