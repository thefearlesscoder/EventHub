
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
  
    const updatedFormData = {
      ...formData,
      place: location,
    };

  
    try {
      console.log(updatedFormData);
      dispatch(createConcert(formData.artist ,
         formData.description , formData.date , formData.pincode ,
          formData.ticketPrice , formData.seatingCapacity , 
          formData.genre , location , JSON.parse(token) , navigate ));
      // navigate('/dashboard')
    } catch (error) {
      console.error("Error creating concert:", error);

    } finally {
      setloading(false);
    }
  };
  
  

 
  return (
    <div className='min-h-screen'>
        <div className=' p-10 '>
            <div className='font-bold text-2xl ml-[10%] '>
                Home / Create-Concert
            </div>
            <div className=' mx-auto  p-10 flex flex-col gap-3 '>

                <div className=' flex justify-around gap-3 w-full md:flex-row flex-col'>
                  <div className=' flex gap-3  flex-col md:w-[40%]'>
                    <label className='text-2xl'>Artist</label>
                    <input type='text' 
                      
                      name='artist'
                      value={formData.artist}
                      onChange={handleOnChange}
                    className='flex-1 p-2 focus:outline-none border border-black rounded-md text-richblack-900 ' ></input>
                  </div>
                  <div className='  flex gap-3  flex-col md:w-[40%] '>
                    <label className='text-2xl'>Pincode</label>
                    <input type='number' 
                      name='pincode'
                      value={formData.pincode}
                      onChange={handleOnChange}
                      className='flex-1 p-2 focus:outline-none 
                      border border-blackrounded-md text-richblack-900'></input>
                  </div>
                </div>


                <div className=' flex justify-around gap-3 w-full md:flex-row flex-col' >
                    <div className=' flex gap-3  flex-col md:w-[40%]' >
                      <label className='text-2xl'>Date</label>
                      <input type='date' 
                        name='date'
                        value={formData.date}
                        onChange={handleOnChange}
                      className='flex-1 p-2 focus:outline-none  rounded-md text-richblack-900
                        border border-black ' ></input>
                    </div>
                    <div className=' flex gap-3  flex-col md:w-[40%]' >
                      <label className='text-2xl'>Ticketprice</label>
                      <input type='number' 
                        name='ticketPrice'
                        value={formData.ticketPrice}
                        onChange={handleOnChange}
                      className='flex-1 p-2 focus:outline-none 
                      border border-blackrounded-md text-richblack-900'></input>
                    </div>
                </div>

                <div className=' flex justify-around gap-3 md:flex-row flex-col '>
                  <div className=' flex gap-3  flex-col md:w-[40%]'>
                    <label className='text-2xl'>Genre</label>
                    <select type='number'
                    name='genre'
                    value={formData.genre}
                    onChange={handleOnChange}
                     className='flex-1 p-2 focus:outline-none border
                     border-black rounded-md text-richblack-900 '>
                       <option className=''>Genz</option>
                       <option>Old school</option>
                       <option>International</option>
                       <option>other</option>
                     </select>
                  </div>
                  <div className='flex gap-3  flex-col md:w-[40%]'>
                    <label className='text-2xl'>SeatingCapacity</label>
                    <input type='number' 
                    name='seatingCapacity'
                    value={formData.seatingCapacity}
                    onChange={handleOnChange}
                    className='flex-1 p-2 focus:outline-none border border-black rounded-md text-richblack-900 '></input>
                  </div>
                </div>
                
                <div className='flex justify-around gap-3  md:flex-row flex-col '>
                  <div className='flex gap-3  flex-col md:w-[40%]'>

                    <label className='text-2xl' >Description</label>
                    <textarea 
                    name='description'
                    value={formData.description}
                    onChange={handleOnChange}
                    className='flex-1 p-2 focus:outline-none border border-black rounded-md text-richblack-900 ' />
                  </div>
                  <div className='flex gap-3  flex-col md:w-[40%]' >
                      <h2 className='text-2xl '>Enter your location</h2>
                      <PickLocation setlocation={setlocation}/>
                  </div>
                  

                </div>

                  <button
                    type="submit"
                    onClick={handleOnSubmit}
                    className={`md:w-[20%] mx-auto mt-10 w-full py-2 rounded-md transition duration-300 ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600"
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