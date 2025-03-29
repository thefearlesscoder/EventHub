// // MapComponent.js
// import React, { useState, useEffect } from "react";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// const libraries = ["places"]; 

// const MapComponent = ({ apiKey, location, radius = 5000, type = "cafe" }) => {
//   const [places, setPlaces] = useState([]);
//   const [map, setMap] = useState(null);

//   const containerStyle = {
//     width: "100%",
//     height: "400px",
//   };

//   // Default center, can be updated based on search input
//   const defaultCenter = {
//     lat: location?.lat || 40.7128,
//     lng: location?.lng || -74.006,
//   };

//   // Load nearby places using PlacesService
//   const fetchPlaces = () => {
//     if (!map) return;

//     const service = new window.google.maps.places.PlacesService(map);

//     const request = {
//       location: new window.google.maps.LatLng(
//         defaultCenter.lat,
//         defaultCenter.lng
//       ),
//       radius: radius,
//       type: type, // Type can be 'cafe', 'park', 'restaurant', etc.
//     };

//     service.nearbySearch(request, (results, status) => {
//       if (status === window.google.maps.places.PlacesServiceStatus.OK) {
//         setPlaces(results);
//       }
//     });
//   };

//   useEffect(() => {
//     if (map) fetchPlaces();
//   }, [map, location, type]);

//   return (
//     <LoadScript googleMapsApiKey={apiKey} libraries={libraries} version="3.47">
//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={defaultCenter}
//         zoom={14}
//         onLoad={(map) => setMap(map)}
//       >
//         {places.map((place) => (
//           <Marker
//             key={place.place_id}
//             position={{
//               lat: place.geometry.location.lat(),
//               lng: place.geometry.location.lng(),
//             }}
//             title={place.name}
//           />
//         ))}
//       </GoogleMap>
//     </LoadScript>
//   );
// };

// export default MapComponent;
// ---------Gpt VErsion -------------------

// MapComponent.js
import React, { useState, useEffect, useCallback } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// Static libraries array outside the component
const libraries = ["places"];

const MapComponent = ({ apiKey, location, radius = 5000, type = "cafe" }) => {
  const [places, setPlaces] = useState([]);
  const [map, setMap] = useState(null);

  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  // Default center if location prop is not provided
  const defaultCenter = {
    lat: location?.lat || 40.7128,
    lng: location?.lng || -74.006,
  };

  // Memoized function to fetch places
  const fetchPlaces = useCallback(() => {
    if (!map) return;

    const service = new window.google.maps.places.PlacesService(map);

    const request = {
      location: new window.google.maps.LatLng(
        defaultCenter.lat,
        defaultCenter.lng
      ),
      radius,
      type,
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setPlaces(results);
      }
    });
  }, [map, radius, type, defaultCenter.lat, defaultCenter.lng]);

  // Effect to trigger places fetch when map or relevant parameters change
  useEffect(() => {
    if (map && location) fetchPlaces();
  }, [map, location, fetchPlaces]);

  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={libraries} version="weekly">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={14}
        onLoad={(map) => setMap(map)}
      >
        {places.map((place) => (
          <Marker
            key={place.place_id}
            position={{
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            }}
            title={place.name}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
