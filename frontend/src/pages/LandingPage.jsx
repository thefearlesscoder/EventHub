import Navbar from '../subComponents/Navbar.jsx'
import Footer from '../subComponents/Footer.jsx'
import React from 'react'
// import { CarouselPlugin } from '../subComponents/CarouselPlugin.jsx'

const LandingPage = () => {
  return (
      <div className='w-full'>
          <Navbar />
          {/* <CarouselPlugin /> */}
        <Footer />
    </div>
  )
}

export default LandingPage
