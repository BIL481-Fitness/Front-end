import React, { useState, useEffect } from 'react';

const CoachDashboard = () => {
  const [students, setStudents] = useState([]); // Öğrenci listesi
  const [error, setError] = useState(null); // Hata mesajı

  // Coach Dashboard verilerini API'den getir
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const coachId = sessionStorage.getItem('userId'); // Coach ID
        const response = await fetch(`https://backend-u0ol.onrender.com/coach-students?coachId=${coachId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch students');
        }

        const data = await response.json();
        setStudents(data); // Öğrenci listesi ayarlanır
      } catch (err) {
        setError(err.message);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Coach Dashboard</h1>

      {/* Hata Mesajı */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Öğrenci Listesi */}
      {students.length > 0 ? (
        <div>
          <h2>Your Students:</h2>
          <ul>
            {students.map((student) => (
              <li key={student.id}>
                <strong>{student.name}</strong> - Fitness Level: {student.fitness_level}, Goal: {student.goal}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading students...</p>
      )}
    </div>
  );
};

export default CoachDashboard;
