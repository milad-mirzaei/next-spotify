"use client";

import usePlayerStore from "@/stores/playerStore";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import {
  IoPlaySkipBack,
  IoPlaySkipForward,
} from "react-icons/io5";
import { MdRepeat } from "react-icons/md";
import { PiShuffleAngularBold } from "react-icons/pi";

const PlayBar = () => {
  const {
    music,
    playMusic,
    setMusicRef,
    playState,
    pauseMusic,
    setMusicHasEnded,
    setPlayState,
    musics,
    setMusic
  } = usePlayerStore();

  const [currentTime, setCurrentTime] = useState<{
    minutes: number;
    seconds: number;
  }>({ minutes: 0, seconds: 0 });

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current = audioRef.current;
    const progressCurrent = progressBarRef.current;
    if (current) {
      setMusicRef(audioRef);
      setTimeout(() => {
        current.ontimeupdate = () => {
          if(progressCurrent) progressCurrent.style.width = `${Math.floor(current.currentTime / current.duration * 100 )}%`
          setCurrentTime({
            minutes: Math.floor(
              current?.currentTime ? current?.currentTime / 60 : 0
            ),
            seconds: Math.floor(
              current?.currentTime ? current?.currentTime % 60 : 0
            ),
          });
        };
      }, 1000);
    }
  }, [audioRef]);

  const musicMinutes = Math.floor(audioRef.current?.duration ? audioRef.current?.duration / 60 : 0);
  const musicSeconds = Math.floor(audioRef.current?.duration ? audioRef.current?.duration % 60 : 0);

  const handleSeekMusic = (e:React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
    const current = audioRef.current

    if(current){
      current.currentTime = (e.nativeEvent.offsetX/(progressBgRef.current?.offsetWidth ?? 1)*current.duration)
    }

  }

  const handlePlayPreviousMusic = ()=>{
    const songIndex = musics.findIndex((song)=>song._id == music?._id )
    if(musics[songIndex - 1]){
      setMusic(musics[songIndex - 1])
      setTimeout(()=>{playMusic()},100) 
  }
  }

  const handlePlayNextMusic = ()=>{
    const songIndex = musics.findIndex((song)=>song._id == music?._id )
    if(musics[songIndex + 1]){
      setMusic(musics[songIndex + 1])
      setTimeout(()=>{playMusic()},100) 
  }
  }


  return (
    <div
      className={`w-full ${
        music ? "h-[10vh]  flex" : "h-0 hidden"
      }  justify-between items-center px-5`}
    >
      <div className="flex flex-[1] justify-start items-center gap-2 h-full ">
        <div className="h-[75%] aspect-square bg-white relative">
          <Image src={music?.image ?? ""} alt="cover" fill objectFit="cover" />
        </div>
        <div className="flex flex-col items-start justify-center gap-1">
          <p className="text-lg">{music?.name}</p>
          <p className="text-sm text-white text-opacity-75">{music?.desc}</p>
        </div>
      </div>
      <div className="flex-[2]  h-full  flex flex-col justify-center items-center gap-2">
        <div className="w-full flex justify-center items-center gap-7">
          <PiShuffleAngularBold size={25} className="cursor-pointer hover:text-red-600 transition-all duration-100" />
          <IoPlaySkipBack size={25} onClick={handlePlayPreviousMusic} className="cursor-pointer hover:text-blue-500 transition-all duration-100" />
          {!playState ? (
            <FaPlay size={25} className="cursor-pointer hover:text-green-500 transition-all duration-150" onClick={() => playMusic()} />
          ) : (
            <FaPause size={25} className="cursor-pointer hover:text-blue-500 transition-all duration-150" onClick={() => pauseMusic()} />
          )}
          <IoPlaySkipForward size={25} onClick={handlePlayNextMusic} className="cursor-pointer hover:text-blue-500 transition-all duration-100" />
          <MdRepeat size={25} className="cursor-pointer hover:text-red-600 transition-all duration-100" />
        </div>
        <div className="w-full flex justify-center items-center">
          <div className="w-[70%] flex justify-center items-center gap-5">
            <p>
              {currentTime.minutes < 10
                ? `0${currentTime.minutes}`
                : currentTime.minutes}
              :
              {currentTime.seconds < 10
                ? `0${currentTime.seconds}`
                : currentTime.seconds}
            </p>
            <div className="w-1 flex-auto h-[4px] bg-white relative cursor-pointer "
            ref={progressBgRef}
            onClick={handleSeekMusic}
            >
              <div className="h-full bg-green-500 w-0" ref={progressBarRef} ></div>
            </div>
            <p>
              {musicMinutes < 10 ? `0${musicMinutes}` : musicMinutes}:
              {musicSeconds < 10 ? `0${musicSeconds}` : musicSeconds}
            </p>
          </div>
        </div>
        <audio
          preload="auto"
          src={music?.file}
          ref={audioRef}
          onEnded={() => {
            setMusicHasEnded(true);
            setPlayState(false);
          }}
        ></audio>
      </div>
      <div className="flex-[1]  h-full flex justify-end items-center gap-3 ">
        
      </div>
    </div>
  );
};

export default PlayBar;
