import React, { useState, useEffect } from 'react';
import { useTheme } from '../components/ThemeProvider';

export default function Profile() {
  const { theme } = useTheme();

  // State to hold user information
  const [userInfo, setUserInfo] = useState({
    name: '',
    age: '',
    weight: '',
    height: '',
    fitness_level: '',
    bmi: '',
    daily_calories: '',
    goal: '',
  });

  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(''); // State to track errors

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userId = sessionStorage.getItem('userId'); // Retrieve the stored userId

      if (!userId) {
        setError('User data not found. Please log in again.');
        setLoading(false);
        return;
      }

      try {
        if (isNaN(userId)) {
          throw new Error('Invalid user ID');
        }

        const response = await fetch(`https://backend-u0ol.onrender.com/user_info/${userId}`);
        if (response.ok) {
          const data = await response.json(); // Parse JSON response
          setUserInfo({
            name: data.name,
            age: data.age,
            weight: data.weight,
            height: data.height,
            fitness_level: data.fitness_level,
            bmi: data.bmi,
            daily_calories: data.daily_calories,
            goal: data.goal,
          }); // Update state with user data
        } else if (response.status === 500) {
          setError('Internal Server Error. Please try again later.');
        } else {
          const errorText = await response.text();
          setError(`Failed to fetch user data: ${errorText}`);
        }
      } catch (err) {
        console.error('Error fetching user info:', err);
        setError('An error occurred while fetching user information.');
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };

    fetchUserInfo();
  }, []); // Empty dependency array ensures this runs once on mount

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div
      style={{
        backgroundColor: theme === 'light' ? '#ffffff' : '#1e1e1e',
        color: theme === 'light' ? '#000000' : '#ffffff',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>My Profile</h1>
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
            value={userInfo.name}
            readOnly
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
          Age:
          <input
            type="number"
            name="age"
            value={userInfo.age}
            readOnly
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
            name="weight"
            value={userInfo.weight}
            readOnly
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
            name="height"
            value={userInfo.height}
            readOnly
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
          Fitness Level:
          <input
            type="number"
            name="fitness_level"
            value={userInfo.fitness_level}
            readOnly
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
          BMI:
          <input
            type="number"
            name="bmi"
            value={userInfo.bmi}
            readOnly
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
          Daily Calories:
          <input
            type="number"
            name="daily_calories"
            value={userInfo.daily_calories}
            readOnly
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
          Goal:
          <input
            type="text"
            name="goal"
            value={userInfo.goal}
            readOnly
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
      </form>
    </div>
  );
}
