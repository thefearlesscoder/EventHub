import React from 'react';
import { withScriptjs } from "react-google-maps";
import Map from './Map';

const KEY="AIzaSyD7y2bRxj7U4DdKcJODTexYuR8L1SpHtkU";
export const MapLoader = () => {
  const MapLoader = withScriptjs(Map);

  return (
    <MapLoader
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${KEY}`}
      loadingElement={<div style={{ height: `100%` }} />}
    />
  );
};