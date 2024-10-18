import { Album } from '@/types/albumType'
import React from 'react'
import AlbumItem from './AlbumItem'

type AlbumListProps = {
    albums:Album[]
}

const AlbumList = ({albums}:AlbumListProps) => {
  return (
    <div className="w-full min-h-[320px] flex justify-start items-start gap-2 p-2 overflow-x-auto">
    {albums.map((album, index) => (
        <AlbumItem key={index} album={album} />
))}
  </div>
  )
}

export default AlbumList