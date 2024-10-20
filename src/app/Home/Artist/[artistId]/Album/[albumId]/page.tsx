import albumModel from "@/models/albumModel";
import songModel from "@/models/songModel";
import { Album } from "@/types/albumType";
import { Song } from "@/types/songType";
import Image from "next/image";
import React from "react";
import AlbumSongItem from "./_components/AlbumSongItem";
import mongooseClient from "@/libs/mongoose.lib";

type PageProps = {
  params: {
    artistId: string;
    albumId: string;
  };
};

const AlbumPage = async ({ params }: PageProps) => {
  const { albumId } = params;
  await mongooseClient();
  const album:Album = await albumModel.findOne({_id:albumId}) as Album
  const albumSongs:Song[] = await songModel.find({ albumId }).lean() as Song[] ;
    console.log(album.bgColor)
  return (
    <div className={`w-full h-1 flex-auto overflow-y-auto flex flex-col justify-start bg-gradient-to-t from-black from-40% via-[#000000c0]  via-60% to-transparent  text-white `}
    style={{backgroundColor:album.bgColor}}
    >
      <div className="w-full flex justify-start items-center p-5 gap-7" >
        <div className="md:min-w-[250px] min-w-[170px] aspect-square relative" >
            <Image src={album.image} alt="albumCover" fill />
        </div>
        <div className=" w-full flex-auto flex flex-col justify-center items-start gap-2" >
            <p className="text-3xl" >
            {album.name}
            </p>
            <p className="text-2xl opacity-50" >
            {album.desc}
            </p>
            </div>
      </div>
            <div className="w-full flex flex-col justify-start items-start p-4 gap-2" >
                {albumSongs.map((song,index)=><AlbumSongItem key={index} song={song} songs={albumSongs} albumSongNumber={index+1} />)}
            </div>
    </div>
  );
};

export default AlbumPage;
