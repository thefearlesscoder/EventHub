import React from 'react'

const ForgetPassword = () => {
  return (
    <div className='min-h-screen bg-white flex items-center justify-center '>
        <div className='  md:w-[50%] w-full mx-auto p-3 border-2 shadow-black'>
            <div>
                <div>
                    <p className='text-xl'>FORGOT PASSWORD</p>
                </div>
                <div>
                    <div>Forgot your password? No worries—let's get you back on track!</div>
                    <div>Need a reset? Let's help you get back in!</div>
                </div>
                <div>
                    <input type='input' className=' outline-none focus:outline-none ' ></input>
                </div>
                <div className=' p-2 text-xl text-white font-bold'>
                    <button className=' w-full bg-blue-500 rounded-lg'>
                        send mail
                    </button>
                </div>
            </div>
        </div>

    </div>
  )
}

export default ForgetPassword