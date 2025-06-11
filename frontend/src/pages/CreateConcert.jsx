import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createConcert } from "../services/operations/concert";
import axios from "axios";
import { set } from "react-hook-form";

const CreateConcert = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    artist: "",
    description: "",
    pincode: "",
    date: "",
    ticketPrice: "",
    seatingCapacity: "",
    genre: "Genz",
    place: "",
  });

  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const OPENCAGE_API_KEY = "d2e0ab0fa6ad4c1ea25ffa5077e27d0b"; // Replace with your OpenCage API key

  // Handle input changes
  const handleOnChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  
    if (name === "place" && value.trim().length > 2) {
      if (debounceTimeout) clearTimeout(debounceTimeout);
  
      const timeout = setTimeout(async () => {
        try {
          const response = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(value)}&key=${OPENCAGE_API_KEY}&limit=5`
          );
  
          if (response.data.results && response.data.results.length > 0) {
            const locationSuggestions = response.data.results.map((result) => ({
              description: result.formatted,
              coordinates: result.geometry,
            }));
            setSuggestions(locationSuggestions);
          } else {
            setSuggestions([]);
          }
        } catch (error) {
          console.error("Error fetching location suggestions:", error);
        }
      }, 100); // Added debounce time of 500ms
  
      setDebounceTimeout(timeout);
    } else {
      setSuggestions([]);
    }
  };
  

  const handleSuggestionClick = (suggestion) => {
    setFormData((prevData) => ({
      ...prevData,
      place: suggestion.description,
    }));
    setSuggestions([]);
  };

  // Handle form submission
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      
      dispatch(createConcert(formData, navigate));
      setFormData({
        artist: "",
        description: "",  
        pincode: "",
        date: "",

        ticketPrice: "",  
        seatingCapacity: "",
        genre: "",
        place: "",
      });
      setSuggestions([]);
      navigate("/");

    } catch (error) {
      console.error("Error creating concert:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-10">
      <div className="font-bold text-2xl ml-[10%]">Home / Create-Event</div>
      <div className="mx-auto p-10 flex flex-col gap-3 border-black">
        <div className="flex justify-around gap-3 w-full md:flex-row flex-col">
          <div className="flex gap-3 flex-col md:w-[40%]">
            <label className="text-2xl">Artist/Expert</label>
            <input
              type="text"
              name="artist"
              value={formData.artist}
              onChange={handleOnChange}
              className="p-2 border border-black rounded-md"
            />
          </div>
          <div className="flex gap-3 flex-col md:w-[40%]">
            <label className="text-2xl">Pincode</label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleOnChange}
              className="p-2 border border-black rounded-md"
            />
          </div>
        </div>

        <div className="flex justify-around gap-3 w-full md:flex-row flex-col">
          <div className="flex gap-3 flex-col md:w-[40%]">
            <label className="text-2xl">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleOnChange}
              className="p-2 border border-black rounded-md"
            />
          </div>
          <div className="flex gap-3 flex-col md:w-[40%]">
            <label className="text-2xl">Ticket Price</label>
            <input
              type="number"
              name="ticketPrice"
              value={formData.ticketPrice}
              onChange={handleOnChange}
              className="p-2 border border-black rounded-md"
            />
          </div>
        </div>

        <div className="flex justify-around gap-3 md:flex-row flex-col">
          <div className="flex gap-3 flex-col md:w-[40%]">
            <label className="text-2xl">Genre</label>
            <select
              name="genre"
              value={formData.genre}
              onChange={handleOnChange}
              className="p-2 border border-black rounded-md"
            >
              <option>Genz</option>
              <option>pop</option>
              <option>Rock</option>
              <option>Jazz</option>
              <option>Electronic</option>
              <option>Classical</option>
              <option>Hip-Hop</option>
              <option>Other</option>
            </select>
          </div>
          <div className="flex gap-3 flex-col md:w-[40%]">
            <label className="text-2xl">Seating Capacity</label>
            <input
              type="number"
              name="seatingCapacity"
              value={formData.seatingCapacity}
              onChange={handleOnChange}
              className="p-2 border border-black rounded-md"
            />
          </div>
        </div>


        <div className="flex justify-around gap-3 md:flex-row flex-col">

        <div className="flex gap-3 flex-col md:w-[40%]">
          <label className="text-2xl">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleOnChange}
            className="p-2 border border-black rounded-md"
          />
        </div>
          <div className="relative flex flex-col md:w-[40%]">
            <label className="text-2xl mb-2">Enter your location</label>
            <input
              type="text"
              name="place"
              value={formData.place}
              onChange={handleOnChange}
              className="p-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type a location"
            />
            {suggestions.length > 0 && (
              <ul className="absolute z-10 top-full left-0 w-full border bg-white shadow-lg max-h-40 overflow-y-auto rounded-md mt-1">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="p-2 cursor-pointer hover:bg-gray-100"
                  >
                    {suggestion.description}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>


        <button
          type="submit"
          onClick={handleOnSubmit}
          className={`w-[20%] mx-auto mt-10 py-2 rounded-md ${
            loading ? "bg-gray-400" : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {loading ? "Loading..." : "Create Event"}
        </button>
      </div>
    </div>
  );
};

export default CreateConcert;
