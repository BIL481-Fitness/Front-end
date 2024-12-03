import { useTranslation } from 'react-i18next';
import { useTheme } from '../components/ThemeProvider'; // Import the theme hook
import { useState, useEffect } from 'react';

export default function Schedule() {
  const { t } = useTranslation();
  const { theme } = useTheme();  // Get the current theme from context

  const [schedule, setSchedule] = useState([]);  // State to store schedule data
  const [loading, setLoading] = useState(true);   // State to track loading status
  const [error, setError] = useState('');         // State to track errors

  useEffect(() => {
    // Get the userId from sessionStorage
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      setError('User ID not found. Please log in again.');
      setLoading(false);
      return;
    }

    // Fetch schedule data from the API using the userId
    const fetchSchedule = async () => {
      try {
        const response = await fetch(`https://backend-u0ol.onrender.com/workout_plans/${userId}`);
        
        if (response.ok) {
          const data = await response.json();  // Parse JSON response
          
          // Check if workout plans were found
          if (data.detail && data.detail === 'Workout plans not found') {
            setError('No data found for the given user.');
          } else {
            setSchedule(data);  // Update state with the fetched schedule data
          }
        } else if (response.status === 422) {
          setError('Validation error: Please check your request.');
        } else {
          const errorText = await response.text();
          setError(`Failed to fetch schedule: ${errorText}`);
        }
      } catch (err) {
        console.error('Error fetching schedule:', err);
        setError('An error occurred while fetching the schedule.');
      } finally {
        setLoading(false);  // Stop loading once the API request is done
      }
    };

    fetchSchedule();
  }, []);  // Empty dependency array ensures this runs once on mount

  // Show loading or error if applicable
  if (loading) {
    return <div>Loading...</div>;
  }

  // Display error message or schedule data
  return (
    <div
      style={{
        padding: '20px',
        textAlign: 'center',
        backgroundColor: theme === 'light' ? '#ffffff' : '#1e1e1e',
        color: theme === 'light' ? '#000000' : '#ffffff',
      }}
    >
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>My Schedule</h1>

      {/* Show error message if any */}
      {error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : (
        <ul
          style={{
            listStyleType: 'none',
            padding: 0,
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          {schedule.map((item, index) => (
            <li
              key={index}
              style={{
                padding: '15px',
                border: `1px solid ${theme === 'light' ? '#cccccc' : '#444444'}`,
                borderRadius: '5px',
                marginBottom: '10px',
                backgroundColor: theme === 'light' ? '#f9f9f9' : '#333333',
              }}
            >
              <strong>{item.day}:</strong> {item.activity}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
