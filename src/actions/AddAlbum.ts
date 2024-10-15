"use server";

import mongooseClient from "../libs/mongoose.lib.js";
import albumModel from "@/models/albumModel.js";

export const AddAlbum = async (data: {
    name: string;
    desc: string;
    bgColor: string;
    image: string;
    artistId: string;
  }) => {
  await mongooseClient();

  const album = await albumModel.create({
    name: data.name,
    image: data.image,
    desc:data.desc,
    bgColor:data.bgColor,
    artistId:data.artistId
  });

  if (album) {
    return { success: true };
  }
};
