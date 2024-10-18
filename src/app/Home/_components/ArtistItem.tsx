'use client'
import { Artist } from '@/types/artistType'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const ArtistItem = ({artist}:{artist:Artist}) => {
    const {push} = useRouter()
  return (
    <div className='min-w-[250px] w-[250px] flex flex-col justify-start items-center gap-4 p-4  transition-all duration-100 bg-white bg-opacity-10 cursor-pointer hover:bg-opacity-5'
    onClick={()=>{push(`/Home/Artist/${artist._id}`)}}
    >
        <div className='w-[98%] aspect-square relative rounded-full overflow-hidden' >
            <Image
              src={artist.image}
              alt='artist'
              fill
              objectFit='cover'  
            />
        </div>
        <p className='text-base' >
        {artist.fullName}
        </p>
        </div>
  )
}

export default ArtistItem