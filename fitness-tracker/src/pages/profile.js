import React, { useState, useEffect } from 'react';
import { useTheme } from '../components/ThemeProvider';

export default function Profile() {
  const { theme } = useTheme();

  // State to hold user or coach information
  const [info, setInfo] = useState({
    name: '',
    age: '',
    weight: '',
    height: '',
    fitness_level: '',
    bmi: '',
    daily_calories: '',
    goal: '',
    specialization: '',
    experience_level: '',
  });

  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState('');

  useEffect(() => {
    const role = sessionStorage.getItem('userRole');

    if (!role) {
      setError('Role not found. Please log in again.');
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        if (role === 'user') {
          const userId = sessionStorage.getItem('userId');
          if (!userId) {
            setError('User data not found. Please log in again.');
            setLoading(false);
            return;
          }

          if (isNaN(userId)) {
            throw new Error('Invalid user ID');
          }

          const response = await fetch(`https://backend-u0ol.onrender.com/user_info/${userId}`);
          if (response.ok) {
            const data = await response.json();
            setInfo({
              name: data.name,
              age: data.age,
              weight: data.weight,
              height: data.height,
              fitness_level: data.fitness_level,
              bmi: data.bmi,
              daily_calories: data.daily_calories,
              goal: data.goal,
              specialization: '',
              experience_level: '',
            });
          } else if (response.status === 500) {
            setError('Internal Server Error. Please try again later.');
          } else {
            const errorText = await response.text();
            setError(`Failed to fetch user data: ${errorText}`);
          }
        } else if (role === 'coach') {
          const coachId = sessionStorage.getItem('coachId');
          if (!coachId) {
            setError('Coach data not found. Please log in again.');
            setLoading(false);
            return;
          }

          if (isNaN(coachId)) {
            throw new Error('Invalid coach ID');
          }

          const response = await fetch(`https://backend-u0ol.onrender.com/coaches`);
          if (response.ok) {
            const data = await response.json(); // Array of coaches
            const coach = data.find((c) => c.id === parseInt(coachId, 10));

            if (!coach) {
              setError('Coach not found.');
            } else {
              setInfo({
                name: coach.name,
                age: coach.age,
                weight: coach.weight,
                height: coach.height,
                fitness_level: '',
                bmi: '',
                daily_calories: '',
                goal: '',
                specialization: coach.specialization,
                experience_level: coach.experience_level,
              });
            }
          } else if (response.status === 500) {
            setError('Internal Server Error. Please try again later.');
          } else {
            const errorText = await response.text();
            setError(`Failed to fetch coach data: ${errorText}`);
          }
        } else {
          setError('Invalid role. Please log in again.');
        }
      } catch (err) {
        console.error('Error fetching info:', err);
        setError('An error occurred while fetching information.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  const isCoach = sessionStorage.getItem('userRole') === 'coach';

  return (
    <div
      style={{
        backgroundColor: theme === 'light' ? '#ffffff' : '#1e1e1e',
        color: theme === 'light' ? '#000000' : '#ffffff',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>
        {isCoach ? 'My Coach Profile' : 'My Profile'}
      </h1>
      <form
        style={{
          maxWidth: '400px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
        }}
      >
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={info.name}
            readOnly
            style={inputStyle(theme)}
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={info.age}
            readOnly
            style={inputStyle(theme)}
          />
        </label>
        <label>
          Weight (kg):
          <input
            type="number"
            name="weight"
            value={info.weight}
            readOnly
            style={inputStyle(theme)}
          />
        </label>
        <label>
          Height (cm):
          <input
            type="number"
            name="height"
            value={info.height}
            readOnly
            style={inputStyle(theme)}
          />
        </label>

        {!isCoach && (
          <>
            <label>
              Fitness Level:
              <input
                type="number"
                name="fitness_level"
                value={info.fitness_level}
                readOnly
                style={inputStyle(theme)}
              />
            </label>
            <label>
              BMI:
              <input
                type="number"
                name="bmi"
                value={info.bmi}
                readOnly
                style={inputStyle(theme)}
              />
            </label>
            <label>
              Daily Calories:
              <input
                type="number"
                name="daily_calories"
                value={info.daily_calories}
                readOnly
                style={inputStyle(theme)}
              />
            </label>
            <label>
              Goal:
              <input
                type="text"
                name="goal"
                value={info.goal}
                readOnly
                style={inputStyle(theme)}
              />
            </label>
          </>
        )}

        {isCoach && (
          <>
            <label>
              Specialization:
              <input
                type="text"
                name="specialization"
                value={info.specialization}
                readOnly
                style={inputStyle(theme)}
              />
            </label>
            <label>
              Experience Level:
              <input
                type="number"
                name="experience_level"
                value={info.experience_level}
                readOnly
                style={inputStyle(theme)}
              />
            </label>
          </>
        )}
      </form>
    </div>
  );
}

function inputStyle(theme) {
  return {
    width: '100%',
    padding: '10px',
    border: `1px solid ${theme === 'light' ? '#cccccc' : '#444444'}`,
    borderRadius: '5px',
    backgroundColor: theme === 'light' ? '#f9f9f9' : '#333333',
    color: theme === 'light' ? '#000000' : '#ffffff',
  };
}
