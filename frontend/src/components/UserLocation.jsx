import { useState, useEffect } from "react";
import Map, { Marker } from "react-map-gl";

const UserLocation = ({ onLocationFetch }) => {
  const [userLocation, setUserLocation] = useState(null);
  const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
    console.log(MAPBOX_TOKEN)
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
          };

          console.log(location);
          
          setUserLocation(location);
          onLocationFetch(location);
        },
        (error) => console.error("Error fetching location:", error),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  return (
    <Map
      initialViewState={{
        longitude: userLocation?.longitude || 77.1025,
        latitude: userLocation?.latitude || 28.7041,
        zoom: 12,
      }}
      mapboxAccessToken={MAPBOX_TOKEN}
      
      
      mapStyle="mapbox://styles/mapbox/streets-v11"
    >
      {userLocation && (
        <Marker longitude={userLocation.longitude} latitude={userLocation.latitude} color="red" />
      )}
    </Map>
  );
};

export default UserLocation;
