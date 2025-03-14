import { useEffect, useState } from "react";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN; 

const mapboxClient = mbxGeocoding({ accessToken: MAPBOX_TOKEN });

const NearbyPlaces = ({ midpoint, onSelectPlace }) => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchNearbyPlaces = async () => {
      const response = await mapboxClient
        .forwardGeocode({
          query: `${midpoint.latitude},${midpoint.longitude}`,
          limit: 5,
          types: ["poi"],
        })
        .send();
      setPlaces(response.body.features);
    };

    if (midpoint) fetchNearbyPlaces();
  }, [midpoint]);

  return (
    <div>
      <h3>Nearby Places</h3>
      <ul>
        {places.map((place, index) => (
          <li key={index}>
            <button onClick={() => onSelectPlace(place)}>{place.text}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NearbyPlaces;
