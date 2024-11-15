import Link from 'next/link';

const Home = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Welcome to your Fitness Dashboard!</h1>
      <p>Track your progress and stay motivated.</p>

      <div style={{ marginTop: '20px' }}>
        <Link href="/schedule" style={{ color: 'blue', textDecoration: 'underline' }}>
          Go to your Schedule
        </Link>
      </div>

      <div style={{ marginTop: '20px' }}>
        <Link href="/trainers" style={{ color: 'blue', textDecoration: 'underline' }}>
          View Trainers
        </Link>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <Link href="/create-workout" style={{ color: 'blue', textDecoration: 'underline' }}>
            Create a New Workout
        </Link>
      </div>

    </div>
  );
};

export default Home;
