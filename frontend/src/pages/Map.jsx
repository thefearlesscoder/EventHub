import { useState } from "react";
import UserLocation from "../components/UserLocation";
import calculateMidpoint from "../components/MidpointCalculator";
import NearbyPlaces from "../components/NearbyPlaces";
import { useNavigate } from "react-router-dom";

const Map = () => {
  const navigate = useNavigate();
  const [userLocation, setUserLocation] = useState(null);
  const [concertLocation, setConcertLocation] = useState({ latitude: 28.6139, longitude: 77.2090 });
  const [friendLocation, setFriendLocation] = useState({ latitude: 28.5355, longitude: 77.3910 });

console.log(concertLocation);
console.log(friendLocation);


  const midpoint = userLocation
    ? calculateMidpoint([userLocation, concertLocation, friendLocation])
    : null;

  const handlePlaceSelect = (place) => {
    console.log("Mapbox Token:", MAPBOX_TOKEN);

    navigate(`/navigate?lat=${place.center[1]}&lng=${place.center[0]}`);
  };

  return (
    <div>
      <h2>Find a Meeting Spot</h2>
      <UserLocation onLocationFetch={setUserLocation} />
      {midpoint && <NearbyPlaces midpoint={midpoint} onSelectPlace={handlePlaceSelect} />}
    </div>
  );
};

export default Map;
