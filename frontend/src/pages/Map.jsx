import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from "react-leaflet";
import { useState, useEffect } from "react";
import polyline from "polyline";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../services/apis";
import { use } from "react";
import axios from "axios";

const API_KEY = "f239fa59-db7a-49c1-8773-afd0a3ceba7c"; // Replace with your API key

export default function MapComponent() {
  const [startLat, setStartLat] = useState(null);
  const [startLon, setStartLon] = useState(null);
  const [endLat, setEndLat] = useState(25.4297); // Prayag Junction Latitude
  const [endLon, setEndLon] = useState(81.8851); // Prayag Junction Longitude
  const [route, setRoute] = useState([]);
  const [travelTime, setTravelTime] = useState(null);
  const [mapCenter, setMapCenter] = useState([20, 78]); // Default center (India)
  const [loading, setLoading] = useState(false);
  const { id } = useParams(); 
  const[ concertData, setConcertData ] = useState(null);


  const searchConcert = async () => {
    console.log("concertId -> ", id);
    setLoading(true);
    try {
      let response = await axios.post(
        `${BASE_URL}/concert/concert/${id}`,{},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials:true ,
        }
      );
      
      console.log("concert responce -> " ,response)
      response = response?.data ;
      
      if (!response.success ) {
        throw new Error(`Error: ${response.statusText}`);
      }
      
      console.log("concert responce -> " ,response)

      setConcertData(response.data);
      console.log("Concert data:", response.data);
      console.log(concertData);
      
      let data = response.data;

      const res = await axios.get(
        `https://graphhopper.com/api/1/geocode?q=${encodeURIComponent(data?.place)}&key=${API_KEY}`
      );

      console.log("Geocode response:", res.data.hits[0].point);
      const { lat, lng } = res.data.hits[0].point;
      // setEndLat(lat);
      // setEndLon(lng);

    } catch (error) {
      console.error("Error fetching concert:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    searchConcert();
  }
  , []);
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
    const interval = setInterval(updateLocation, 1000000000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  // Fetch route dynamically
  async function fetchRoute() {
    if (!startLat || !startLon || !endLat || !endLon) {
      alert("Please enter valid coordinates.");
      return;
    }
    console.log(`Fetching route from ${startLat}, ${startLon} to ${endLat}, ${endLon}`);
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

  


  // concertData mai concert ki details hain 


  return (
    <div className="p-4 md:p-10">
      <div className="m-3 border relative h-full flex flex-col items-center">
        {/* Travel Time Display */}
        {travelTime && (
          <div className="absolute bottom-12 left-4 bg-black text-white p-2 rounded-md z-50 text-sm md:text-base">
            Estimated Time: {travelTime}
          </div>
        )}

        {/* Map Display */}
        <MapContainer
          className="mx-auto w-full z-0"
          center={mapCenter}
          zoom={13}
          style={{ height: "500px", width: "100%" }}
        >
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
    </div>
  );
}