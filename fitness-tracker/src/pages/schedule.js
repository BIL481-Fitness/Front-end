import { useTranslation } from 'react-i18next';

export default function Schedule() {
  const { t } = useTranslation();

  const schedule = [
    { day: 'Monday', activity: 'Cardio and Stretching' },
    { day: 'Wednesday', activity: 'Strength Training' },
    { day: 'Friday', activity: 'Yoga and Flexibility' },
  ];

  return (
    <div
      style={{
        padding: '20px',
        textAlign: 'center',
        backgroundColor: 'inherit',
        color: 'inherit',
      }}
    >
<<<<<<< HEAD
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>My Schedule</h1>
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
=======
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>{t('programHeader')}</h1>
      <p>{t('programDescription')}</p>

      <div style={{ marginTop: '20px' }}>
        <h2>{t('workoutPlan')}</h2>
        <p>{t('mondayWorkout')}</p>
        <p>{t('tuesdayWorkout')}</p>
        <p>{t('wednesdayWorkout')}</p>
        <p>{t('thursdayWorkout')}</p>
        <p>{t('fridayWorkout')}</p>
        <p>{t('saturdayWorkout')}</p>
        <p>{t('sundayWorkout')}</p>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>{t('intensityLevel')}</h3>
      </div>
>>>>>>> a97478f49b99c5a41a5b0511b0aa426bcde46464
    </div>
  );
}
