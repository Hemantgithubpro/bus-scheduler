import { useState } from 'react';

export default function Home() {
  const [busNumber, setBusNumber] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [busStops, setBusStops] = useState([{ stopName: '' }]);

  const handleAddStop = () => {
    setBusStops([...busStops, { stopName: '' }]);
  };

  const handleStopChange = (index, event) => {
    const stops = [...busStops];
    stops[index].stopName = event.target.value;
    setBusStops(stops);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/scheduleBus', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ busNumber, startTime, endTime, busStops }),
    });

    if (response.ok) {
      alert('Bus scheduled successfully');
    } else {
      alert('Error scheduling bus');
    }
  };

  return (
    <div>
      <h1>Bus Scheduler</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Bus Number:</label>
          <input type="text" value={busNumber} onChange={(e) => setBusNumber(e.target.value)} />
        </div>
        <div>
          <label>Start Time:</label>
          <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        </div>
        <div>
          <label>End Time:</label>
          <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        </div>
        <div>
          <label>Bus Stops:</label>
          {busStops.map((stop, index) => (
            <div key={index}>
              <input
                type="text"
                value={stop.stopName}
                onChange={(e) => handleStopChange(index, e)}
                placeholder={`Bus Stop ${index + 1}`}
              />
            </div>
          ))}
          <button type="button" onClick={handleAddStop}>Add Stop</button>
        </div>
        <button type="submit">Schedule Bus</button>
      </form>
    </div>
  );
}
