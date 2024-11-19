import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === '123' && password === '123') {
      // Kullanıcı giriş yaptığında oturum bilgisini kaydet
      sessionStorage.setItem('isLoggedIn', 'true');
      router.push('/');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '10px' }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }}
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
