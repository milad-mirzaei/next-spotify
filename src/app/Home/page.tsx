import React from 'react'
import Navbar from './_components/Navbar'
import SongsList from './_components/SongsList'
import AddSongSection from '../Dashboard/_components/AddSongSection'

const HomePage = () => {
  return (
    <div className="w-full h-full  p-2 ">
      <div className="w-full h-full bg-white bg-opacity-5 flex flex-col justify-start items-center">
        <Navbar/> 
            <SongsList/>
      </div>
    </div>
  )
}

export default HomePage