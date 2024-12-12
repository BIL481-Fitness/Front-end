import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://backend-u0ol.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: username, password }),
      });

      if (response.status === 200) {
        const responseData = await response.json();

        // Store user details in sessionStorage
        sessionStorage.setItem('isLoggedIn', 'true');
        
        if (responseData.role === 'coach') {
          // If the user is a coach, store coachId
          sessionStorage.setItem('coachId', responseData.id);
        } else {
          // Otherwise, store userId
          sessionStorage.setItem('userId', responseData.id);
        }

        sessionStorage.setItem('userRole', responseData.role);

        router.push('/'); // Redirect to homepage
      } else if (response.status === 422) {
        const errorData = await response.json();
        setError(errorData.detail?.[0]?.msg || 'Validation error occurred.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again later.');
    }
  };

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
      <h1>Login</h1>
      <form
        onSubmit={handleLogin}
        style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '10px' }}
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '10px',
            fontSize: '16px',
            fontWeight: 'bold',
            color: 'white',
            backgroundColor: '#007BFF',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Login
        </button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
}
