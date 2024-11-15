import React, { useState } from 'react';

const trainersData = [
  {
    id: 1,
    name: 'John Smith',
    specialty: 'Strength Training',
    bio: '10 years of experience in strength and conditioning.',
  },
  {
    id: 2,
    name: 'Emily Johnson',
    specialty: 'Yoga',
    bio: 'Certified yoga instructor with a passion for mental wellness.',
  },
  {
    id: 3,
    name: 'Michael Brown',
    specialty: 'Cardio Workouts',
    bio: 'Helping people achieve their cardio fitness goals for over 8 years.',
  },
];

const Trainers = () => {
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  const handleSelectTrainer = (trainer) => {
    setSelectedTrainer(trainer);
    alert(`You selected ${trainer.name} as your trainer!`);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Fitness Trainers</h1>

      {/* Seçilen Eğitmen */}
      {selectedTrainer && (
        <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
          <h2>Selected Trainer:</h2>
          <p>
            <strong>Name:</strong> {selectedTrainer.name}
          </p>
          <p>
            <strong>Specialty:</strong> {selectedTrainer.specialty}
          </p>
          <p>
            <strong>Bio:</strong> {selectedTrainer.bio}
          </p>
        </div>
      )}

      {/* Eğitmenler Listesi */}
      <div>
        {trainersData.map((trainer) => (
          <div
            key={trainer.id}
            style={{
              marginBottom: '20px',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
          >
            <h2>{trainer.name}</h2>
            <p>
              <strong>Specialty:</strong> {trainer.specialty}
            </p>
            <p>{trainer.bio}</p>
            <button
              onClick={() => handleSelectTrainer(trainer)}
              style={{ padding: '8px 15px', cursor: 'pointer' }}
            >
              Select
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trainers;
