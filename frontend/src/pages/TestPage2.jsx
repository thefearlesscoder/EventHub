import PickPlace from '../components/PlaceFinder/PickPlace'
import React from 'react'
import { Link } from 'react-router-dom'
const TestPage2 = () => {
  return (
    <div>
      <PickPlace />
      <Link to={'/testpage'} className='text-white' >
          move
        </Link>
    </div>
  )
}

export default TestPage2
