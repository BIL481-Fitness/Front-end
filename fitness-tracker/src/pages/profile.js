import React, { useState, useEffect } from 'react';
import { useTheme } from '../components/ThemeProvider';
import { useTranslation } from 'react-i18next';

export default function Profile() {
  const { theme } = useTheme();
  const { t } = useTranslation();

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
      setError(t('role_missing'));
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        if (role === 'user') {
          const userId = sessionStorage.getItem('userId');
          if (!userId) {
            setError(t('user_data_missing'));
            setLoading(false);
            return;
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
          } else {
            setError(t('fetch_error'));
          }
        } else if (role === 'coach') {
          const coachId = sessionStorage.getItem('coachId');
          if (!coachId) {
            setError(t('coach_data_missing'));
            setLoading(false);
            return;
          }

          const response = await fetch(`https://backend-u0ol.onrender.com/coaches`);
          if (response.ok) {
            const data = await response.json();
            const coach = data.find((c) => c.id === parseInt(coachId, 10));
            if (!coach) {
              setError(t('coach_not_found'));
            } else {
              setInfo({
                name: coach.name,
                age: coach.age,
                weight: coach.weight,
                height: coach.height,
                specialization: coach.specialization,
                experience_level: coach.experience_level,
              });
            }
          } else {
            setError(t('fetch_error'));
          }
        } else {
          setError(t('invalid_role'));
        }
      } catch (err) {
        setError(t('unexpected_error'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [t]);

  if (loading) {
    return <div>{t('loading')}</div>;
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
        {isCoach ? t('coach_profile') : t('user_profile')}
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
          {t('name')}:
          <input
            type="text"
            name="name"
            value={info.name}
            readOnly
            style={inputStyle(theme)}
          />
        </label>
        <label>
          {t('age')}:
          <input
            type="number"
            name="age"
            value={info.age}
            readOnly
            style={inputStyle(theme)}
          />
        </label>
        <label>
          {t('weight')} (kg):
          <input
            type="number"
            name="weight"
            value={info.weight}
            readOnly
            style={inputStyle(theme)}
          />
        </label>
        <label>
          {t('height')} (cm):
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
              {t('fitness_level')}:
              <input
                type="number"
                name="fitness_level"
                value={info.fitness_level}
                readOnly
                style={inputStyle(theme)}
              />
            </label>
            <label>
              {t('bmi')}:
              <input
                type="number"
                name="bmi"
                value={info.bmi}
                readOnly
                style={inputStyle(theme)}
              />
            </label>
            <label>
              {t('daily_calories')}:
              <input
                type="number"
                name="daily_calories"
                value={info.daily_calories}
                readOnly
                style={inputStyle(theme)}
              />
            </label>
            <label>
              {t('goal')}:
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
              {t('specialization')}:
              <input
                type="text"
                name="specialization"
                value={info.specialization}
                readOnly
                style={inputStyle(theme)}
              />
            </label>
            <label>
              {t('experience_level')}:
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
