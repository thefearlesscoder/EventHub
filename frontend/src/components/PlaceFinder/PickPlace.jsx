import React, { useState } from 'react'
import MapComponent from './MapComponent';

const PickPlace = () => {
      const [location, setLocation] = useState({ lat: 40.7128, lng: -74.006 }); // Default to New York
      const [placeType, setPlaceType] = useState("cafe");

      const handleSearch = () => {
        // Optionally, you could use a geocoding API here to get lat/lng from a user-entered address
        setLocation({ lat: 37.7749, lng: -122.4194 }); // For example, San Francisco coordinates
      };

  return (
    <div>
      <h1 className='text-white'>Nearby Places Finder</h1>
      <button onClick={handleSearch} className="text-white">Search Nearby Places</button>

      <select onChange={(e) => setPlaceType(e.target.value)} value={placeType}>
        <option value="cafe">Cafe</option>
        <option value="park">Park</option>
        <option value="restaurant">Restaurant</option>
        <option value="bar">Bar</option>
      </select>

      <MapComponent
        apiKey="AIzaSyDNiOqUpj6xCRs4S-emUa_QOUjneanBqFs"
        location={location}
        type={placeType}
      />
    </div>
  );
};

export default PickPlace
