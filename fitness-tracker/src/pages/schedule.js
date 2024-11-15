import React, { useEffect, useState } from 'react';

// Sahte veri alma fonksiyonu
const fetchSchedule = async () => {
  return [
    { date: "2024-11-15", activity: "Chest Workout", time: "6:00 PM" },
    { date: "2024-11-16", activity: "Leg Workout", time: "7:00 PM" },
    { date: "2024-11-17", activity: "Rest Day", time: "-" },
  ];
};

const Schedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [newActivity, setNewActivity] = useState({ date: "", activity: "", time: "" });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const getSchedule = async () => {
      const data = await fetchSchedule();
      setSchedule(data);
    };

    getSchedule();
  }, []);

  const handleAddOrEditActivity = () => {
    if (!newActivity.date || !newActivity.activity || !newActivity.time) {
      alert('Please fill all fields');
      return;
    }

    if (editIndex !== null) {
      const updatedSchedule = [...schedule];
      updatedSchedule[editIndex] = newActivity;
      setSchedule(updatedSchedule);
      setEditIndex(null);
    } else {
      setSchedule([...schedule, newActivity]);
    }

    setNewActivity({ date: "", activity: "", time: "" });
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setNewActivity(schedule[index]);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Your Weekly Schedule</h1>
      <ul>
        {schedule.map((day, index) => (
          <li key={index} style={{ marginBottom: '10px' }}>
            <strong>{day.date}</strong>: {day.activity} at {day.time}
            <button
              onClick={() => handleEditClick(index)}
              style={{ marginLeft: '10px', cursor: 'pointer' }}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>

      <h2>{editIndex !== null ? "Edit Activity" : "Add New Activity"}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px' }}>
        <input
          type="date"
          value={newActivity.date}
          onChange={(e) => setNewActivity({ ...newActivity, date: e.target.value })}
          placeholder="Date"
          style={{ marginBottom: '10px', padding: '8px' }}
        />
        <input
          type="text"
          value={newActivity.activity}
          onChange={(e) => setNewActivity({ ...newActivity, activity: e.target.value })}
          placeholder="Activity"
          style={{ marginBottom: '10px', padding: '8px' }}
        />
        <input
          type="time"
          value={newActivity.time}
          onChange={(e) => setNewActivity({ ...newActivity, time: e.target.value })}
          placeholder="Time"
          style={{ marginBottom: '10px', padding: '8px' }}
        />
        <button onClick={handleAddOrEditActivity} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          {editIndex !== null ? "Save Changes" : "Add Activity"}
        </button>
      </div>
    </div>
  );
};

export default Schedule;
