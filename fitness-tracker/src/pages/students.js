import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from '../components/ThemeProvider';
import { useTranslation } from 'react-i18next';

export default function MyStudents() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const router = useRouter();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Ensure the user is logged in and has the correct role
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    const userRole = sessionStorage.getItem('userRole');
    const coachId = sessionStorage.getItem('coachId'); // Retrieve coach ID correctly

    if (!isLoggedIn || userRole !== 'coach') {
      router.push('/login'); // Redirect unauthorized users
      return;
    }

    if (!coachId) {
      setError(t('coach_id_not_found'));
      setLoading(false);
      return;
    }

    const fetchStudents = async () => {
      try {
        const response = await fetch(`https://backend-u0ol.onrender.com/coach/${coachId}/students`);
        if (response.ok) {
          const data = await response.json();
          setStudents(data); // Update students state with API data
        } else if (response.status === 422) {
          const errorData = await response.json();
          setError(errorData.detail?.[0]?.msg || t('validation_error'));
        } else {
          setError(t('unexpected_error'));
        }
      } catch (err) {
        setError(t('network_error'));
      } finally {
        setLoading(false); // Stop loading state
      }
    };

    fetchStudents();
  }, [router, t]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        {t('loading_students')}
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', color: 'red', padding: '20px' }}>
        <p>{error}</p>
      </div>
    );
  }

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
        {t('my_students')}
      </h1>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          justifyContent: 'center',
        }}
      >
        {students.map((student) => (
          <div
            key={student.id}
            style={{
              padding: '15px',
              border: `1px solid ${theme === 'light' ? '#cccccc' : '#444444'}`,
              borderRadius: '5px',
              backgroundColor: theme === 'light' ? '#f9f9f9' : '#333333',
              width: '250px',
              textAlign: 'center',
            }}
          >
            <h3>{student.name}</h3>
            <p>{t('age')}: {student.age}</p>
            <p>{t('weight')}: {student.weight} kg</p>
            <p>{t('height')}: {student.height} cm</p>
            <p>{t('fitness_level')}: {student.fitness_level}</p>
            <p>{t('bmi')}: {student.bmi}</p>
            <p>{t('daily_calories')}: {student.daily_calories}</p>
            <p>{t('goal')}: {student.goal}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
