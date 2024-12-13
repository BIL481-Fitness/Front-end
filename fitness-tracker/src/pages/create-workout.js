import { useState, useEffect } from 'react';
import { useTheme } from '../components/ThemeProvider';
import { useTranslation } from 'react-i18next';

export default function CreateWorkout() {
  const { theme } = useTheme();
  const { t } = useTranslation();

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
        console.error(t('user_id_missing'));
      } else {
        console.log(t('user_id'), userId);
      }
    }
  }, [t]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!age || !weight || !height || !days) {
      setError(t('fill_all_fields'));
      return;
    }

    if (parseInt(days, 10) > 7) {
      setError(t('days_exceed'));
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
        setError(t('user_id_missing_login'));
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
        console.error(t('api_error'), errorData);
        setError(t('workout_issue'));
      }
    } catch (error) {
      console.error(t('fetch_error'), error);
      setError(t('fetch_error_occurred'));
    }
  };

  const handleDaysChange = (e) => {
    const value = e.target.value;
    if (value > 7) {
      setError(t('days_exceed'));
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
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>{t('create_workout_title')}</h1>

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
          {t('age')}:
          <input
            type="number"
            placeholder={t('enter_age')}
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
          {t('weight')} (kg):
          <input
            type="number"
            placeholder={t('enter_weight')}
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
          {t('height')} (cm):
          <input
            type="number"
            placeholder={t('enter_height')}
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
          {t('days_per_week')}:
          <input
            type="number"
            placeholder={t('enter_days')}
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
          {t('generate_workout')}
        </button>
      </form>

      {workoutPlan && (
        <div style={{ marginTop: '40px' }}>
          <h2>{t('generated_workout')}</h2>
          {workoutPlan.map((day, index) => (
            <div key={index}>
              <h3>
                {t('day')} {index + 1}: {day.day}
              </h3>
              <ul>
                {day.exercises.map((exercise, idx) => (
                  <li key={idx}>
                    <strong>{exercise.hareket_adi}</strong> ({exercise.bolge}) -{' '}
                    {exercise.set_sayisi} {t('sets_of')} {exercise.tekrar_sayisi}{' '}
                    {t('reps')}, {t('equipment')}: {exercise.ekipman}
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
