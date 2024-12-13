import { useTranslation } from 'react-i18next';
import { useTheme } from '../components/ThemeProvider';
import { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';

export default function Schedule() {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      setError(t('user_not_logged_in'));
      setLoading(false);
      return;
    }

    const fetchSchedule = async () => {
      try {
        const response = await fetch(`https://backend-u0ol.onrender.com/workout_plans/${userId}`);
        if (response.ok) {
          const data = await response.json();
          if (data[0] && data[0].workout_data) {
            const workoutData = JSON.parse(data[0].workout_data.replace(/'/g, '"'));
            setSchedule(workoutData);
          } else {
            setError(t('no_workout_data'));
          }
        } else {
          const errorText = await response.text();
          setError(t('fetch_error', { status: response.status, message: errorText }));
        }
      } catch (err) {
        console.error(t('network_error'), err);
        setError(t('network_error'));
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [t]);

  const handleExportSchedule = async () => {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      setError(t('user_not_logged_in'));
      return;
    }

    try {
      const response = await fetch(`https://backend-u0ol.onrender.com/export_workout_plan/${userId}`, {
        method: 'GET',
        headers: {
          Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        },
      });

      if (!response.ok) {
        throw new Error(t('export_error'));
      }

      const blob = await response.blob();
      saveAs(blob, t('workout_schedule_file_name'));
    } catch (error) {
      console.error(t('export_error'), error);
      setError(t('export_error'));
    }
  };

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
        <h1>{t('my_schedule')}</h1>
        <div>{t('loading')}</div>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: '20px',
        textAlign: 'center',
        backgroundColor: theme === 'light' ? '#ffffff' : '#1e1e1e',
        color: theme === 'light' ? '#000000' : '#ffffff',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <button
          onClick={handleExportSchedule}
          style={{
            padding: '10px 20px',
            backgroundColor: theme === 'light' ? '#007BFF' : '#00C4FF',
            color: '#ffffff',
            fontWeight: 'bold',
            borderRadius: '5px',
            cursor: 'pointer',
            marginBottom: '20px',
          }}
        >
          {t('export_schedule')}
        </button>
        <h1>{t('my_schedule')}</h1>
      </div>

      {error ? (
        <div style={{ color: 'red' }}>
          <strong>{error}</strong>
        </div>
      ) : (
        <div>
          {Object.keys(schedule).map((day, index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
              <h2>
                {t('day')} {index + 1}: {day}
              </h2>
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
                    <strong>
                      {exercise.hareket_adi} ({exercise.bolge})
                    </strong>{' '}
                    - {exercise.set_sayisi} {t('sets')} {exercise.tekrar_sayisi} {t('reps')},{' '}
                    {t('equipment')}: {exercise.ekipman}
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
