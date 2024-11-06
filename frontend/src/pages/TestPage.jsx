import PickLocation from '../components/PlaceFinder/PickLocation.jsx'
import PickPlace from '../components/PlaceFinder/PickPlace.jsx'
import React from 'react'
import { Link } from 'react-router-dom'

const TestPage = () => {
  return (
      <div>
          <PickLocation />
        {/* <PickPlace /> */}
        <Link to={'/testpage2'} className='text-white' >
          move
        </Link>
    </div>
  )
}

export default TestPage
