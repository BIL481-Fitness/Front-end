import { useTheme } from '../components/ThemeProvider';

export default function Trainers() {
  const { theme } = useTheme();

  const trainers = [
    { name: 'John Doe', specialty: 'Strength Training' },
    { name: 'Jane Smith', specialty: 'Cardio & Endurance' },
    { name: 'Emily Johnson', specialty: 'Yoga & Flexibility' },
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
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Personal Trainers</h1>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          justifyContent: 'center',
        }}
      >
        {trainers.map((trainer, index) => (
          <div
            key={index}
            style={{
              padding: '15px',
              border: `1px solid ${theme === 'light' ? '#cccccc' : '#444444'}`,
              borderRadius: '5px',
              backgroundColor: theme === 'light' ? '#f9f9f9' : '#333333',
              width: '250px',
              textAlign: 'center',
            }}
          >
            <h3>{trainer.name}</h3>
            <p>{trainer.specialty}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
