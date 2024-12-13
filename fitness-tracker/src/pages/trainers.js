import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from '../components/ThemeProvider';
import { useTranslation } from 'react-i18next';

export default function Trainers() {
  const { theme } = useTheme();
  const router = useRouter();
  const { t } = useTranslation();

  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCoach, setSelectedCoach] = useState(null);

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    const userRole = sessionStorage.getItem('userRole');

    if (!isLoggedIn || userRole !== 'user') {
      router.push('/login');
      return;
    }

    const fetchCoaches = async () => {
      try {
        const response = await fetch('https://backend-u0ol.onrender.com/coaches', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCoaches(data);
        } else {
          const errorMessage = t('fetch_error', { status: response.status });
          console.error(errorMessage);
          setError(errorMessage);
        }
      } catch (err) {
        console.error(t('network_error'), err);
        setError(t('network_error'));
      } finally {
        setLoading(false);
      }
    };

    fetchCoaches();
  }, [router, t]);

  const handleSelectCoach = async (coachId) => {
    const userId = sessionStorage.getItem('userId');

    try {
      const response = await fetch('https://backend-u0ol.onrender.com/select_coach', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          coach_id: coachId,
        }),
      });

      if (response.ok) {
        alert(t('coach_selected'));
        setSelectedCoach(coachId);
      } else {
        const errorData = await response.json();
        alert(errorData.detail?.[0]?.msg || t('coach_select_error'));
      }
    } catch (err) {
      alert(t('network_error'));
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>{t('loading_coaches')}</div>;
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
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>{t('available_coaches')}</h1>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          justifyContent: 'center',
        }}
      >
        {coaches.map((coach) => (
          <div
            key={coach.id}
            style={{
              padding: '15px',
              border: `1px solid ${theme === 'light' ? '#cccccc' : '#444444'}`,
              borderRadius: '5px',
              backgroundColor: theme === 'light' ? '#f9f9f9' : '#333333',
              width: '250px',
              textAlign: 'center',
            }}
          >
            <h3>{coach.name}</h3>
            <p>{t('specialization')}: {coach.specialization}</p>
            <p>{t('experience_level')}: {coach.experience_level}</p>
            <button
              onClick={() => handleSelectCoach(coach.id)}
              style={{
                marginTop: '10px',
                padding: '10px',
                backgroundColor: selectedCoach === coach.id ? '#10B981' : '#3B82F6',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
              disabled={selectedCoach === coach.id}
            >
              {selectedCoach === coach.id ? t('selected') : t('select_coach')}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
