import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2'; // Chart.js kullanımı için import
import 'chart.js/auto'; // Chart.js 3 ve üzeri sürümler için

const Profile = () => {
  const [activeSection, setActiveSection] = useState('progress'); // Hangi bölümün gösterileceğini kontrol eder

  // Sahte Progress Tracker Verisi
  const progressData = {
    workoutsCompleted: 12,
    totalCaloriesBurned: 4500,
    totalHours: 15,
  };

  // Sahte Profil Bilgileri
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    age: 30,
    height: 180,
    weight: 75,
  });

  const [editProfile, setEditProfile] = useState(profileData); // Düzenleme için geçici state

  // Grafik verisi
  const chartData = {
    labels: ['Workouts Completed', 'Calories Burned', 'Hours Spent'],
    datasets: [
      {
        label: 'Progress Overview',
        data: [progressData.workoutsCompleted, progressData.totalCaloriesBurned, progressData.totalHours],
        backgroundColor: ['#4caf50', '#ff9800', '#2196f3'],
      },
    ],
  };

  // Profil Güncelleme Fonksiyonu
  const handleProfileSave = () => {
    setProfileData(editProfile); // Yeni verileri kaydet
    alert('Profile updated successfully!');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Profile & Progress Tracker</h1>

      {/* Bölüm Seçim Butonları */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button
          onClick={() => setActiveSection('progress')}
          style={{
            padding: '10px 20px',
            backgroundColor: activeSection === 'progress' ? '#007BFF' : '#ccc',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Progress Tracker
        </button>
        <button
          onClick={() => setActiveSection('profile')}
          style={{
            padding: '10px 20px',
            backgroundColor: activeSection === 'profile' ? '#007BFF' : '#ccc',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Profile Info
        </button>
      </div>

      {/* Dinamik İçerik */}
      <div>
        {activeSection === 'progress' && (
          <div>
            <h2>Progress Tracker</h2>
            {/* Grafik */}
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
              <Bar data={chartData} />
            </div>
          </div>
        )}

        {activeSection === 'profile' && (
          <div>
            <h2>Profile Info</h2>
            <ul>
              <li>Name: {profileData.name}</li>
              <li>Email: {profileData.email}</li>
              <li>Age: {profileData.age}</li>
              <li>Height: {profileData.height} cm</li>
              <li>Weight: {profileData.weight} kg</li>
            </ul>

            {/* Profil Düzenleme Formu */}
            <h3>Edit Profile</h3>
            <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px' }}>
              <input
                type="text"
                value={editProfile.name}
                onChange={(e) => setEditProfile({ ...editProfile, name: e.target.value })}
                placeholder="Name"
                style={{ marginBottom: '10px', padding: '8px' }}
              />
              <input
                type="email"
                value={editProfile.email}
                onChange={(e) => setEditProfile({ ...editProfile, email: e.target.value })}
                placeholder="Email"
                style={{ marginBottom: '10px', padding: '8px' }}
              />
              <input
                type="number"
                value={editProfile.age}
                onChange={(e) => setEditProfile({ ...editProfile, age: e.target.value })}
                placeholder="Age"
                style={{ marginBottom: '10px', padding: '8px' }}
              />
              <input
                type="number"
                value={editProfile.height}
                onChange={(e) => setEditProfile({ ...editProfile, height: e.target.value })}
                placeholder="Height (cm)"
                style={{ marginBottom: '10px', padding: '8px' }}
              />
              <input
                type="number"
                value={editProfile.weight}
                onChange={(e) => setEditProfile({ ...editProfile, weight: e.target.value })}
                placeholder="Weight (kg)"
                style={{ marginBottom: '10px', padding: '8px' }}
              />
              <button onClick={handleProfileSave} style={{ padding: '10px 20px', cursor: 'pointer' }}>
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
