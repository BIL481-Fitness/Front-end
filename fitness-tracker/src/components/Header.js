import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        borderBottom: '1px solid #e5e5e5',
      }}
    >
      {/* Sol Taraf: Logo */}
      <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#1e1e1e' }}>
        <Link href="/" style={{ textDecoration: 'none', color: '#1e1e1e' }}>
          FITTrack
        </Link>
      </div>

      {/* Sağ Taraf: Navigasyon Linkleri */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Link href="/profile" style={{ textDecoration: 'none', color: '#1e1e1e', fontWeight: '500' }}>
          My Profile
        </Link>
        <Link href="/schedule" style={{ textDecoration: 'none', color: '#1e1e1e', fontWeight: '500' }}>
          My Program
        </Link>
        <Link href="/progress" style={{ textDecoration: 'none', color: '#1e1e1e', fontWeight: '500' }}>
          My Progress
        </Link>
        <Link href="/trainers" style={{ textDecoration: 'none', color: '#1e1e1e', fontWeight: '500' }}>
          Personal Trainers
        </Link>
        <Link href="/create-workout">
          <button
            style={{
              backgroundColor: '#3B82F6',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              padding: '10px 20px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Create Workout
          </button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
