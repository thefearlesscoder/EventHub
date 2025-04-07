import React, { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const NavigateLocation = () => {
  const [userPosition, setUserPosition] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState([80.9640683, 26.8942443]); // Hardcoded destination (longitude, latitude)
  const [travelTime, setTravelTime] = useState(null); // To store the estimated travel time
  const mapContainerRef = useRef(null); // Reference to the map container
  const mapRef = useRef(null); // Reference to the Mapbox map instance

  const MAPBOX_API_KEY = "pk.eyJ1Ijoidml2ZWsta3VtYXIiLCJhIjoiY204c3FzM3dsMDJqdjJqczYwbzk0NHlmMSJ9.qvCkWfXpdqkBjqQ4jieLXA"; // Replace with your Mapbox API key

  // Function to fetch the route and travel time
  const fetchRoute = async (currentPosition) => {
    if (currentPosition && destinationCoords) {
      try {
        const response = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${currentPosition[0]},${currentPosition[1]};${destinationCoords[0]},${destinationCoords[1]}?geometries=geojson&access_token=${MAPBOX_API_KEY}`
        );
        const data = await response.json();
        if (data.routes && data.routes.length > 0) {
          const routeCoordinates = data.routes[0].geometry.coordinates; // Coordinates snapped to roads
          const duration = data.routes[0].duration / 60; // Convert seconds to minutes
          setTravelTime(duration);

          // Add the route to the map
          if (mapRef.current.getSource("route")) {
            mapRef.current.getSource("route").setData({
              type: "Feature",
              geometry: {
                type: "LineString",
                coordinates: routeCoordinates, // Use the coordinates directly
              },
            });
          } else {
            mapRef.current.addSource("route", {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "LineString",
                  coordinates: routeCoordinates,
                },
              },
            });

            mapRef.current.addLayer({
              id: "route",
              type: "line",
              source: "route",
              layout: {
                "line-join": "round",
                "line-cap": "round",
              },
              paint: {
                "line-color": "#007aff",
                "line-width": 4,
              },
            });
          }
        } else {
          console.error("No routes found.");
        }
      } catch (error) {
        console.error("Error fetching route:", error);
      }
    }
  };

  // Initialize the Mapbox map
  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_API_KEY;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11", // Map style
      center: [80.9640683, 26.8942443], // Initial center (destination)
      zoom: 13,
    });

    // Add traffic layer
    mapRef.current.on("load", () => {
      mapRef.current.addLayer({
        id: "traffic",
        type: "raster",
        source: {
          type: "raster",
          tiles: [
            `https://api.mapbox.com/v4/mapbox.mapbox-traffic-v1/{z}/{x}/{y}.png?access_token=${MAPBOX_API_KEY}`,
          ],
          tileSize: 256,
        },
      });
    });

    return () => {
      mapRef.current.remove(); // Cleanup map instance on component unmount
    };
  }, []);

  // Get user's current location and update route in real-time
  useEffect(() => {
    const updateUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
          (pos) => {
            const currentPosition = [pos.coords.longitude, pos.coords.latitude];
            setUserPosition(currentPosition);
            fetchRoute(currentPosition); // Fetch route and travel time based on the updated position

            // Add user marker to the map
            if (mapRef.current.getSource("user-location")) {
              mapRef.current.getSource("user-location").setData({
                type: "Point",
                coordinates: currentPosition,
              });
            } else {
              mapRef.current.addSource("user-location", {
                type: "geojson",
                data: {
                  type: "Point",
                  coordinates: currentPosition,
                },
              });

              mapRef.current.addLayer({
                id: "user-location",
                type: "circle",
                source: "user-location",
                paint: {
                  "circle-radius": 8,
                  "circle-color": "#007aff",
                },
              });
            }

            // Fly to the user's current position
            mapRef.current.flyTo({
              center: currentPosition,
              zoom: 14, // Adjust zoom level as needed
            });
          },
          (err) => {
            console.error("Error fetching location:", err);
          },
          { enableHighAccuracy: true, maximumAge: 0 }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    updateUserLocation();
  }, [destinationCoords]);

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      <div
        ref={mapContainerRef}
        style={{ height: "100vh", width: "100%" }}
      ></div>
      {travelTime && (
        <div
          style={{
            padding: "10px",
            backgroundColor: "#fff",
            position: "absolute",
            bottom: "10px",
            left: "10px",
            zIndex: 1,
          }}
        >
          <p>Estimated Travel Time: {travelTime.toFixed(2)} minutes</p>
        </div>
      )}
    </div>
  );
};

export default NavigateLocation;