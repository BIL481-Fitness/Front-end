import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { useTheme } from '../components/ThemeProvider';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Progress() {
  const { theme } = useTheme();
  const [userFitnessData, setUserFitnessData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState('Bench Press'); // Default exercise
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
    "Reverse Curl",
    "Zottman Curl",
    "Hammer Curl",
    "Preacher Curl",
    "Plate Pinch",
    "Cable Curl",
    "Reverse Barbell Curl",
    "Tricep Pushdown",
    "Skull Crushers",
    "Dips",
    "Close Grip Bench Press",
    "Overhead Tricep Extension",
    "Tricep Kickback",
    "Rope Tricep Extension",
    "Tricep Dips (Bench)",
    "One-Arm Overhead Extension",
    "Cable Overhead Tricep Extension",
    "Pull-Up",
    "Lat Pulldown",
    "Barbell Row",
    "Deadlift",
    "T-Bar Row",
    "Seated Row",
    "Dumbbell Row",
    "Face Pull",
    "Hyperextension",
    "Chin-Up",
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
        const userId = sessionStorage.getItem('userId'); // userId'yi alıyoruz.
  
        if (!userId) {
          setError('User not logged in. Please log in to view your progress.');
          setLoading(false);
          return;
        }
  
        // API çağrısını user_id formatında yapıyoruz.
        const apiUrl = `https://backend-u0ol.onrender.com/user_fitness_data/${userId}/exercise/${encodeURIComponent(selectedExercise)}`;
  
        const response = await fetch(apiUrl);
  
        if (response.ok) {
          const fitnessData = await response.json();
  
          if (fitnessData.length === 0) {
            setError('No progress data available for this exercise.');
            setUserFitnessData([]);
            setLabels([]);
            return;
          }
  
          const labels = fitnessData.map((data) => data.week);
          const weightData = fitnessData.map((data) => data.weight);
  
          setLabels(labels);
          setUserFitnessData(weightData);
        } else {
          const errorText = await response.text();
          setError(`Failed to fetch progress data: ${errorText}`);
        }
      } catch (err) {
        console.error('Error fetching progress data:', err);
        setError('A network error occurred. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchProgressData();
  }, [selectedExercise]);
  
  

  const data = {
    labels: labels.length > 0 ? labels : ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        label: `Weight Lifted (kg) - ${selectedExercise}`,
        data: userFitnessData.length > 0 ? userFitnessData : [50, 55, 60, 65, 70, 75],
        borderColor: '#00C4FF',
        backgroundColor: 'rgba(0, 196, 255, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: theme === 'light' ? '#000000' : '#ffffff',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: theme === 'light' ? '#000000' : '#ffffff',
        },
        grid: {
          color: theme === 'light' ? '#cccccc' : '#444444',
        },
      },
      y: {
        ticks: {
          color: theme === 'light' ? '#000000' : '#ffffff',
        },
        grid: {
          color: theme === 'light' ? '#cccccc' : '#444444',
        },
      },
    },
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Loading progress data...</div>;
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', color: 'red', padding: '20px' }}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>My Progress</h1>

      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <label htmlFor="exercise-select" style={{ marginRight: '10px' }}>
          Select Exercise:
        </label>
        <select
          id="exercise-select"
          value={selectedExercise}
          onChange={(e) => setSelectedExercise(e.target.value)}
          style={{
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #cccccc',
            backgroundColor: theme === 'light' ? '#ffffff' : '#333333',
            color: theme === 'light' ? '#000000' : '#ffffff',
          }}
        >
          {exerciseList.map((exercise, index) => (
            <option key={index} value={exercise}>
              {exercise}
            </option>
          ))}
        </select>
      </div>

      <Line data={data} options={options} />
    </div>
  );
}
