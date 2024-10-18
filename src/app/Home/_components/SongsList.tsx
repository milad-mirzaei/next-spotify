import React from "react";
import SongItem from "./SongItem";
import { Song } from "@/types/songType";

type SongsListProps = {
  songs:Song[]
}

const SongsList = async ({songs}:SongsListProps) => {
  return (
    <div className="w-full min-h-[300px] flex justify-start items-center gap-2 p-2 overflow-x-auto">
      {songs.map((song, index) => (
        <SongItem key={index} song={song} songs={songs} />
      ))}
    </div>
  );
};

export default SongsList;
