import React from 'react'

const UpdateProfilebar = () => {
  return (
    <div>
        <div className=' font-bold text-2xl text-black '>
            {item1} <span className=' text-pink-400'>*</span>
        </div>
        <input
            className='  bg-richblack-25 outline-none 
                focus:outline-none cursor-default text-2xl rounded-lg
                 placeholder:text-richblack-900 p-2 mt-2 
                w-full  '
            defaultValue={ ` ${ item2 ? item2 : "" }`}
            
        >
        </input>
    </div>
  )
}

export default UpdateProfilebar