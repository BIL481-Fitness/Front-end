import React, { useState } from 'react'; // React'i içe aktar
import { useTheme } from '../components/ThemeProvider';

export default function Profile() {
  const { theme } = useTheme();

  // Kullanıcı bilgileri state
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    age: 25,
    height: 180,
    weight: 75,
  });

  // Input değişikliği yakalama
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  return (
    <div
      style={{
        backgroundColor: theme === 'light' ? '#ffffff' : '#1e1e1e',
        color: theme === 'light' ? '#000000' : '#ffffff',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>My Profile</h1>
      <form
        style={{
          maxWidth: '400px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
        }}
      >
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={userInfo.name}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '10px',
              border: `1px solid ${theme === 'light' ? '#cccccc' : '#444444'}`,
              borderRadius: '5px',
              backgroundColor: theme === 'light' ? '#f9f9f9' : '#333333',
              color: theme === 'light' ? '#000000' : '#ffffff',
            }}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '10px',
              border: `1px solid ${theme === 'light' ? '#cccccc' : '#444444'}`,
              borderRadius: '5px',
              backgroundColor: theme === 'light' ? '#f9f9f9' : '#333333',
              color: theme === 'light' ? '#000000' : '#ffffff',
            }}
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={userInfo.age}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '10px',
              border: `1px solid ${theme === 'light' ? '#cccccc' : '#444444'}`,
              borderRadius: '5px',
              backgroundColor: theme === 'light' ? '#f9f9f9' : '#333333',
              color: theme === 'light' ? '#000000' : '#ffffff',
            }}
          />
        </label>
        <label>
          Height (cm):
          <input
            type="number"
            name="height"
            value={userInfo.height}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '10px',
              border: `1px solid ${theme === 'light' ? '#cccccc' : '#444444'}`,
              borderRadius: '5px',
              backgroundColor: theme === 'light' ? '#f9f9f9' : '#333333',
              color: theme === 'light' ? '#000000' : '#ffffff',
            }}
          />
        </label>
        <label>
          Weight (kg):
          <input
            type="number"
            name="weight"
            value={userInfo.weight}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '10px',
              border: `1px solid ${theme === 'light' ? '#cccccc' : '#444444'}`,
              borderRadius: '5px',
              backgroundColor: theme === 'light' ? '#f9f9f9' : '#333333',
              color: theme === 'light' ? '#000000' : '#ffffff',
            }}
          />
        </label>
        <button
          type="submit"
          style={{
            padding: '10px',
            border: 'none',
            borderRadius: '5px',
            backgroundColor: theme === 'light' ? '#007BFF' : '#00C4FF',
            color: '#ffffff',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}