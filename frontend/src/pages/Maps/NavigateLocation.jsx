import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const NavigateLocation = () => {
  const [userPosition, setUserPosition] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState([26.8942443, 80.9640683]); // Hardcoded destination for testing
  const [route, setRoute] = useState(null); // To store the route coordinates
  const [travelTime, setTravelTime] = useState(null); // To store the estimated travel time

  const MAPBOX_API_KEY = "sk.eyJ1Ijoidml2ZWsta3VtYXIiLCJhIjoiY204b3IycjBhMDM4MTJscXV3cmJncHd1bCJ9.8DTGsflMdShdVcMlIaDapQ"; // Replace with your Mapbox API key

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {  
          setUserPosition([pos.coords.latitude, pos.coords.longitude]);
        },
        (err) => {
          console.error("Error fetching location:", err);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    // Fetch the route and travel time using Mapbox Directions API
    const fetchRoute = async () => {
      if (userPosition && destinationCoords) {
        try {
          const response = await axios.get(
            `https://api.mapbox.com/directions/v5/mapbox/driving/${userPosition[1]},${userPosition[0]};${destinationCoords[1]},${destinationCoords[0]}?geometries=geojson&access_token=${MAPBOX_API_KEY}`
          );
          const data = response.data;
          if (data.routes && data.routes.length > 0) {
            const routeCoordinates = data.routes[0].geometry.coordinates.map((coord) => [coord[1], coord[0]]);
            setRoute(routeCoordinates);
            setTravelTime(data.routes[0].duration / 60); // Convert seconds to minutes
          } else {
            console.error("No routes found.");
          }
        } catch (error) {
          console.error("Error fetching route:", error);
        }
      }
    };

    fetchRoute();
  }, [userPosition, destinationCoords]);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      {console.log("User Position:", userPosition)}
      {console.log("Destination Coordinates:", destinationCoords)}
      {console.log("Route:", route)}
      {userPosition && destinationCoords ? (
        <MapContainer center={userPosition} zoom={13} style={{ height: "100vh", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={userPosition}>
            <Popup>Start: You are here!</Popup>
          </Marker>
          <Marker position={destinationCoords}>
            <Popup>Destination</Popup>
          </Marker>
          {route && <Polyline positions={route} color="blue" />}
        </MapContainer>
      ) : (
        <p>Loading map...</p>
      )}
      {travelTime && (
        <div style={{ padding: "10px", backgroundColor: "#fff", position: "absolute", bottom: "10px", left: "10px" }}>
          <p>Estimated Travel Time: {travelTime.toFixed(2)} minutes</p>
        </div>
      )}
    </div>
  );
};

export default NavigateLocation;