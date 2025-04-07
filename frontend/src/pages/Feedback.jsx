import ContactUsform from '../components/common/ContactUsform'
import ContactDetails from '../components/common/ContactDetails'
import ContactUs from '../components/common/ContactUs'
import React from 'react'

const Feedback = () => {
  return (
    <div className=' flex gap-5 p-10 md:flex-row flex-col text-richblack-5 '>
        <div>
            <ContactDetails/>
        </div>
        <div className=' md:w-[70%]'>
            <ContactUsform/>
        </div>
    </div>
  )
}

export default Feedback