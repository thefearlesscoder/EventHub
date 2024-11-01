import React, { useState } from 'react'
import logo from '../assets/logo.jpg'
import UpdateProfilebar from '../components/profile/UpdateProfilebar'
import Profilebar from '../components/profile/Profilebar'


const dummydata = {
    firstName: 'kunal',
    lastName: 'sonkar',
    email: 'sonkarkunal812@gmail.com',
    role: 'user',
    username: 'kuanl',
    image : logo,
    phone :  null ,
    address : null ,
}

// how to remove red line 
const Updatedetail = () => {
    
    const [ formData , setFormData ] = useState({
        firstName: 'kunal',
        lastName: 'sonkar',
        email: 'sonkarkunal812@gmail.com',
        role: 'user',
        username: 'kuanl',
        image : logo,
        phone : null ,
        address : null ,
    })
    
    
    const HandleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
          }))
    }

    return (
        <div className=' min-h-screen text-richblack-25 p-10'>
            <div>
                <div className=' font-bold text-2xl md:ml-[10%]'>
                    Home / UpdateProfile
                </div>
                <form className=' mt-10'>
                    <div className=' flex w-full justify-around md:flex-row md:gap gap-y-5 flex-col  items-center'>
                        <img src={dummydata.image} alt="" className='md:w-[20%] w-[50%] rounded-full'/>
                        {/* <button className=' bg-yellow-50 text-black p-2 font-bold rounded-lg text-xl'>
                            Edit image
                        </button> */}
                        <input type='file' />
                    </div>
                    
                    <div className=' md:w-[70%] w-full mx-auto bg-white text-black mt-10 rounded-lg md:p-24 md:pb-12 p-12 flex flex-col gap-5'>
                        <div className=' flex gap-5 md:flex-row flex-col '>
                            <label>
                                <p className=' font-bold text-2xl text-black flex gap-2'>
                                FirstName <span className=' text-pink-400'>*</span>
                                </p>
                                <input
                                    className='  bg-richblack-25 outline-none 
                                        focus:outline-none cursor-default text-2xl rounded-lg
                                        placeholder:text-richblack-900 p-2 mt-2 
                                        w-full  '
                                    defaultValue={ `${ dummydata.firstName  ? dummydata.firstName  : "" }`}
                                    value={formData.firstName}
                                    name='firstName'
                                    onChange={HandleOnChange}
                                >
                                </input>
                            </label>
                            <label>
                                <p className=' font-bold text-2xl text-black flex gap-2'>
                                LastName <span className=' text-pink-400'>*</span>
                                </p>
                                <input
                                    className='  bg-richblack-25 outline-none 
                                        focus:outline-none cursor-default text-2xl rounded-lg
                                        placeholder:text-richblack-900 p-2 mt-2 
                                        w-full  '
                                    defaultValue={ `${ dummydata.lastName  ? dummydata.lastName  : "" }`}
                                    value={formData.lastName}
                                    name='lastname'
                                    onChange={HandleOnChange}
                                >
                                </input>
                            </label>   
                        </div>

                        
                        
                        <div className=' flex gap-5 md:flex-row flex-col '>
                            <label>
                                <p className=' font-bold text-2xl text-black flex gap-2'>
                                UserName <span className=' text-pink-400'>*</span>
                                </p>
                                <input
                                    className='  bg-richblack-25 outline-none 
                                        focus:outline-none cursor-default text-2xl rounded-lg
                                        placeholder:text-richblack-900 p-2 mt-2 
                                        w-full  '
                                    defaultValue={ `${ dummydata.username  ? dummydata.username  : "" }`}
                                    value={formData.username}
                                    name='username'
                                    onChange={HandleOnChange}
                                >
                                </input>
                            </label>
                            <label>
                                <p className=' font-bold text-2xl text-black flex gap-2'>
                                PhoneNo. <span className=' text-pink-400'>*</span>
                                </p>
                                <input
                                    className='  bg-richblack-25 outline-none 
                                        focus:outline-none cursor-default text-2xl rounded-lg
                                        placeholder:text-richblack-900 p-2 mt-2 
                                        w-full  '
                                    defaultValue={ `${ dummydata.phone  ? dummydata.phone  : "" }`}
                                    value={formData.phone}
                                    name='phone'
                                    onChange={HandleOnChange}
                                >
                                </input>
                            </label>
                            
                        </div>
    
                        <div>
                            <label>
                                <p className=' font-bold text-2xl text-black flex gap-2'>
                                Email <span className=' text-pink-400'>*</span>
                                </p>
                                <input
                                    className='  bg-richblack-25 outline-none 
                                        focus:outline-none cursor-default text-2xl rounded-lg
                                        placeholder:text-richblack-900 p-2 mt-2 
                                        w-full  '
                                    defaultValue={ `${ dummydata.email  ? dummydata.email  : "" }`}
                                    value={formData.email}
                                    name='email'
                                    onChange={HandleOnChange}
                                >
                                </input>
                            </label>   
                        </div>
    
                        <div>
                        <label>
                                <p className=' font-bold text-2xl text-black flex gap-2'>
                                Address <span className=' text-pink-400'>*</span>
                                </p>
                                <input
                                    className='  bg-richblack-25 outline-none 
                                        focus:outline-none cursor-default text-2xl rounded-lg
                                        placeholder:text-richblack-900 p-2 mt-2 
                                        w-full  '
                                    defaultValue={ `${ dummydata.address  ? dummydata.address  : "" }`}
                                    value={formData.address}
                                    name='address'
                                    onChange={HandleOnChange}
                                >
                                </input>
                            </label>

                        </div>
    
                        <div className=' mx-auto mt-5 '>
                            <button className=' bg-yellow-50 text-black p-2 font-bold rounded-lg text-xl '>
                                Submit Detail
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
      )
}

export default Updatedetail