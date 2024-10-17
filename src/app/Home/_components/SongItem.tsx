"use client";

import usePlayerStore from "@/stores/playerStore";
import { Song } from "@/types/songType";
import Image from "next/image";
import React from "react";
import { FaPause, FaPlay } from "react-icons/fa";

type SongItemProps = {
  song: Song;
};

const SongItem = ({ song }: SongItemProps) => {
  const { setMusic, playMusic, music, playState, pauseMusic } =
    usePlayerStore();

  return (
    <div
      className="min-w-[250px] w-[250px] bg-white bg-opacity-10 hover:bg-opacity-5 transition-all duration-100 p-4 h-[300px] flex flex-col justify-start items-center cursor-pointer"
      onClick={() => {
        setMusic(song);
        setTimeout(() => {
          playMusic();
        }, 100);
      }}
    >
      <div className="w-[99%] aspect-square relative">
        <Image src={song.image} alt="cover" fill objectFit="cover" />
        {music?._id == song._id && (
          <div
            className="w-full h-full absolute bg-black bg-opacity-50 flex justify-center items-center"
            onClick={(e) => {
              e.stopPropagation();
              if(!playState){  playMusic()}else{ pauseMusic();}
            }}
          >
            {!playState ? <FaPlay size={55} /> : <FaPause size={55} />}
          </div>
        )}
      </div>
      <p className="w-full text-left text-white pt-2">{song.name}</p>
      <p className="w-full text-left text-white text-opacity-50">{song.desc}</p>
    </div>
  );
};

export default SongItem;
