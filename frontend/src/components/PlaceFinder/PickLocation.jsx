import React from "react";
import {
  APILoader,
  PlacePicker,
} from "@googlemaps/extended-component-library/react";
import { setLocation } from "../../slices/concertSlice";
import { useDispatch, useSelector } from "react-redux";

const PickLocation = ({setlocation}) => {
  
  const [formattedAddress, setFormattedAddress] = React.useState("");
  const dispatch = useDispatch() ;
  const handlePlaceChange = (e) => {
    setFormattedAddress(e.target.value?.formattedAddress ?? "");
    // dispatch(setLocation(formattedAddress)) ;
    setlocation(e.target.value?.formattedAddress ?? "") ;

  };
  const countries = [];

  // console.log(formattedAddress)

  return (
    <div>
      <APILoader
        apiKey="AIzaSyDNiOqUpj6xCRs4S-emUa_QOUjneanBqFs"
        solutionChannel="GMP_GCC_placepicker_v1"
      />
      <div className="container">
        <PlacePicker
          country={countries}
          placeholder="Enter a place to see its address"
          onPlaceChange={handlePlaceChange}
        />
        {
            formattedAddress == "" ? (<div></div>) : (

              <div className="result"> Selected location - {formattedAddress}</div>
            )
        }
      </div>
    </div>
  );
};

export default PickLocation;
