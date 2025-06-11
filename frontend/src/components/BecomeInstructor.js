import React, { useState } from 'react';

const BecomeInstructor = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/instructor/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          // If authentication is required, add Authorization header here
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`, 
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || 'Report submitted successfully!');
        setFormData({ name: '', email: '', message: '' }); // Clear form
      } else {
        alert(data.message || 'Failed to submit report.');
        console.error('Error response:', data);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the report.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h2>Submit Instructor Report</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Your Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Your Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Report Details:</label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Send Report</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeInstructor;
