import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from "react-leaflet";
import { useState, useEffect, useRef } from "react";
import polyline from "polyline";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../services/apis";
import { use } from "react";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const API_KEY = import.meta.env.VITE_GRASSHOPPER_API_KEY; // grahopper api key
// console.log(API_KEY)
export default function MapComponent() {
  const [startLat, setStartLat] = useState(null);
  const [startLon, setStartLon] = useState(null);
  const [endLat, setEndLat] = useState(null); 
  const [endLon, setEndLon] = useState(null); 
  const [route, setRoute] = useState([]);
  const [travelTime, setTravelTime] = useState(null);
  const [mapCenter, setMapCenter] = useState([20, 78]); // Default center (India)
  const [loading, setLoading] = useState(false);
  const { id } = useParams(); 
  const [concertData, setConcertData] = useState(null);
  const [currentLocationName, setCurrentLocationName] = useState("Fetching your location...");
  const mapRef = useRef(null);
  
  // Navigation State
  const [isNavigating, setIsNavigating] = useState(false);
  const isNavigatingRef = useRef(false);
  const endCoordsRef = useRef({ lat: null, lon: null });
  const initialRouteFetched = useRef(false);

  const fetchRouteFromCoords = async (sLat, sLon, eLat, eLon) => {
    if (!sLat || !sLon || !eLat || !eLon) return;
    try {
      const url = `https://graphhopper.com/api/1/route?point=${sLat},${sLon}&point=${eLat},${eLon}&vehicle=car&key=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.paths && data.paths.length > 0) {
        const decodedRoute = polyline.decode(data.paths[0].points);
        setRoute(decodedRoute.map(([lat, lon]) => [lat, lon]));
        const timeInSeconds = data.paths[0].time / 1000;
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        
        if (hours > 0) {
          setTravelTime(`${hours}h ${minutes}m`);
        } else {
          setTravelTime(`${minutes}m`);
        }
      }
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };

  const searchConcert = async () => {
    setLoading(true);
    try {
      let response = await axios.post(
        `${BASE_URL}/concert/concert/${id}`,{},
        { headers: { "Content-Type": "application/json" }, withCredentials:true }
      );
      response = response?.data;
      if (!response.success) throw new Error(`Error: ${response.statusText}`);

      setConcertData(response.data);
      let data = response.data;

      const res = await axios.get(
        `https://graphhopper.com/api/1/geocode?q=${encodeURIComponent(data?.place)}&key=${API_KEY}`
      );
      const indiaEntries = res.data.hits.filter(entry => entry.country === "India");
      const firstIndiaEntry = indiaEntries.length > 0 ? indiaEntries[0] : null;

      if (firstIndiaEntry === null) {
        alert("No valid location found for the concert. Please check the concert details.");
        setLoading(false);
        return;
      }
      const { lat, lng } = firstIndiaEntry.point;
      
      setEndLat(lat);
      setEndLon(lng);
      endCoordsRef.current = { lat, lon: lng };

    } catch (error) {
      console.error("Error fetching concert:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    searchConcert();
  }, []);

  // Watch user's live location
  useEffect(() => {
    let watchId;
    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setStartLat(latitude);
          setStartLon(longitude);

          // Reverse geocode once
          if (!window.initialGeocodeDone) {
            axios.get(`https://graphhopper.com/api/1/geocode?reverse=true&point=${latitude},${longitude}&key=${API_KEY}`)
              .then(res => {
                if (res.data?.hits?.length > 0) {
                  const place = res.data.hits[0];
                  setCurrentLocationName(place.name + (place.city ? `, ${place.city}` : ""));
                } else {
                  setCurrentLocationName("Your Current Location");
                }
              }).catch(() => setCurrentLocationName("Your Current Location"));
            window.initialGeocodeDone = true;
          }

          if (isNavigatingRef.current) {
             // Real-time navigation mode: recenter and recalculate route
             if (mapRef.current) {
               mapRef.current.setView([latitude, longitude], 17, { animate: true });
             }
             fetchRouteFromCoords(latitude, longitude, endCoordsRef.current.lat, endCoordsRef.current.lon);
          } else {
             // Initial load mode: recenter once
             if (mapRef.current && !window.initialMapCentered) {
               mapRef.current.setView([latitude, longitude], 13, { animate: true });
               window.initialMapCentered = true;
             }
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
      );
    }

    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  // Fetch initial route preview when both start and end are available
  useEffect(() => {
    if (startLat && startLon && endLat && endLon && !initialRouteFetched.current) {
      fetchRouteFromCoords(startLat, startLon, endLat, endLon);
      initialRouteFetched.current = true;
    }
  }, [startLat, startLon, endLat, endLon]);

  const handleToggleNavigation = () => {
    if (isNavigating) {
      setIsNavigating(false);
      isNavigatingRef.current = false;
      if (mapRef.current && startLat && startLon) {
        mapRef.current.setView([startLat, startLon], 13, { animate: true });
      }
    } else {
      setIsNavigating(true);
      isNavigatingRef.current = true;
      if (mapRef.current && startLat && startLon) {
        mapRef.current.setView([startLat, startLon], 17, { animate: true });
      }
    }
  };

  return (
    <div className="p-4 md:p-10">
      <div className="m-3 border relative h-full flex flex-col items-center shadow-lg rounded-lg overflow-hidden bg-white">
        
        {/* Control Bar (Always visible above the map) */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-center p-4 bg-gray-100 border-b gap-4">
          {startLat && startLon && endLat && endLon ? (
            <button
              onClick={handleToggleNavigation}
              className="bg-black hover:bg-zinc-800 font-bold py-3 px-6 rounded-md shadow-md transition-all text-sm sm:text-base w-full sm:w-auto text-white"
            >
              {isNavigating ? 'Stop Navigation' : 'Start Navigation'}
            </button>
          ) : (
            <div className="text-black font-medium py-3">Locating you...</div>
          )}

          {travelTime && (
            <div className="bg-black text-white px-5 py-3 rounded-md font-bold text-sm sm:text-base whitespace-nowrap">
              ETA: {travelTime}
            </div>
          )}
        </div>

        {/* Map Display Area */}
        <div className="relative w-full" style={{ height: "500px" }}>
          {/* Recenter Button */}
          <button
            onClick={() => {
              if (startLat && startLon && mapRef.current) {
                mapRef.current.setView([startLat, startLon], isNavigating ? 17 : 13, { animate: true });
              }
            }}
            className="absolute top-4 right-4 bg-white hover:bg-gray-100 text-black font-bold p-2 rounded-md z-[1000] shadow-md border"
          >
            📍 Recenter
          </button>

          {/* Map Display */}
          <MapContainer
            className="mx-auto w-full h-full z-0"
            center={mapCenter}
            zoom={13}
            ref={mapRef}
          >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* Start Marker (Live Location) */}
          {startLat && startLon && (
            <Marker position={[startLat, startLon]} icon={defaultIcon}>
              <Popup>📍 {currentLocationName}</Popup>
            </Marker>
          )}

          {/* Destination Marker */}
          {endLat && endLon && (
            <Marker position={[endLat, endLon]} icon={defaultIcon}>
              <Popup>🏁 {concertData?.place || "Event Location"}</Popup>
            </Marker>
          )}

          {/* Route Path */}
          {route.length > 0 && <Polyline positions={route} color="blue" />}
        </MapContainer>
        </div>
      </div>
    </div>
  );
}