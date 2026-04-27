import React, { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const response = await fetch('http://localhost:8080/job_portal/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ name: name })
      });

      if (response.ok) {
        const result = await response.json();
        alert('Server response: ' + result.message);
      } else {
        alert('Error submitting to server');
      }
    } catch (error) {
      console.error("Failed to fetch:", error);
      alert('Failed to connect to backend. Make sure Tomcat is running!');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
      <form onSubmit={handleSubmit} style={{ padding: '2rem', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
        <h3 style={{ margin: '0 0 1rem 0', textAlign: 'center' }}>Submit Name</h3>

        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Name"
          required
          style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
        />

        <button type="submit" style={{ padding: '0.5rem 1rem', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem' }}>
          Submit POST
        </button>
      </form>
    </div>
  );
}

export default App;