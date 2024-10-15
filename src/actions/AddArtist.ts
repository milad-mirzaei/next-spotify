"use server";

import artistModel from "@/models/artistModel.js";
import mongooseClient from "../libs/mongoose.lib.js";

export const AddArtist = async (data: {
  fullName: string;
  artistImage: string;
}) => {
  await mongooseClient();

  const artist = await artistModel.create({
    fullName: data.fullName,
    image: data.artistImage,
  });

  if (artist) {
    return { success: true };
  }
};
