import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import L from "leaflet";

// Define a custom red marker icon
const redIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png",
  shadowSize: [41, 41],
});

const GRASSHOPPER_API_KEY = "f239fa59-db7a-49c1-8773-afd0a3ceba7c"; // Replace with your Grasshopper API key

const SelectPlace = ({ onSelectDestination }) => {
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  // Hardcoded midpoint for testing
  const midPoint = { lat: 26.850000, lon: 80.949997 }; // New Delhi

  useEffect(() => {
    if (midPoint) {
      fetchNearbyPlaces(midPoint);
    }
  }, []);

  const fetchNearbyPlaces = async (midPoint) => {
    try {
      const query = `
        [out:json];
        (
          node["amenity"~"cafe|restaurant|bar|park"](around:2000, ${midPoint.lat}, ${midPoint.lon});
        );
        out center;
      `;

      const response = await axios.post(
        "https://overpass-api.de/api/interpreter",
        query,
        {
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );

      const elements = response.data.elements || [];

      const places = elements.map((el) => ({
        name: el.tags?.name || "Unnamed",
        type: el.tags?.amenity || "unknown",
        point: {
          lat: el.lat,
          lng: el.lon,
        },
      }));

      console.log("Filtered Places:", places);
      setPlaces(places);
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
          {/* Midpoint Marker with Red Icon */}
          <Marker position={[midPoint.lat, midPoint.lon]} icon={redIcon}>
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