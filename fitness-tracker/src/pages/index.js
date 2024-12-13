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
      <h1>{t('welcome_home')}</h1>
      <p>{t('login_success')}</p>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '20px',
        }}
      >
        {userRole === 'user' && (
          <Link href="/profile" passHref>
            <div
              style={{
                display: 'inline-block',
                padding: '15px 25px',
                backgroundColor: '#5a42f5',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'pointer',
              }}
            >
              {t('my_profile')}
            </div>
          </Link>
        )}
        {userRole === 'user' && (
          <Link href="/schedule" passHref>
            <div
              style={{
                display: 'inline-block',
                padding: '15px 25px',
                backgroundColor: '#5a42f5',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'pointer',
              }}
            >
              {t('my_program')}
            </div>
          </Link>
        )}
        {userRole === 'user' && (
          <Link href="/trainers" passHref>
            <div
              style={{
                display: 'inline-block',
                padding: '15px 25px',
                backgroundColor: '#5a42f5',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'pointer',
              }}
            >
              {t('personal_trainers')}
            </div>
          </Link>
        )}
        {userRole === 'coach' && (
          <Link href="/students" passHref>
            <div
              style={{
                display: 'inline-block',
                padding: '15px 25px',
                backgroundColor: '#5a42f5',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'pointer',
              }}
            >
              {t('my_students')}
            </div>
          </Link>
        )}
        {userRole === 'user' && (
          <Link href="/progress" passHref>
            <div
              style={{
                display: 'inline-block',
                padding: '15px 25px',
                backgroundColor: '#5a42f5',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'pointer',
              }}
            >
              {t('my_progress')}
            </div>
          </Link>
        )}
        {userRole === 'user' && (
          <Link href="/create-workout" passHref>
            <div
              style={{
                display: 'inline-block',
                padding: '15px 25px',
                backgroundColor: '#5a42f5',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'pointer',
              }}
            >
              {t('create_workout')}
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
