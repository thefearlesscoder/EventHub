import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
import polyline from "polyline"; // Import polyline decoder

const API_KEY = "f239fa59-db7a-49c1-8773-afd0a3ceba7c"; // Replace with your GraphHopper API Key

export default function MapComponent() {
  const [startLat, setStartLat] = useState(25.4358); // Allahabad (Prayagraj)
  const [startLon, setStartLon] = useState(81.8463);
  const [endLat, setEndLat] = useState(22.7196); // Indore
  const [endLon, setEndLon] = useState(75.8577);
  const [route, setRoute] = useState([]);
  const [travelTime, setTravelTime] = useState(null);

  async function fetchRoute() {
    try {
      const url = `https://graphhopper.com/api/1/route?point=${startLat},${startLon}&point=${endLat},${endLon}&vehicle=car&key=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.paths && data.paths.length > 0) {
        const decodedRoute = polyline.decode(data.paths[0].points);
        const formattedRoute = decodedRoute.map(([lat, lon]) => [lat, lon]);
        setRoute(formattedRoute);

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

  useEffect(() => {
    fetchRoute();
  }, []);

  return (
    <div>
      {/* Travel Time Display */}
      {travelTime && (
        <div style={{ position: "absolute", top: 10, right: 10, background: "black", color: "white", padding: "10px", borderRadius: "5px", zIndex: 1000 }}>
          Estimated Time: {travelTime}
        </div>
      )}

      {/* Input Fields */}
      <div style={{ padding: "10px" }}>
        <input type="number" placeholder="Start Latitude" value={startLat} onChange={(e) => setStartLat(e.target.value)} />
        <input type="number" placeholder="Start Longitude" value={startLon} onChange={(e) => setStartLon(e.target.value)} />
        <input type="number" placeholder="End Latitude" value={endLat} onChange={(e) => setEndLat(e.target.value)} />
        <input type="number" placeholder="End Longitude" value={endLon} onChange={(e) => setEndLon(e.target.value)} />
        <button onClick={fetchRoute}>Get Route</button>
      </div>

      {/* Map Display */}
      <MapContainer center={[24.5, 78.8]} zoom={6} style={{ height: "500px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Start Marker */}
        <Marker position={[startLat, startLon]}>
          <Popup>Start: Allahabad</Popup>
        </Marker>

        {/* Destination Marker */}
        <Marker position={[endLat, endLon]}>
          <Popup>Destination: Indore</Popup>
        </Marker>

        {/* Route Path */}
        {route.length > 0 && <Polyline positions={route} color="blue" />}
      </MapContainer>
    </div>
  );
}