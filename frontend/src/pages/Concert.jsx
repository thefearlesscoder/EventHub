import React from 'react'
import bg2 from '../assets/Images/bg2.jpg'
import centreicon from '../assets/Images/centreicon.jpg'
import { useNavigate } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";

const Concert = () => {


    const concertdetails = {
        artist : "Kunal sonkar" ,
        date : '11/12/2004',
        pincode : '234232' ,
        place : "Jabalpur" ,
        description : "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis in consequuntur blanditiis eligendi deleniti labore laudantium laborum natus provident voluptatem reiciendis, magnam nemo necessitatibus eveniet facere. Facilis ipsum sequi neque.",
        organizer : {
            firstName : "kunal" ,
            phone : "9755763762"
        },
        availableseat : 20 ,
        price : 2000 ,
    }

    const navigate = useNavigate() ;

  return (
    <div className='min-h-screen'>

        <div className=' p-10 '>
            <div className=' font-bold md:text-2xl text-xl ml-[10%] '>
                Home / Concert-Details
            </div>

            <div className=' relative rounded-md p-10  min-h-screen '>
                <div className=' relative '>
                    <img src={bg2} className=' w-full md:h-[400px] rounded-xl object-fill'></img>
                    <img src={centreicon} className=' w-[30%]  rounded-full absolute aspect-square 
                        object-cover md:bottom-[-120px] bottom-[-40px] left-[35%]'></img>

                </div>

                <div className=' md:pt-[200px] pt-[60px] flex gap-10 items-center justify-between 
                    md:flex-row flex-col md:text-auto text-center'>
                    <div className=' flex flex-col font-bold md:text-4xl text-2xl'>
                        <div className=' md:text-8xl text-4xl '>
                            {concertdetails.artist}
                        </div>
                        <div>
                            {concertdetails.date}
                        </div>
                    </div>
                    <div className=' flex flex-col  text-2xl '>
                        <div className='font-bold text-4xl'>
                            Place And Organizer
                        </div>
                        <div className=' pt-2'>
                            {concertdetails.place}
                        </div>
                        <div className=' flex gap-2 justify-center '>
                            <div>
                                {concertdetails.organizer.firstName}
                            </div>
                            <div>
                                {concertdetails.organizer.phone}
                            </div>
                        </div>
                    </div>
                </div>

                <div className=' flex flex-col font-bold md:text-4xl text-4xl mt-14 mx-auto text-center ' >
                    Description
                    <div className=' font-medium text-2xl w-[90%] mx-auto mt-5'>

                    {concertdetails.description}
                    </div>
                </div>
                

                <div className=' flex justify-around mt-14 w-full md:flex-row flex-col gap-5 items-center '>
                    <div className=' font-bold text-4xl flex justify-center flex-col items-center md:text-auto text-center'>
                        <div>
                            AvailableSeat - <span className='font-normal'>{concertdetails.availableseat}</span> 
                        </div>
                        <div className='font-bold flex gap-2 items-center md:text-auto text-center'>
                            Price <div className='font-normal flex gap-2'> - <FaRupeeSign/> {concertdetails.price}</div>  
                        </div>
                    </div>
                    <div className={` w-[40px] h-[40px] 
                    rounded-full aspect-auto ${ concertdetails.availableseat > 0 ? "bg-caribbeangreen-600" : "bg-pink-400" } `}>

                    </div>
                </div>


                <div className=' mx-auto mt-14 md:w-[30%] w-full flex justify-around md:flex-row flex-col md:items-center items-center md:gap gap-5 '>
                        <button onClick={ () => { navigate('/concerts')}} className=' flex gap-2 w-fit items-center p-4 bg-yellow-50 text-black  font-bold rounded-lg text-xl '>
                            Explore More <FaArrowRight/>
                        </button>
                        <button onClick={ () => { navigate('/concerts')}} className=' flex gap-2 w-fit items-center bg-blue-300 text-white p-4 font-bold rounded-lg text-xl '>
                            Buy Now <FaArrowRight/>
                        </button>
                </div>

            </div>

        </div>
    </div>
  )
}

export default Concert