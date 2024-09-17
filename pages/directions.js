import { useState } from 'react';

export default function Directions() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [mapUrl, setMapUrl] = useState('');

  const handleSearch = () => {
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`;
    setMapUrl(directionsUrl);
  };

  return (
    <div>
      <h1>Get Directions</h1>
      <nav>
        <a href="/">Home</a> | 
        <a href="/scheduleList">View Schedules</a> | 
        <a href="/contact">Contact</a> | 
        <a href="/about">About</a> | 
        <a href="/directions">Directions</a>
      </nav>
      <div>
        <label>
          Origin:
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            placeholder="Enter origin"
          />
        </label>
        <br />
        <label>
          Destination:
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Enter destination"
          />
        </label>
        <br />
        <button onClick={handleSearch}>Get Directions</button>
      </div>
      {mapUrl && (
        <div>
          <h2>Directions:</h2>
          <iframe
            width="100%"
            height="500"
            frameBorder="0"
            style={{ border: 0 }}
            src={mapUrl}
            allowFullScreen
            aria-hidden="false"
            tabIndex="0"
          ></iframe>
        </div>
      )}
    </div>
  );
}
