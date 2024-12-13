import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ExerciseProgress() {
  const [userFitnessData, setUserFitnessData] = useState([]); // Kullanıcının yaptığı egzersizlerin verileri
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const exerciseList = [
    "Bench Press",
    "Incline Bench Press",
    "Chest Fly",
    "Push-Up",
    "Cable Crossover",
    "Dumbbell Bench Press",
    "Pec Deck Machine",
    "Decline Bench Press",
    "Dips",
    "Landmine Press",
    "Overhead Press",
    "Lateral Raise",
    "Front Raise",
    "Arnold Press",
    "Machine Shoulder Press",
    "Cable Face Pull",
    "Reverse Fly",
    "Seated Dumbbell Press",
    "Upright Row",
    "Dumbbell Shrug",
    "Barbell Curl",
    "Dumbbell Curl",
    "Concentration Curl",
    "Hammer Curl",
    "Preacher Curl",
    "Cable Curl",
    "Incline Dumbbell Curl",
    "Zottman Curl",
    "Reverse Curl",
    "Spider Curl",
    "Wrist Curl",
    "Reverse Wrist Curl",
    "Farmer's Walk",
    "Tricep Pushdown",
    "Skull Crushers",
    "Close Grip Bench Press",
    "Overhead Tricep Extension",
    "Pull-Up",
    "Lat Pulldown",
    "Barbell Row",
    "Deadlift",
    "Squat",
    "Leg Press",
    "Lunges",
    "Romanian Deadlift",
    "Leg Curl",
    "Leg Extension",
    "Bulgarian Split Squat",
    "Calf Raise",
    "Hack Squat",
    "Step-Up",
  ];

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        const user_id = sessionStorage.getItem('userId'); // Kullanıcı ID'sini alıyoruz.
        if (!user_id) {
          setError('User not logged in. Please log in to view your progress.');
          setLoading(false);
          return;
        }

        let validExercises = [];

        for (const exercise of exerciseList) {
          const apiUrl = `https://backend-u0ol.onrender.com/user_fitness_data/${user_id}/exercise/${encodeURIComponent(exercise)}`;
          const response = await fetch(apiUrl);

          if (response.ok) {
            const data = await response.json();
            if (data.length > 0) {
              validExercises.push({
                exercise,
                data,
              });
            }
          }
        }

        if (validExercises.length === 0) {
          setError('No data available for any exercises.');
        } else {
          setUserFitnessData(validExercises);
        }
      } catch (err) {
        console.error('Error:', err);
        setError('An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchProgressData();
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Loading progress data...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', color: 'red', padding: '20px' }}>{error}</div>;
  }

  if (userFitnessData.length === 0) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>No exercise data to display.</div>;
  }

  return (
    <div style={{ padding: '20px', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Exercise Progress</h1>
      {userFitnessData.map((exerciseData, index) => (
        <div key={index} style={{ marginBottom: '40px' }}>
          <h2 style={{ textAlign: 'center' }}>{exerciseData.exercise}</h2>
          <Bar
            data={{
              labels: exerciseData.data.map((d) => d.date),
              datasets: [
                {
                  label: `${exerciseData.exercise} Sets`,
                  data: exerciseData.data.map((d) => d.sets),
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  borderColor: 'rgba(75, 192, 192, 1)',
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              responsive: true,
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Date',
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: 'Sets',
                  },
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      ))}
    </div>
  );
}
