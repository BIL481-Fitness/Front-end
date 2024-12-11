import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from '../components/ThemeProvider';

export default function Trainers() {
  const { theme } = useTheme();
  const router = useRouter();
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCoach, setSelectedCoach] = useState(null);

  useEffect(() => {
    // Ensure the user is logged in and has the correct role
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    const userRole = sessionStorage.getItem('userRole');

    if (!isLoggedIn || userRole !== 'user') {
      router.push('/login'); // Redirect unauthorized users
      return;
    }

    // Fetch the list of coaches
    const fetchCoaches = async () => {
      try {
        const response = await fetch('https://backend-u0ol.onrender.com/coaches');
        if (response.ok) {
          const data = await response.json();
          setCoaches(data); // Update the state with the fetched coaches
        } else {
          setError('Failed to fetch coaches.');
        }
      } catch (err) {
        setError('A network error occurred. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCoaches();
  }, [router]);

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
        const result = await response.text();
        alert(`Coach selected successfully: ${result}`);
        setSelectedCoach(coachId); // Update the selected coach state
      } else {
        const errorData = await response.json();
        alert(errorData.detail?.[0]?.msg || 'An error occurred while selecting the coach.');
      }
    } catch (err) {
      alert('A network error occurred. Please try again later.');
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Loading coaches...</div>;
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
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Available Coaches</h1>
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
            <p>Specialization: {coach.specialization}</p>
            <p>Experience Level: {coach.experience_level}</p>
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
              {selectedCoach === coach.id ? 'Selected' : 'Select Coach'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
