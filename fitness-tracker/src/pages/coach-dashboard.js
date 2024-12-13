import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../components/ThemeProvider';

const CoachDashboard = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [students, setStudents] = useState([]); // Öğrenci listesi
  const [error, setError] = useState(null); // Hata mesajı

  // Coach Dashboard verilerini API'den getir
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const coachId = sessionStorage.getItem('userId'); // Coach ID
        if (!coachId) throw new Error(t('missing_user_id'));

        const response = await fetch(`https://backend-u0ol.onrender.com/coach-students?coachId=${coachId}`);
        if (!response.ok) throw new Error(t('fetch_error'));

        const data = await response.json();
        setStudents(data); // Öğrenci listesi ayarlanır
      } catch (err) {
        setError(err.message);
      }
    };

    fetchStudents();
  }, [t]);

  return (
    <div
      style={{
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: theme === 'light' ? '#ffffff' : '#1e1e1e',
        color: theme === 'light' ? '#000000' : '#ffffff',
        minHeight: '100vh',
      }}
    >
      <h1>{t('coach_dashboard')}</h1>

      {/* Hata Mesajı */}
      {error && (
        <p style={{ color: 'red' }}>
          <strong>{error}</strong>
        </p>
      )}

      {/* Öğrenci Listesi */}
      {students.length > 0 ? (
        <div>
          <h2>{t('your_students')}</h2>
          <ul
            style={{
              listStyleType: 'none',
              padding: 0,
              margin: '20px 0',
            }}
          >
            {students.map((student) => (
              <li
                key={student.id}
                style={{
                  marginBottom: '10px',
                  padding: '10px',
                  borderRadius: '5px',
                  backgroundColor: theme === 'light' ? '#f9f9f9' : '#333333',
                  color: theme === 'light' ? '#000000' : '#ffffff',
                  border: `1px solid ${theme === 'light' ? '#cccccc' : '#444444'}`,
                }}
              >
                <strong>{student.name}</strong> - {t('fitness_level')}: {student.fitness_level}, {t('goal')}: {student.goal}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>{t('loading_students')}</p>
      )}
    </div>
  );
};

export default CoachDashboard;
