'use client'

import usePlayerStore from '@/stores/playerStore'
import { getRandomInt } from '@/utils/randomNumebr'
import React, { useEffect } from 'react'



const PlayNextSongAfterEnd = () => {
  
    const {musicHasEnded,music,setMusic,playMusic,isShuffle,repeatMode,musics:songs} = usePlayerStore()
  
    useEffect(()=>{
        if(musicHasEnded == true){
            const songIndex = songs.findIndex((song)=>song._id == music?._id )
            const nextSongIndex = repeatMode == 'repeatOne' ? songIndex : isShuffle ? getRandomInt(0,songs.length-1) : (songIndex + 1)
            if(songs[nextSongIndex]){
                setMusic(songs[nextSongIndex])
                setTimeout(()=>{playMusic()},100) 
            }else{
                if(repeatMode == 'repeatAll'){
                    setMusic(songs[0])
                    setTimeout(()=>{playMusic()},100) 
                }
            }
        }

    },[musicHasEnded,isShuffle,repeatMode])


    return (
    <div>

    </div>
  )
}

export default PlayNextSongAfterEnd