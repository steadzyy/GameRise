import React from 'react'
import Cards from '../src/components/Cards'

const MyLibrary = ({games}) => {
  return (
    <>
    <div className="flex justify-center">
        <Cards games={{ games: games }} />
      </div>
    </>
  )
}

export default MyLibrary