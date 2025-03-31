import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from "react-leaflet";
import { useState, useEffect } from "react";
import polyline from "polyline";

const API_KEY = "f239fa59-db7a-49c1-8773-afd0a3ceba7c"; // Replace with your API key

export default function MapComponent() {
  const [startLat, setStartLat] = useState(null);
  const [startLon, setStartLon] = useState(null);
  const [endLat, setEndLat] = useState(25.4297); // Prayag Junction Latitude
  const [endLon, setEndLon] = useState(81.8851); // Prayag Junction Longitude
  const [route, setRoute] = useState([]);
  const [travelTime, setTravelTime] = useState(null);
  const [mapCenter, setMapCenter] = useState([20, 78]); // Default center (India)

  // Fetch user's live location and update every 10 seconds
  useEffect(() => {
    function updateLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setStartLat(latitude);
            setStartLon(longitude);
            setMapCenter([latitude, longitude]); // Recenter map
            console.log(`Current Location: Latitude ${latitude}, Longitude ${longitude}`);
          },
          (error) => {
            console.error("Error getting location:", error);
          }
        );
      }
    }

    updateLocation();
    const interval = setInterval(updateLocation, 10000); // Update every 10 sec

    return () => clearInterval(interval);
  }, []);

  // Fetch route dynamically
  async function fetchRoute() {
    if (!startLat || !startLon || !endLat || !endLon) {
      alert("Please enter valid coordinates.");
      return;
    }

    try {
      const url = `https://graphhopper.com/api/1/route?point=${startLat},${startLon}&point=${endLat},${endLon}&vehicle=car&key=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.paths && data.paths.length > 0) {
        const decodedRoute = polyline.decode(data.paths[0].points);
        setRoute(decodedRoute.map(([lat, lon]) => [lat, lon]));

        const timeInSeconds = data.paths[0].time / 1000;
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        setTravelTime(`${hours}h ${minutes}m`);
      } else {
        alert("No route found.");
      }
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  }

  // Re-fetch route when location updates
  useEffect(() => {
    if (startLat && startLon) {
      fetchRoute();
    }
  }, [startLat, startLon, endLat, endLon]);

  // Component to recenter map on live location
  function RecenterMap() {
    const map = useMap();
    useEffect(() => {
      if (mapCenter[0] && mapCenter[1]) {
        map.setView(mapCenter, 13, { animate: true });
      }
    }, [mapCenter, map]);
    return null;
  }

  return (
    <div>
      {/* Travel Time Display */}
      {travelTime && (
        <div style={{ position: "absolute", top: 10, right: 10, background: "black", color: "white", padding: "10px", borderRadius: "5px", zIndex: 1000 }}>
          Estimated Time: {travelTime}
        </div>
      )}

      {/* Destination Input Fields */}
      <div style={{ padding: "10px" }}>
        <h2>Enter Destination</h2>
        <input type="number" placeholder="End Latitude" value={endLat} onChange={(e) => setEndLat(e.target.value)} />
        <input type="number" placeholder="End Longitude" value={endLon} onChange={(e) => setEndLon(e.target.value)} />
        <button onClick={fetchRoute}>Get Route</button>
      </div>

      {/* Map Display */}
      <MapContainer center={mapCenter} zoom={13} style={{ height: "500px", width: "100%" }}>
        <RecenterMap />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Start Marker (Live Location) */}
        {startLat && startLon && (
          <Marker position={[startLat, startLon]}>
            <Popup>📍 Your Current Location</Popup>
          </Marker>
        )}

        {/* Destination Marker */}
        {endLat && endLon && (
          <Marker position={[endLat, endLon]}>
            <Popup>🏁 Prayag Junction</Popup>
          </Marker>
        )}

        {/* Route Path */}
        {route.length > 0 && <Polyline positions={route} color="blue" />}
      </MapContainer>
    </div>
  );
}