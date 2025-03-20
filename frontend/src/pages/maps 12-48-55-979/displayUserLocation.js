import { useState, useEffect } from "react";
import Map, { Marker } from "react-map-gl";

const displayLocations = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [friendLocation, setFriendLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [concertLocation, setConcertLocation] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => console.error("Error fetching location:", error),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  return (
    <Map
      initialViewState={{
        longitude: userLocation?.longitude || 77.1025, // Default to Delhi
        latitude: userLocation?.latitude || 28.7041,
        zoom: 12,
      }}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/streets-v11"
    >
      {userLocation && (
        <Marker longitude={userLocation.longitude} latitude={userLocation.latitude} color="red" />
      )}
    </Map>
  );
};

export default displayLocations;
