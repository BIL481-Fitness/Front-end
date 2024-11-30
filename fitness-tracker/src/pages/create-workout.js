import { useTheme } from '../components/ThemeProvider';

export default function CreateWorkout() {
  const { theme } = useTheme();

  return (
    <div
      style={{
        backgroundColor: theme === 'light' ? '#ffffff' : '#1e1e1e',
        color: theme === 'light' ? '#000000' : '#ffffff',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Create a New Workout</h1>
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
          Workout Name:
          <input
            type="text"
            placeholder="Enter workout name"
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
          Duration (in minutes):
          <input
            type="number"
            placeholder="Enter duration"
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
          Intensity:
          <select
            style={{
              width: '100%',
              padding: '10px',
              border: `1px solid ${theme === 'light' ? '#cccccc' : '#444444'}`,
              borderRadius: '5px',
              backgroundColor: theme === 'light' ? '#f9f9f9' : '#333333',
              color: theme === 'light' ? '#000000' : '#ffffff',
            }}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        <label>
          Description:
          <textarea
            placeholder="Enter workout description (optional)"
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
          Create Workout
        </button>
      </form>
    </div>
  );
}
