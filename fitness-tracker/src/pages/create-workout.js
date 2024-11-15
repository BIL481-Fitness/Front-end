import React, { useState } from 'react';

const CreateWorkout = () => {
  const [workout, setWorkout] = useState({
    name: '',
    duration: '',
    intensity: '',
    description: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkout({ ...workout, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Şimdilik veriyi konsola yazıyoruz, backend bağlanınca buradan API'ye gönderilebilir
    console.log('Workout created:', workout);
    setMessage('Workout successfully created!');
    setWorkout({ name: '', duration: '', intensity: '', description: '' });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Create a New Workout</h1>
      {message && <p style={{ color: 'green' }}>{message}</p>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px' }}>
        <label>
          Workout Name:
          <input
            type="text"
            name="name"
            value={workout.name}
            onChange={handleChange}
            placeholder="Enter workout name"
            style={{ marginBottom: '10px', padding: '8px' }}
            required
          />
        </label>

        <label>
          Duration (in minutes):
          <input
            type="number"
            name="duration"
            value={workout.duration}
            onChange={handleChange}
            placeholder="Enter duration"
            style={{ marginBottom: '10px', padding: '8px' }}
            required
          />
        </label>

        <label>
          Intensity:
          <select
            name="intensity"
            value={workout.intensity}
            onChange={handleChange}
            style={{ marginBottom: '10px', padding: '8px' }}
            required
          >
            <option value="" disabled>
              Select intensity
            </option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>

        <label>
          Description:
          <textarea
            name="description"
            value={workout.description}
            onChange={handleChange}
            placeholder="Enter workout description (optional)"
            style={{ marginBottom: '10px', padding: '8px', height: '80px' }}
          />
        </label>

        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Create Workout
        </button>
      </form>
    </div>
  );
};

export default CreateWorkout;
