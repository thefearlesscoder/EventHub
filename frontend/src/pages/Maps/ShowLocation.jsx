import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
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

const   ShowLocation = () => {
  const [position, setPosition] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
        },
        (err) => {
          console.error("Error fetching location:", err);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full min-h-[calc(100vh-80px)] py-10 bg-gray-50">
      {position ? (
        <MapContainer center={position} zoom={13} className="h-[50vh] w-[90%] md:w-[60%] lg:w-[40%] rounded-lg shadow-lg z-0 relative">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position} icon={defaultIcon}>
            <Popup>You are here!</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p className="text-lg text-gray-600">Loading your location...</p>
      )}
      <button 
        onClick={() => {
          if (location.state?.id) {
            navigate(`/navigate/${location.state.id}`);
          } else {
            navigate(-1);
          }
        }}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold
       text-xl py-4 px-8 rounded-md mt-10 shadow-md transition-all z-10 relative"> Navigate to Event Location </button>
    </div>
  );
};

export default ShowLocation;