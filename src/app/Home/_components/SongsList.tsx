import mongooseClient from "@/libs/mongoose.lib";
import songModel from "@/models/songModel";
import React from "react";
import SongItem from "./SongItem";
import { Song } from "@/types/songType";
import PlayNextSongAfterEnd from "./PlayNextSongAfterEnd";

const SongsList = async () => {
  await mongooseClient();

  const songs = await songModel.find().lean();

  return (
    <div className="w-full flex justify-start items-center gap-2 p-2 overflow-x-auto">
      {songs.map((song, index) => (
        <SongItem key={index} song={song as Song} />
      ))}
      <PlayNextSongAfterEnd songs={songs as Song[]} />
    </div>
  );
};

export default SongsList;
