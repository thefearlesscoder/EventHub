import React, { useState } from "react";

const MidpointCalculator = () => {
  const [coords, setCoords] = useState({
    lat1: "",
    lon1: "",
    lat2: "",
    lon2: "",
    lat3: "",
    lon3: "",
  });
  const [midpoint, setMidpoint] = useState(null);

  const calculateMidpoint = () => {
    const { lat1, lon1, lat2, lon2, lat3, lon3 } = coords;

    // Convert input strings to numbers
    const lat1Num = parseFloat(lat1);
    const lon1Num = parseFloat(lon1);
    const lat2Num = parseFloat(lat2);
    const lon2Num = parseFloat(lon2);
    const lat3Num = parseFloat(lat3);
    const lon3Num = parseFloat(lon3);

    if (
      isNaN(lat1Num) ||
      isNaN(lon1Num) ||
      isNaN(lat2Num) ||
      isNaN(lon2Num) ||
      isNaN(lat3Num) ||
      isNaN(lon3Num)
    ) {
      alert("Please enter valid numbers for all coordinates.");
      return;
    }

    // Calculate the average latitude and longitude
    const midLat = (lat1Num + lat2Num + lat3Num) / 3;
    const midLon = (lon1Num + lon2Num + lon3Num) / 3;

    setMidpoint({ lat: midLat, lon: midLon });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCoords((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Midpoint Calculator</h2>
      <div style={{ marginBottom: "10px" }}>
        <h4>Enter the coordinates:</h4>
        <div>
          <label>
            Latitude 1:
            <input
              type="text"
              name="lat1"
              value={coords.lat1}
              onChange={handleChange}
              style={{ marginLeft: "10px", marginBottom: "5px" }}
            />
          </label>
        </div>
        <div>
          <label>
            Longitude 1:
            <input
              type="text"
              name="lon1"
              value={coords.lon1}
              onChange={handleChange}
              style={{ marginLeft: "10px", marginBottom: "5px" }}
            />
          </label>
        </div>
        <div>
          <label>
            Latitude 2:
            <input
              type="text"
              name="lat2"
              value={coords.lat2}
              onChange={handleChange}
              style={{ marginLeft: "10px", marginBottom: "5px" }}
            />
          </label>
        </div>
        <div>
          <label>
            Longitude 2:
            <input
              type="text"
              name="lon2"
              value={coords.lon2}
              onChange={handleChange}
              style={{ marginLeft: "10px", marginBottom: "5px" }}
            />
          </label>
        </div>
        <div>
          <label>
            Latitude 3:
            <input
              type="text"
              name="lat3"
              value={coords.lat3}
              onChange={handleChange}
              style={{ marginLeft: "10px", marginBottom: "5px" }}
            />
          </label>
        </div>
        <div>
          <label>
            Longitude 3:
            <input
              type="text"
              name="lon3"
              value={coords.lon3}
              onChange={handleChange}
              style={{ marginLeft: "10px", marginBottom: "5px" }}
            />
          </label>
        </div>
      </div>
      <button
        onClick={calculateMidpoint}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "#FFF",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Calculate Midpoint
      </button>
      {midpoint && (
        <div style={{ marginTop: "20px" }}>
          <h4>Midpoint:</h4>
          <p>
            Latitude: {midpoint.lat.toFixed(6)}, Longitude:{" "}
            {midpoint.lon.toFixed(6)}
          </p>
        </div>
      )}
    </div>
  );
};

export default MidpointCalculator;
