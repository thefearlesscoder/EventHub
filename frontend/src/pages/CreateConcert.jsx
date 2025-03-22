
import React, { useEffect, useState } from 'react'
import PickLocation from '../components/PlaceFinder/PickLocation';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createConcert } from '../services/operations/concert';
// https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Katni,%20Madhya%20Pradesh,%20India&inputtype=textquery&fields=geometry&key=AIzaSyDNiOqUpj6xCRs4S-emUa_QOUjneanBqFs

const CreateConcert = () => {

  const dispatch = useDispatch() ;
  const navigate = useNavigate() ;

  const [ formData , setFormData ] = useState( {
      artist : "" ,
      description : "" ,
      pincode : "" ,
      date : "" ,
      ticketPrice : 0 ,
      seatingCapacity : 0  ,
      genre : "Genz" ,
      place : "" ,
    }   
  )
  const [ loading , setloading ] = useState(false) ;
  
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
    console.log(formData) 
  }
  
  const [ location , setlocation ] = useState("") ;
  const {token} = useSelector((state) => state.auth)
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
  

  
    try {
      // console.log(updatedFormData);
      dispatch(createConcert(formData.artist ,
         formData.description , formData.date , formData.pincode ,
          formData.ticketPrice , formData.seatingCapacity , 
          formData.genre , formData.place , navigate ));
      // navigate('/dashboard')
    } catch (error) {
      console.error("Error creating concert:", error);

    } finally {
      setloading(false);
    }
  };
  
  

 
  return (
    <div className="min-h-screen bg-gray-100">
  <div className="p-10">
    <div className="font-bold text-2xl text-gray-700 mb-6 text-center">
      Home / Create-Event
    </div>

    <div className="mx-auto p-10 bg-white rounded-xl shadow-lg w-full max-w-4xl flex flex-col gap-6">
      {/* Artist and Pincode */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex flex-col w-full">
          <label className="text-lg font-medium text-gray-700">Artist</label>
          <input
            type="text"
            name="artist"
            value={formData.artist}
            onChange={handleOnChange}
            className="p-3 text-[17px] rounded-md border border-gray-300 focus:outline-blue-500"
          />
        </div>

        <div className="flex flex-col w-full">
          <label className="text-lg font-medium text-gray-700">Pincode</label>
          <input
            type="number"
            name="pincode"
            value={formData.pincode}
            onChange={handleOnChange}
            className="p-3 text-[17px] rounded-md border border-gray-300 focus:outline-blue-500"
          />
        </div>
      </div>

      {/* Date and Ticket Price */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex flex-col w-full">
          <label className="text-lg font-medium text-gray-700">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleOnChange}
            className="p-3 text-[17px] rounded-md border border-gray-300 focus:outline-blue-500"
          />
        </div>

        <div className="flex flex-col w-full">
          <label className="text-lg font-medium text-gray-700">Ticket Price</label>
          <input
            type="number"
            name="ticketPrice"
            value={formData.ticketPrice}
            onChange={handleOnChange}
            className="p-3 text-[17px] rounded-md border border-gray-300 focus:outline-blue-500"
          />
        </div>
      </div>

      {/* Genre and Seating */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex flex-col w-full">
          <label className="text-lg font-medium text-gray-700">Genre</label>
          <select
            name="genre"
            value={formData.genre}
            onChange={handleOnChange}
            className="p-3 text-[17px] rounded-md border border-gray-300 bg-white appearance-none focus:outline-blue-500"
          >
            <option value="Genz">Genz</option>
            <option value="Old school">Old school</option>
            <option value="International">International</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="flex flex-col w-full">
          <label className="text-lg font-medium text-gray-700">Seating Capacity</label>
          <input
            type="number"
            name="seatingCapacity"
            value={formData.seatingCapacity}
            onChange={handleOnChange}
            className="p-3 text-[17px] rounded-md border border-gray-300 focus:outline-blue-500"
          />
        </div>
      </div>

      {/* Description and Location */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex flex-col w-full">
          <label className="text-lg font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleOnChange}
            className="p-3 text-[17px] rounded-md border border-gray-300 resize-none h-24 focus:outline-blue-500"
          />
        </div>

        <div className="flex flex-col w-full">
          <label className="text-lg font-medium text-gray-700">Location</label>
          <input
            type="text"
            name="place"
            value={formData.place}
            onChange={handleOnChange}
            className="p-3 text-[17px] rounded-md border border-gray-300 focus:outline-blue-500"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        onClick={handleOnSubmit}
        className={`mt-8 py-3 px-6 text-white font-semibold rounded-lg transition-all duration-300 ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Loading..." : "Create Concert"}
      </button>
    </div>
  </div>
</div>



  )
}

export default CreateConcert