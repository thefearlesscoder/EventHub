// import React, { useEffect } from "react";
// import { MapContainer, TileLayer } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import "leaflet-control-geocoder/dist/Control.Geocoder.css";
// import L from "leaflet";
// import "leaflet-control-geocoder";

// const MapWithGeocoder = () => {
//   useEffect(() => {
//     const map = L.map("map").setView([51.505, -0.09], 13);

//     L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//       attribution:
//         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     }).addTo(map);

//     const geocoder = L.Control.geocoder({
//       defaultMarkGeocode: false,
//     })
//       .on("markgeocode", function (e) {
//         const { bbox, center } = e.geocode;
//         console.log("Coordinates:", center); // Log the coordinates of the input
//         const bounds = new L.LatLngBounds(
//           new L.LatLng(bbox.getSouthEast()),
//           new L.LatLng(bbox.getNorthWest())
//         );
//         map.fitBounds(bounds);
//       })
//       .addTo(map);
//   }, []);

//   return <div id="map" style={{ height: "100vh", width: "100%" }} />;
// };

// export default MapWithGeocoder;
import React, { useEffect, useState } from "react";

const GeocoderComponent = () => {
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      // Input the place here
      const place = "MNNIT";

      try {
        // Fetch coordinates using the Nominatim API
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            place
          )}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch coordinates");
        }

        const data = await response.json();

        if (data.length > 0) {
          // Extract latitude and longitude
          const coordinates = {
            lat: parseFloat(data[0].lat),
            lon: parseFloat(data[0].lon),
          };
          setCoordinates(coordinates); // Update state with coordinates
          console.log("Coordinates:", coordinates); // Log coordinates
        } else {
          console.error("Place not found");
          setCoordinates(null);
        }
      } catch (error) {
        console.error("Error:", error.message);
        setCoordinates(null);
      }
    };

    fetchCoordinates();
  }, []); // Runs once when the component is mounted

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Geocoder Example</h2>
      {coordinates ? (
        <p>
          <strong>Coordinates:</strong> Latitude: {coordinates.lat}, Longitude:{" "}
          {coordinates.lon}
        </p>
      ) : (
        <p>Fetching coordinates...</p>
      )}
    </div>
  );
};

export default GeocoderComponent;
