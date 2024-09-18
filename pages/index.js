import Link from 'next/link';
import { useState } from 'react';
import Navigation from '../components/Navigation';

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
    <div style={{ margin: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Bus Scheduler</h1>
      <Navigation />
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Bus Number:</label>
          <input
            type="text"
            value={busNumber}
            onChange={(e) => setBusNumber(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Start Time:</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>End Time:</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Bus Stops:</label>
          {busStops.map((stop, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <input
                type="text"
                value={stop.stopName}
                onChange={(e) => handleStopChange(index, e)}
                placeholder={`Bus Stop ${index + 1}`}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddStop}
            style={{ padding: '8px 16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Add Stop
          </button>
        </div>
        <button
          type="submit"
          style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%' }}
        >
          Schedule Bus
        </button>
      </form>
    </div>
  );
}
