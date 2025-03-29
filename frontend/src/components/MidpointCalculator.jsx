const calculateMidpoint = (locations) => {
    const totalLocations = locations.length;
    const midLat = locations.reduce((sum, loc) => sum + loc.latitude, 0) / totalLocations;
    const midLon = locations.reduce((sum, loc) => sum + loc.longitude, 0) / totalLocations;
    return { latitude: midLat, longitude: midLon };
  };
  
export default calculateMidpoint;
  