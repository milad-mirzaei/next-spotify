'use client'
import usePlayerStore from '@/stores/playerStore'
import { Song } from '@/types/songType'
import Image from 'next/image'
import React from 'react'
import { FaPause, FaPlay, FaRegHeart } from 'react-icons/fa'
import { LuMoreHorizontal } from 'react-icons/lu'

type AlbumSongItem = {
    song:Song
    songs:Song[]
    albumSongNumber:number
}

const AlbumSongItem = ({song,songs,albumSongNumber}:AlbumSongItem) => {

    const {music,playMusic,playState,pauseMusic,setMusic,setMusics} = usePlayerStore()

  return (
    <div className={`w-full flex justify-between items-center p-2 bg-white ${music?._id == song._id ? 'bg-opacity-10' : 'bg-opacity-5'}   cursor-pointer hover:bg-opacity-10`}
    onClick={() => {
        setMusic(song);
        setMusics(songs)
        setTimeout(() => {
          playMusic();
        }, 100);
      }}
    >
        <div className='flex justify-start items-center gap-5 flex-1' >
        <div className='md:w-[75px] min-w-[57px] aspect-square relative ' >
            <Image src={song.image} alt='songCover' fill />
            {music?._id == song._id && <div className=' absolute w-full h-full bg-black bg-opacity-30 flex justify-center items-center'  onClick={(e) => {
              e.stopPropagation();
              if(!playState){  playMusic()}else{ pauseMusic();}
            }}>
                {!playState ? <FaPlay size={25} /> : <FaPause size={25} />}
            </div> }
        </div>
        <p>{albumSongNumber + '. ' +song.name}</p>
        </div>
        <p className='flex-1 lg:flex hidden justify-center items-center'>{song.desc}</p>
        <p className='flex-1 md:flex hidden justify-center items-center'>{`${Math.floor(song.duration/60) < 10 ? ('0'+Math.floor(song.duration/60)) : Math.floor(song.duration/60)}:${Math.floor(song.duration%60) < 10 ? ('0'+Math.floor(song.duration%60)) : Math.floor(song.duration%60)}`}</p>
        <div className='flex justify-end items-center gap-2 flex-1' >
            <div className='rounded-full hover:bg-black hover:bg-opacity-10 p-3' >
            <FaRegHeart size={20} />
                </div>
            <div className='rounded-full hover:bg-black hover:bg-opacity-10 p-2' >
        <LuMoreHorizontal size={25} />
            </div>
        </div>
    </div>
  )
}

export default AlbumSongItem