import React from 'react'

const Categories = () => {
  return (
    <div className="w-full flex justify-start items-center gap-2 px-4">
        <div className="bg-white text-black px-4 py-2 rounded-full font-semibold cursor-pointer">
          All
        </div>
        <div className="bg-black px-4 py-2 rounded-full font-semibold cursor-pointer">
          Music
        </div>
        <div className="bg-black px-4 py-2 rounded-full font-semibold cursor-pointer">
          Podcasts
        </div>
      </div>
  )
}

export default Categories