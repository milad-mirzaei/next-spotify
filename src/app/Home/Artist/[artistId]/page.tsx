import artistModel from "@/models/artistModel";
import songModel from "@/models/songModel";
import { Artist } from "@/types/artistType";
import { Song } from "@/types/songType";
import Image from "next/image";
import React from "react";
import albumModel from "@/models/albumModel";
import { Album } from "@/types/albumType";
import AlbumList from "../../_components/AlbumList";
import SongsList from "../../_components/SongsList";
import mongooseClient from "@/libs/mongoose.lib";

type PageProps = {
  params: {
    artistId: string;
  };
};

const ArtistPage = async ({ params }: PageProps) => {
  const artistId = params.artistId;
  await mongooseClient();
  const artist: Artist = (await artistModel
    .findOne({ _id: artistId })
    .lean()) as Artist;

  const artistSongs: Song[] = (await songModel
    .find({ artistId: artistId })
    .lean()) as Song[];

  const artistAlbums: Album[] = (await albumModel
    .find({ artistId: artistId })
    .lean()) as Album[] ;

  return (
    <div className="w-full h-1 flex-auto overflow-y-auto flex flex-col justify-start text-white">
      <div className="w-full flex justify-start items-center p-7 gap-5">
        <div className="min-w-[220px] aspect-square rounded-full relative overflow-hidden">
          <Image src={artist.image} alt="artist" fill />
        </div>
        <div className="w-full flex-auto flex flex-col justify-center items-start text-3xl">
          {artist.fullName}
        </div>
      </div>
      <p className="w-full text-left pt-4 p-2 text-4xl">Single Tracks</p>
      <SongsList songs={artistSongs} />
      <p className="w-full text-left pt-4 p-2 text-4xl">Albums</p>
      <AlbumList albums={artistAlbums} />
    </div>
  );
};

export default ArtistPage;
