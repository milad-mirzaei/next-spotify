"use server";

import mongooseClient from "../libs/mongoose.lib.js";

import songModel from "../models/songModel.js";

export const AddSong = async (data: {
  name: string;
  desc: string;
  album: string;
  artist: string;
  image: string;
  file: string;
  duration: number;
}) => {
  await mongooseClient();

  const song = await songModel.create({
    name: data.name,
    desc: data.desc,
    albumId: data.album,
    image: data.image,
    file: data.file,
    duration: data.duration,
    artistId: data.artist,
  });

  if (song) {
    return { success: true };
  }
};
