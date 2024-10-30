import React from 'react'
import ContactUsform from './ContactUsform'

const ContactUs = () => {
  return (
    <div>
        <div className=" text-richblack-300 rounded-xl
                 p-7 lg:p-14 flex gap-3 flex-col">
            <h1 className="text-4xl leading-10 font-semibold text-richblack-5">
                Got an Error!! We are here to help you
            </h1>
            <p className="">
            Tell us more about yourself and what you&apos;re facing .
            </p>

            <div className="mt-7 border-2  border-richblack-600 p-7 rounded-lg ">
                <ContactUsform/>
            </div>
        </div>
    </div>
  )
}

export default ContactUs