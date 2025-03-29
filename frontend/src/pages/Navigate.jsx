import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Map, { Source, Layer } from "react-map-gl";

const Navigate = () => {
  const [searchParams] = useSearchParams();
  const destination = [parseFloat(searchParams.get("lng")), parseFloat(searchParams.get("lat"))];
  const [route, setRoute] = useState(null);
  const [eta, setEta] = useState(null);
  const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
console.log(MAPBOX_TOKEN);


const fetchRoute = async (start, end) => {
    console.log("Mapbox Token:", MAPBOX_TOKEN);

    try {
        console.log("Mapbox Token:", MAPBOX_TOKEN);

      const response = await axios.get(
        `https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${start.join(",")};${end.join(",")}?geometries=geojson&access_token=${MAPBOX_TOKEN}`
      );

      setRoute(response.data.routes[0].geometry);
      setEta(Math.round(response.data.routes[0].duration / 60)); // Convert seconds to minutes
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = [position.coords.longitude, position.coords.latitude];

        console.log(userLocation);
        console.log(destination);
        
        fetchRoute(userLocation, destination);
      }
    );
  }, [destination]);

  return (
    <div>
      <h2>Navigation</h2>
      {eta && <p>Estimated Time: {eta} min</p>}
      <Map
        initialViewState={{ longitude: destination[0], latitude: destination[1], zoom: 12 }}
        mapboxAccessToken={MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        {route && (
          <Source id="route" type="geojson" data={{ type: "Feature", geometry: route }}>
            <Layer
              id="route-layer"
              type="line"
              paint={{ "line-color": "#ff0000", "line-width": 5 }}
            />
          </Source>
        )}
      </Map>
    </div>
  );
};

export default Navigate;
