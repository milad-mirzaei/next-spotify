import { Album } from "@/types/albumType";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type AlbumItemProps = {
  album: Album;
};

const AlbumItem = ({ album }: AlbumItemProps) => {
  return (
    <Link href={`/Home/Artist/${album.artistId}/Album/${album._id}`}  >
    <div className="min-w-[250px] w-[250px] bg-white bg-opacity-10 hover:bg-opacity-5 transition-all duration-100 p-4 min-h-[300px] flex flex-col justify-start items-center cursor-pointer">
      <div className="w-[99%] aspect-square relative">
        <Image src={album.image} alt="cover" fill objectFit="cover" />
      </div>
      <p className="w-full text-left text-white pt-2">{album.name}</p>
      <p className="w-full text-left text-white text-opacity-50">
        {album.desc}
      </p>
    </div>
    </Link>
  );
};

export default AlbumItem;
