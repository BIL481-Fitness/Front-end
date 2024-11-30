import { useTranslation } from 'react-i18next';

export default function Schedule() {
  const { t } = useTranslation();

  return (
    <div
      style={{
        padding: '20px',
        textAlign: 'center',
        backgroundColor: 'inherit',
        color: 'inherit',
      }}
    >
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
    </div>
  );
}
