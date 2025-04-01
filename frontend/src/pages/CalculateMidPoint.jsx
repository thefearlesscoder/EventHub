import React, { useState, useEffect } from 'react';

const CalculateMidPoint = () => {
    const [userLocation, setUserLocation] = useState({ lat: null, lon: null });
    const [midPoint, setMidPoint] = useState(null);

    // Hardcoded friend's and event locations
    const friendLocation = { lat: 25.5941, lon: 85.1376 }; // Patna
    const eventLocation = { lat: 28.7041, lon: 77.1025 }; // Delhi

    useEffect(() => {
        // Fetch user's live location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ lat: latitude, lon: longitude });
                    console.log(`User Location: Latitude ${latitude}, Longitude ${longitude}`);
                },
                (error) => {
                    console.error("Error getting user location:", error);
                }
            );
        }
    }, []);

    useEffect(() => {
        if (userLocation.lat && userLocation.lon) {
            // Calculate midpoint
            const midLat = (userLocation.lat + friendLocation.lat + eventLocation.lat) / 3;
            const midLon = (userLocation.lon + friendLocation.lon + eventLocation.lon) / 3;
            const calculatedMidPoint = { lat: midLat, lon: midLon };
            setMidPoint(calculatedMidPoint);
            console.log(`Calculated Midpoint: Latitude ${calculatedMidPoint.lat}, Longitude ${calculatedMidPoint.lon}`);
        }
    }, [userLocation]);

    return (
        <div>
            <h2>Calculate Midpoint</h2>
            {userLocation.lat && userLocation.lon ? (
                <p>
                    User Location: Latitude {userLocation.lat}, Longitude {userLocation.lon}
                </p>
            ) : (
                <p>Fetching user location...</p>
            )}
            <p>Friend Location: Latitude {friendLocation.lat}, Longitude {friendLocation.lon}</p>
            <p>Event Location: Latitude {eventLocation.lat}, Longitude {eventLocation.lon}</p>
            {midPoint ? (
                <p>
                    Midpoint: Latitude {midPoint.lat.toFixed(4)}, Longitude {midPoint.lon.toFixed(4)}
                </p>
            ) : (
                <p>Calculating midpoint...</p>
            )}
        </div>
    );
};

export default CalculateMidPoint;