import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Progress() {
  // Örnek veri
  const data = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'], // Haftalar
    datasets: [
      {
        label: 'Weight Lifted (kg)', // Verinin açıklaması
        data: [50, 55, 60, 65, 70, 75], // Haftalık ilerleme
        borderColor: 'rgba(75,192,192,1)', // Çizgi rengi
        backgroundColor: 'rgba(75,192,192,0.2)', // Çizgi altı dolgusu
        tension: 0.4, // Çizgi yumuşatma
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top', // Legend konumu
      },
      title: {
        display: true,
        text: 'Fitness Progress Over Time', // Grafiğin başlığı
      },
    },
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>My Progress</h1>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
