import React from "react";
import {
  APILoader,
  PlacePicker,
} from "@googlemaps/extended-component-library/react";

const PickLocation = () => {
  const [formattedAddress, setFormattedAddress] = React.useState("");
  const handlePlaceChange = (e) => {
    setFormattedAddress(e.target.value?.formattedAddress ?? "");
  };
  const countries = [];

  return (
    <div>
      <APILoader
        apiKey="AIzaSyDNiOqUpj6xCRs4S-emUa_QOUjneanBqFs"
        solutionChannel="GMP_GCC_placepicker_v1"
      />
      <div class="container">
        <PlacePicker
          country={countries}
          placeholder="Enter a place to see its address"
          onPlaceChange={handlePlaceChange}
        />
        <div className="result">{formattedAddress}</div>
      </div>
    </div>
  );
};

export default PickLocation;
