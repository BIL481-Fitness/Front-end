import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const { t } = useTranslation();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Check if the user is logged in and retrieve their role
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    const role = sessionStorage.getItem('userRole');

    if (!isLoggedIn) {
      router.push('/login');
    } else {
      setUserRole(role);
    }
  }, [router]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1>Welcome to Home Page!</h1>
      <p>You have successfully logged in.</p>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '20px',
        }}
      >
        {userRole === 'user' && (
          <Link href="/schedule" passHref>
            <div
              style={{
                display: 'inline-block',
                padding: '15px 25px',
                backgroundColor: '#3B82F6',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'pointer',
              }}
            >
              My Program
            </div>
          </Link>
        )}
        {userRole === 'user' && (
          <Link href="/trainers" passHref>
            <div
              style={{
                display: 'inline-block',
                padding: '15px 25px',
                backgroundColor: '#10B981',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'pointer',
              }}
            >
              Personal Trainers
            </div>
          </Link>
        )}
        {userRole === 'coach' && (
          <Link href="/students" passHref>
            <div
              style={{
                display: 'inline-block',
                padding: '15px 25px',
                backgroundColor: '#10B981',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'pointer',
              }}
            >
              My Students
            </div>
          </Link>
        )}
        {userRole === 'user' && (
          <Link href="/progress" passHref>
            <div
              style={{
                display: 'inline-block',
                padding: '15px 25px',
                backgroundColor: '#F59E0B',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'pointer',
              }}
            >
              My Progress
            </div>
          </Link>
        )}
        <Link href="/create-workout" passHref>
          <div
            style={{
              display: 'inline-block',
              padding: '15px 25px',
              backgroundColor: '#EF4444',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              cursor: 'pointer',
            }}
          >
            Create Workout
          </div>
        </Link>
      </div>
    </div>
  );
}
