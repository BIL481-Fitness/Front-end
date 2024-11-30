import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useTheme } from '../components/ThemeProvider';

// Ölçekleri ve elemanları kaydet
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Progress() {
  const { theme } = useTheme();

  const data = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        label: 'Weight Lifted (kg)',
        data: [50, 55, 60, 65, 70, 75],
        borderColor: '#00C4FF',
        backgroundColor: 'rgba(0, 196, 255, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: theme === 'light' ? '#000000' : '#ffffff', // Yazı rengi
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: theme === 'light' ? '#000000' : '#ffffff', // X ekseni yazı rengi
        },
        grid: {
          color: theme === 'light' ? '#cccccc' : '#444444', // X ekseni grid rengi
        },
      },
      y: {
        ticks: {
          color: theme === 'light' ? '#000000' : '#ffffff', // Y ekseni yazı rengi
        },
        grid: {
          color: theme === 'light' ? '#cccccc' : '#444444', // Y ekseni grid rengi
        },
      },
    },
  };

  return (
    <div style={{ padding: '20px', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>My Progress</h1>
      <Line data={data} options={options} />
    </div>
  );
}
