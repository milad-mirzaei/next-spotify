'use client'

import usePlayerStore from '@/stores/playerStore'
import { Song } from '@/types/songType'
import React, { useEffect } from 'react'

type PlayNextSongAfterEndProps = {
    songs:Song[]
}

const PlayNextSongAfterEnd = ({songs}:PlayNextSongAfterEndProps) => {
  
    const {musicHasEnded,music,setMusic,playMusic,setMusics} = usePlayerStore()
  
    useEffect(()=>{

        if(musicHasEnded == true){
            const songIndex = songs.findIndex((song)=>song._id == music?._id )
            if(songs[songIndex + 1]){
                setMusic(songs[songIndex + 1])
                setTimeout(()=>{playMusic()},100) 
            }
        }

    },[musicHasEnded])

    useEffect(()=>{
        setMusics(songs)
    },[])

    return (
    <div>

    </div>
  )
}

export default PlayNextSongAfterEnd