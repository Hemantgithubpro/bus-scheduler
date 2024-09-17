import { useState, useEffect } from 'react';

export default function ScheduleList() {
  const [busSchedules, setBusSchedules] = useState([]);

  useEffect(() => {
    async function fetchSchedules() {
      const response = await fetch('/api/getSchedules');
      const data = await response.json();
      setBusSchedules(data);
    }
    fetchSchedules();
  }, []);

  return (
    <div>
      <h1>Bus Schedules</h1>
      {busSchedules.length > 0 ? (
        <ul>
          {busSchedules.map((schedule, index) => (
            <li key={index}>
              <p>Bus Number: {schedule.busNumber}</p>
              <p>Start Time: {schedule.startTime}</p>
              <p>End Time: {schedule.endTime}</p>
              <p>Stops: {schedule.busStops.map(stop => stop.stopName).join(', ')}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No buses scheduled yet.</p>
      )}
    </div>
  );
}
