import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ExerciseProgress() {
  const [userFitnessData, setUserFitnessData] = useState([]); // Kullanıcının yaptığı egzersizlerin verileri
  const [userInputSets, setUserInputSets] = useState({}); // Kullanıcının girdiği set sayıları
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

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
          setError(t('user_not_logged_in'));
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
          setError(t('no_data'));
        } else {
          setUserFitnessData(validExercises);
        }
      } catch (err) {
        console.error('Error:', err);
        setError(t('fetch_error'));
      } finally {
        setLoading(false);
      }
    };

    fetchProgressData();
  }, [t]);

  const handleInputChange = (exercise, value) => {
    setUserInputSets((prev) => ({ ...prev, [exercise]: Number(value) }));
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>{t('loading_progress')}</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', color: 'red', padding: '20px' }}>{error}</div>;
  }

  if (userFitnessData.length === 0) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>{t('no_exercise_data')}</div>;
  }

  return (
    <div style={{ padding: '20px', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>{t('exercise_progress')}</h1>
      {userFitnessData.map((exerciseData, index) => {
        const labels = exerciseData.data.map((d) => d.date);
        const actualSets = exerciseData.data.map((d) => d.sets);
        const expectedSets = actualSets.map((_, i) => (i === 0 ? actualSets[i] : actualSets[i - 1] + 1));
        const userSets = userInputSets[exerciseData.exercise] || 0;
        const lastExpectedSet = expectedSets[expectedSets.length - 1];

        return (
          <div key={index} style={{ marginBottom: '40px' }}>
            <h2 style={{ textAlign: 'center' }}>{exerciseData.exercise}</h2>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
              <label style={{ marginRight: '10px' }}>{t('your_sets')}:</label>
              <input
                type="number"
                value={userSets}
                onChange={(e) => handleInputChange(exerciseData.exercise, e.target.value)}
                style={{ width: '60px', textAlign: 'center' }}
              />
            </div>
            {userSets < lastExpectedSet ? (
              <div style={{ textAlign: 'center', color: 'red', marginBottom: '10px' }}>
                {t('keep_pushing', { target: lastExpectedSet })}
              </div>
            ) : (
              <div style={{ textAlign: 'center', color: 'green', marginBottom: '10px' }}>
                {t('well_done')}
              </div>
            )}
            <Bar
              data={{
                labels: [t('expected_progress'), t('your_progress')],
                datasets: [
                  {
                    label: `${exerciseData.exercise} ${t('expected_sets')}`,
                    data: [lastExpectedSet, userSets],
                    backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(75, 192, 192, 0.2)'],
                    borderColor: ['rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: t('sets'),
                    },
                  },
                },
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
