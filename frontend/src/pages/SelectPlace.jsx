import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

const GRASSHOPPER_API_KEY = "f239fa59-db7a-49c1-8773-afd0a3ceba7c"; // Replace with your Grasshopper API key

const SelectPlace = ({ onSelectDestination }) => {
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  // Hardcoded midpoint for testing
  const midPoint = { lat: 28.6139, lon: 77.209  }; // New Delhi

  useEffect(() => {
    if (midPoint) {
      fetchNearbyPlaces(midPoint);
    }
  }, []);

  const fetchNearbyPlaces = async (midPoint) => {
    try {
      const response = await axios.get(
        `https://graphhopper.com/api/1/geocode?q=${midPoint.lat},${midPoint.lon}&radius=2000&key=${GRASSHOPPER_API_KEY}`
      );

      console.log("API Response:", response.data);

      if (response.data.hits) {
        // Filter places based on osm_key and osm_value
        const filteredPlaces = response.data.hits.filter((place) =>
          place.osm_key &&
          place.osm_value &&
          ["cafe", "restaurant", "bar","parks"].some((type) => place.osm_value.includes(type))
        );

        console.log("Filtered Places:", filteredPlaces);
        setPlaces(filteredPlaces);
      }
    } catch (error) {
      console.error("Error fetching nearby places:", error.response?.data || error);
    }
  };

  const handlePlaceSelect = (place) => {
    setSelectedPlace(place);
    onSelectDestination({ lat: place.point.lat, lon: place.point.lng });
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      {midPoint && (
        <MapContainer
          center={[midPoint.lat, midPoint.lon]}
          zoom={15}
          style={{ height: "100vh", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[midPoint.lat, midPoint.lon]}>
            <Popup>Midpoint</Popup>
          </Marker>
          <Circle
            center={[midPoint.lat, midPoint.lon]}
            radius={2000}
            color="blue"
          />
          {places.map((place, index) => (
            <Marker
              key={index}
              position={[place.point.lat, place.point.lng]}
              eventHandlers={{
                click: () => handlePlaceSelect(place),
              }}
            >
              <Popup>
                {place.name} <br />
                {place.type}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
      {selectedPlace && (
        <div style={{ padding: "10px", backgroundColor: "#fff" }}>
          <h3>Selected Place</h3>
          <p>
            {selectedPlace.name} ({selectedPlace.type})
          </p>
        </div>
      )}
    </div>
  );
};

export default SelectPlace;