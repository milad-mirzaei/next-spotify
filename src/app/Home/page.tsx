import React from 'react'
import SongsList from './_components/SongsList'
import ArtistsList from './_components/ArtistsList'
import Categories from './_components/Categories'
import mongooseClient from '@/libs/mongoose.lib'
import { Song } from '@/types/songType'
import songModel from '@/models/songModel'
import artistModel from '@/models/artistModel'
import { Artist } from '@/types/artistType'
import AlbumList from './_components/AlbumList'
import albumModel from '@/models/albumModel'
import { Album } from '@/types/albumType'

const HomePage = async() => {
  await mongooseClient();
  const songs:Song[] = await songModel.find().lean() as Song[];
  const artists:Artist[] = await artistModel.find().lean() as Artist[];
  const albums:Album[] = await albumModel.find().lean() as Album[]
  return (
    <div className="w-full h-full flex-auto overflow-y-auto p-2 flex flex-col justify-start gap-3 text-white ">
        <Categories/>
      <div className="w-full bg-white bg-opacity-5 flex flex-col justify-start items-center p-2">
        <p className='w-full text-left pt-4 p-2 text-4xl' >Songs</p>
            <SongsList songs={songs} />
        <p className='w-full text-left pt-4 p-2 text-4xl' >Artists</p>
            <ArtistsList artists={artists} />
        <p className='w-full text-left pt-4 p-2 text-4xl' >Albums</p>
            <AlbumList albums={albums} />
      </div>
    </div>
  )
}

export default HomePage