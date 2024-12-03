import { useTranslation } from 'react-i18next';
import { useTheme } from '../components/ThemeProvider'; 
import { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';  // Import file-saver

export default function Schedule() {
  const { t } = useTranslation();
  const { theme } = useTheme();

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
          if (data[0] && data[0].workout_data) {
            // Parse the workout_data from the API response
            const workoutData = JSON.parse(data[0].workout_data.replace(/'/g, '"'));
            
            setSchedule(workoutData);  // Update state with the parsed workout data
          } else {
            setError('No workout data available.');
          }
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

  // Handle Export Schedule button click
  const handleExportSchedule = async () => {
    // Get the userId from sessionStorage
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      setError('User ID not found. Please log in again.');
      return;
    }

    try {
      // Make API request to export the schedule as XLSX
      const response = await fetch(`https://backend-u0ol.onrender.com/export_workout_plan/${userId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',  // For XLSX format
        },
      });

      if (!response.ok) {
        throw new Error('Failed to export schedule.');
      }

      // Read the response as a blob (binary data)
      const blob = await response.blob();
      saveAs(blob, 'workout_schedule.xlsx');  // Use file-saver to trigger the download
    } catch (error) {
      console.error('Error exporting schedule:', error);
      setError('An error occurred while exporting the schedule.');
    }
  };

  // Show loading or error if applicable
  if (loading) {
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
        <div>Loading...</div>
      </div>
    );
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
      {/* Flex container with vertical direction */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Export Schedule Button */}
        <button
          onClick={handleExportSchedule}
          style={{
            padding: '10px 20px',
            backgroundColor: theme === 'light' ? '#007BFF' : '#00C4FF',
            color: '#ffffff',
            fontWeight: 'bold',
            borderRadius: '5px',
            cursor: 'pointer',
            marginBottom: '20px', // Add space below the button
            alignSelf: 'flex-end', // Align button to the right
          }}
        >
          Export Schedule
        </button>

        {/* Heading for My Schedule */}
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>My Schedule</h1>
      </div>

      {/* Show error message if any */}
      {error ? (
        <div style={{ color: 'red' }}>
          <strong>{error}</strong>
        </div>
      ) : (
        <div style={{ padding: '20px' }}>
          {/* Loop through the parsed workout data */}
          {Object.keys(schedule).map((day, index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
              <h2>{`Day ${index + 1}: ${day}`}</h2>
              <ul
                style={{
                  listStyleType: 'none',
                  padding: 0,
                  margin: '0 auto',
                  maxWidth: '700px',
                  textAlign: 'left',
                }}
              >
                {schedule[day].map((exercise, exerciseIndex) => (
                  <li
                    key={exerciseIndex}
                    style={{
                      padding: '10px',
                      border: `1px solid ${theme === 'light' ? '#cccccc' : '#444444'}`,
                      borderRadius: '5px',
                      marginBottom: '10px',
                      backgroundColor: theme === 'light' ? '#f9f9f9' : '#333333',
                    }}
                  >
                    <strong>{`${exercise.hareket_adi} (${exercise.bolge})`}</strong> -{' '}
                    {exercise.set_sayisi} sets of {exercise.tekrar_sayisi} reps, Equipment: {exercise.ekipman}
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
