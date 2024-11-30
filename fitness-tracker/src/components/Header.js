import { useRouter } from 'next/router';
import { useTheme } from './ThemeProvider';
import Link from 'next/link';

const Header = () => {
  const router = useRouter();
  const { theme } = useTheme();

  // Sadece login sayfasında FITTrack gösterilsin
  const isLoginPage = router.pathname === '/login';

  return (
    <header
      style={{
        padding: '20px 40px',
        display: 'flex',
        justifyContent: isLoginPage ? 'center' : 'space-between',
        alignItems: 'center',
        backgroundColor: theme === 'light' ? '#ffffff' : '#1e1e1e',
        color: theme === 'light' ? '#000000' : '#ffffff',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      <div>
        <Link href="/" passHref>
          <span
            style={{
              textDecoration: 'none',
              fontSize: '1.8rem',
              fontWeight: 'bold',
              color: theme === 'light' ? '#241F6B' : '#9370DB',
              cursor: 'pointer',
            }}
          >
            FITTrack
          </span>
        </Link>
      </div>
      {!isLoginPage && (
        <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Link href="/profile">
            <span
              style={{
                color: theme === 'light' ? '#000000' : '#ffffff',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              My profile
            </span>
          </Link>
          <Link href="/schedule">
            <span
              style={{
                color: theme === 'light' ? '#000000' : '#ffffff',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              My program
            </span>
          </Link>
          <Link href="/progress">
            <span
              style={{
                color: theme === 'light' ? '#000000' : '#ffffff',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              My progress
            </span>
          </Link>
          <Link href="/trainers">
            <span
              style={{
                color: theme === 'light' ? '#000000' : '#ffffff',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              Personal Trainers
            </span>
          </Link>
          <Link href="/create-workout">
            <button
              style={{
                padding: '10px 20px',
                backgroundColor: theme === 'light' ? '#241F6B' : '#9370DB',
                color: '#ffffff',
                border: 'none',
                borderRadius: '5px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              Create Workout
            </button>
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
