import React, { useEffect } from 'react'
import logo from '../assets/logo.jpg'
import Profilebar from '../components/profile/Profilebar'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'

let dummydata = {
    firstName: 'kunal',
    lastName: 'sonkar',
    email: 'sonkarkunal812@gmail.com',
    role: 'user',
    username: 'kuanl',
    image : "https://example.com/images/badshah-pune.jpg",
    phone :  98765 ,
    address : null ,
}


const Profile = () => {

    const user = useSelector( (state) => state.auth.user ) ;  
    const { loading } = useSelector ( (state) => state.auth ) ;  
    if ( user !== undefined && user !== null )
        dummydata = user ;
    const navigate = useNavigate() ;

  

  return (
    <div>
        {
            loading ? <Spinner/> : 
            <div className=' min-h-screen text-black p-10'>
                <div>
                    <div className=' font-bold text-2xl md:ml-[10%]'>
                        Home / Profile
                    </div>
                    <div className=' mt-10'>
                        <div className=' flex w-full justify-around md:flex-row md:gap gap-y-5 flex-col  items-center'>
                            <img src={ dummydata.image == null ? "" : dummydata.image.url} alt="" className='md:w-[20%] w-[50%] rounded-full'/>
                            <button onClick={ () => { navigate('/update-profile')}} className=' bg-yellow-50 text-black p-2 font-bold rounded-lg text-xl'>
                                Edit image
                            </button>
                        </div>
                        
                        <div className=' md:w-[70%] w-full mx-auto bg-white text-black mt-10 rounded-lg md:p-24 md:pb-12 p-12 flex flex-col gap-5'>
                            <div className=' flex gap-5 md:flex-row flex-col '>
                                <Profilebar item1={'FirstName'} item2={ dummydata.firstName }></Profilebar>
                                <Profilebar item1={'LastName'} item2={ dummydata.lastName}/>    
                            </div>
                            
                            <div className=' flex gap-5 md:flex-row flex-col '>
                                <Profilebar item1={'UserName'} item2={ dummydata.username }></Profilebar>
                                <Profilebar item1={'PhoneNo.'} item2={ dummydata.phone }/>
                            </div>
    
                            <div>
                                <Profilebar item1={'Email'} item2={ dummydata.email}/>    
                            </div>
    
                            <div>
                                <Profilebar item1={'Address'} item2={ dummydata.address }/>
                            </div>
    
                            <div className=' mx-auto mt-5 '>
                                <button onClick={ () => { navigate('/update-profile')}} className=' bg-yellow-50 text-black p-2 font-bold rounded-lg text-xl '>
                                    Change Detail
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }

    </div>
  )
}

export default Profile