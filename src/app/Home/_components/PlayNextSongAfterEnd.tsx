'use client'

import usePlayerStore from '@/stores/playerStore'
import { Song } from '@/types/songType'
import { getRandomInt } from '@/utils/randomNumebr'
import React, { useEffect } from 'react'

type PlayNextSongAfterEndProps = {
    songs:Song[]
}

const PlayNextSongAfterEnd = ({songs}:PlayNextSongAfterEndProps) => {
  
    const {musicHasEnded,music,setMusic,playMusic,setMusics,isShuffle,repeatMode} = usePlayerStore()
  
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

    useEffect(()=>{
        setMusics(songs)
    },[])

    console.log('')

    return (
    <div>

    </div>
  )
}

export default PlayNextSongAfterEnd