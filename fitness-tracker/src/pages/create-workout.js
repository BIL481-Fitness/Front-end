import { useState, useEffect } from 'react';
import { useTheme } from '../components/ThemeProvider';

export default function CreateWorkout() {
  const { theme } = useTheme();

  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [days, setDays] = useState('');
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userId = sessionStorage.getItem('userId');
      setUserId(userId);

      if (!userId) {
        console.error('User ID is not available in sessionStorage!');
      } else {
        console.log('User ID:', userId);
      }
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!age || !weight || !height || !days) {
      setError('Please fill in all fields.');
      return;
    }

    if (parseInt(days, 10) > 7) {
      setError('Days per week cannot exceed 7.');
      return;
    }

    const requestBody = {
      age: parseInt(age, 10),
      weight: parseInt(weight, 10),
      height: parseInt(height, 10),
      days: parseInt(days, 10),
    };

    setError('');
    try {
      if (!userId) {
        setError('User ID is not available. Please log in.');
        return;
      }

      const apiUrl = `https://backend-u0ol.onrender.com/generate_workout_plan/${userId}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        setWorkoutPlan(data);
      } else {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        setError('There was an issue generating the workout plan.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred while fetching data.');
    }
  };

  const handleDaysChange = (e) => {
    const value = e.target.value;
    if (value > 7) {
      setError('Days per week cannot exceed 7.');
    } else {
      setError('');
      setDays(value);
    }
  };

  return (
    <div
      style={{
        backgroundColor: theme === 'light' ? '#ffffff' : '#1e1e1e',
        color: theme === 'light' ? '#000000' : '#ffffff',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Create a New Workout</h1>

      {error && (
        <div style={{ color: 'red', textAlign: 'center', marginBottom: '20px' }}>
          <strong>{error}</strong>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: '400px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
        }}
      >
        <label>
          Age:
          <input
            type="number"
            placeholder="Enter your age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              border: `1px solid ${theme === 'light' ? '#cccccc' : '#444444'}`,
              borderRadius: '5px',
              backgroundColor: theme === 'light' ? '#f9f9f9' : '#333333',
              color: theme === 'light' ? '#000000' : '#ffffff',
            }}
          />
        </label>
        <label>
          Weight (kg):
          <input
            type="number"
            placeholder="Enter your weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              border: `1px solid ${theme === 'light' ? '#cccccc' : '#444444'}`,
              borderRadius: '5px',
              backgroundColor: theme === 'light' ? '#f9f9f9' : '#333333',
              color: theme === 'light' ? '#000000' : '#ffffff',
            }}
          />
        </label>
        <label>
          Height (cm):
          <input
            type="number"
            placeholder="Enter your height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              border: `1px solid ${theme === 'light' ? '#cccccc' : '#444444'}`,
              borderRadius: '5px',
              backgroundColor: theme === 'light' ? '#f9f9f9' : '#333333',
              color: theme === 'light' ? '#000000' : '#ffffff',
            }}
          />
        </label>
        <label>
          Days per week:
          <input
            type="number"
            placeholder="Enter the number of days per week"
            value={days}
            onChange={handleDaysChange}
            style={{
              width: '100%',
              padding: '10px',
              border: `1px solid ${theme === 'light' ? '#cccccc' : '#444444'}`,
              borderRadius: '5px',
              backgroundColor: theme === 'light' ? '#f9f9f9' : '#333333',
              color: theme === 'light' ? '#000000' : '#ffffff',
            }}
          />
        </label>
        <button
          type="submit"
          style={{
            padding: '10px',
            border: 'none',
            borderRadius: '5px',
            backgroundColor: theme === 'light' ? '#007BFF' : '#00C4FF',
            color: '#ffffff',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Generate Workout Plan
        </button>
      </form>

      {workoutPlan && (
        <div style={{ marginTop: '40px' }}>
          <h2>Generated Workout Plan</h2>
          {workoutPlan.map((day, index) => (
            <div key={index}>
              <h3>
                Day {index + 1}: {day.day}
              </h3>
              <ul>
                {day.exercises.map((exercise, idx) => (
                  <li key={idx}>
                    <strong>{exercise.hareket_adi}</strong> ({exercise.bolge}) -{' '}
                    {exercise.set_sayisi} sets of {exercise.tekrar_sayisi} reps, Equipment:{' '}
                    {exercise.ekipman}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
