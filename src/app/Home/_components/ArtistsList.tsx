import React from 'react'
import ArtistItem from './ArtistItem';
import { Artist } from '@/types/artistType';

type ArtistsListProps = {
    artists:Artist[]
}

const ArtistsList = async ({artists}:ArtistsListProps) => {
  return (
    <div className="w-full min-h-[300px] flex justify-start items-center gap-2 p-2 overflow-x-auto">
        {artists.map((artist,index)=> <ArtistItem artist={artist as Artist} key={index} /> )}
    </div>
  )
}

export default ArtistsList