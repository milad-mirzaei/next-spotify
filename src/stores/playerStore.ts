import { Song } from "@/types/songType";
import { create } from "zustand";

export type PlayerStore = {
    musics:Song[]
    music:Song | null
    musicRef: React.RefObject<HTMLAudioElement> | null
    playState:boolean
    musicHasEnded:boolean
    repeatMode:'repeatAll' | 'repeatOne' | 'noRepeat'
    isShuffle:boolean
    setMusics:(musics:Song[])=>void
    setMusic:(music:Song)=>void
    setMusicRef:(ref:React.RefObject<HTMLAudioElement>)=>void
    playMusic:()=>void
    pauseMusic:()=>void
    setPlayState:(playState:boolean)=>void
    setMusicHasEnded:(musicHasEnded:boolean)=>void
    setRepeatMode:(repeatMode:'repeatAll' | 'repeatOne' | 'noRepeat')=>void
    setIsShuffle:(isShuffle:boolean)=>void
}

const usePlayerStore = create<PlayerStore>((set)=>({
    musics:[],
    music:null,
    musicRef: null,
    playState:false,
    musicHasEnded:false,
    repeatMode:'noRepeat',
    isShuffle:false,
    setMusics:(musics)=>{
        set(()=>({
            musics
        }))
    },
    setMusic:(music)=>{
        set((state)=>{
            state.musicHasEnded = false
            return {...state , music , musicHasEnded:false}
        })
    },
    setMusicRef:(ref)=>{
        set(()=>({
            musicRef:ref
        }))
    },
    playMusic:()=>{
        set((state)=>{
            state.playState = true;
            state.musicRef?.current?.play()
            return {...state,playState:true}
        })
    },
    pauseMusic:()=>{
        set((state)=>{
            state.playState = false;
            state.musicRef?.current?.pause()
            return {...state,playState:false}
        })
    },
    setPlayState:(playState)=>{
        set(()=>({
            playState
        }))
    },
    setMusicHasEnded:(musicHasEnded)=>{
        set(()=>({
            musicHasEnded
        }))
    },
    setRepeatMode:(repeatMode)=>{
        set(()=>({
            repeatMode
        }))
    },
    setIsShuffle:(isShuffle)=>{
        set(()=>({
            isShuffle
        }))
    }
}))

export default usePlayerStore