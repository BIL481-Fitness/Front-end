import { useTheme } from '../components/ThemeProvider';

export default function Schedule() {
  const { theme } = useTheme();

  const schedule = [
    { day: 'Monday', activity: 'Cardio and Stretching' },
    { day: 'Wednesday', activity: 'Strength Training' },
    { day: 'Friday', activity: 'Yoga and Flexibility' },
  ];

  return (
    <div
      style={{
        backgroundColor: theme === 'light' ? '#ffffff' : '#1e1e1e',
        color: theme === 'light' ? '#000000' : '#ffffff',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>My Schedule</h1>
      <ul
        style={{
          listStyleType: 'none',
          padding: 0,
          maxWidth: '600px',
          margin: '0 auto',
        }}
      >
        {schedule.map((item, index) => (
          <li
            key={index}
            style={{
              padding: '15px',
              border: `1px solid ${theme === 'light' ? '#cccccc' : '#444444'}`,
              borderRadius: '5px',
              marginBottom: '10px',
              backgroundColor: theme === 'light' ? '#f9f9f9' : '#333333',
            }}
          >
            <strong>{item.day}:</strong> {item.activity}
          </li>
        ))}
      </ul>
    </div>
  );
}
