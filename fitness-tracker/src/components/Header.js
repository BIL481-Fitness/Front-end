'use client';

import { useRouter } from 'next/router';
import { useTheme } from './ThemeProvider';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Header = () => {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const [userRole, setUserRole] = useState(null);

  const isLoginPage = router.pathname === '/login';

  useEffect(() => {
    const role = sessionStorage.getItem('userRole');
    setUserRole(role);
  }, []);

  const changeLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'tr' : 'en';
    i18n.changeLanguage(newLanguage);
  };

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
              color: theme === 'light' ? '#4B0082' : '#9370DB',
              cursor: 'pointer',
            }}
          >
            FITTrack
          </span>
        </Link>
      </div>
      
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          padding: '10px 20px',
          backgroundColor: theme === 'dark' ? '#333' : '#fff',
          color: theme === 'dark' ? '#fff' : '#333',
          border: '1px solid',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        {theme === 'dark' ? t('lightMode') : t('darkMode')}
      </button>

      {/* Language Toggle Button */}
      <button
        onClick={changeLanguage}
        style={{
          position: 'fixed',
          bottom: '70px',
          right: '20px',
          padding: '10px',
          backgroundColor: theme === 'light' ? '#5a42f5' : '#5a42f5',
          border: 'none',
          borderRadius: '5px',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          cursor: 'pointer',
        }}
      >
        <img
          src={i18n.language === 'en' ? '/turkey-flag.png' : '/uk-flag.png'}
          alt="language"
          style={{ width: '20px', height: '20px' }}
        />
        {i18n.language === 'en' ? 'Türkçe' : 'English'}
      </button>
    </header>
  );
};

export default Header;
