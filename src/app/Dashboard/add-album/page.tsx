"use client";

import { AddAlbum } from "@/actions/AddAlbum";
import { s3UploadAction } from "@/actions/S3BucketAction";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useForm } from "react-hook-form";

const AddAlbumPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset
  } = useForm<{
    name: string;
    desc: string;
    bgColor: string;
    image: File | null;
    artistId: string;
  }>();

  const { image, bgColor, artistId } = watch();

  const [artistIsOpen, setArtistIsOpen] = useState(false);

  const onSubmit =handleSubmit(async (fData) => {
    const file = fData.image;
    if (file) {
      const data = new FormData();
      data.set("file", file);
      const result = await s3UploadAction(data);
      if (result.success && result.filePath) {
        const res = await AddAlbum({
          name: fData.name,
          image: result.filePath,
          desc:fData.desc,
          bgColor:fData.bgColor,
          artistId:fData.artistId
        });
        if(res?.success) reset()
      }
    }
  });

  const [artists, setArtists] = useState<{
    _id:string,
    fullName:string,
    image:string,
}[]>([]);

  useEffect(() => {
    fetch("/api/artists")
      .then((response) => response.json())
      .then((data) => setArtists(data.artists));
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-start items-start gap-5 p-5">
      <p className="text-2xl">Add Album</p>
      <form
        onSubmit={onSubmit}
        className="w-full h-full  flex flex-col items-center justify-start  gap-7"
      >
        <div className="w-full flex justify-center items-center gap-20">
          <label className="w-[300px] aspect-square border-[2px] border-dashed flex justify-center items-center border-white rounded-xl cursor-pointer relative overflow-hidden ">
            {image && (
              <div
                className="w-[70px] h-[50px] absolute bottom-2 right-2 rounded-xl bg-red-600 flex justify-center items-center text-white z-50 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  setValue("image", null);
                }}
              >
                delete
              </div>
            )}
            {image ? (
              <Image
                src={image ? URL.createObjectURL(image) : ""}
                alt="image"
                fill
                objectFit="cover"
              />
            ) : (
              <p>upload image</p>
            )}
            <input
              type="file"
              className="hidden"
              onChange={(e) => {
                setValue("image", e.target.files ? e.target.files[0] : null);
              }}
            />
          </label>
          <HexColorPicker
            color={bgColor}
            onChange={(e) => setValue("bgColor", e)}
          />
        </div>

        <input
          type="text"
          className="w-[57%] h-[50px] bg-transparent border-[1px] border-white rounded-xl p-2 px-4"
          placeholder="Full Name"
          {...register("name")}
        />
        <input
          type="text"
          className="w-[57%] h-[50px] bg-transparent border-[1px] border-white rounded-xl p-2 px-4"
          placeholder="Description"
          {...register("desc")}
        />

        <div
          className="w-[57%] h-[50px] bg-transparent border-[1px] border-white rounded-xl p-2 px-4 cursor-pointer relative"
          onClick={() => setArtistIsOpen((prev) => !prev)}
        >
          {artistId ? artists.find((artist)=>artist._id == artistId)?.fullName ?? '' : "artist"}
          {artistIsOpen && (
            <div className="w-full max-h-[300px] p-2 flex flex-col justify-start items-center absolute top-[55px] bg-black  border-[1px] border-white rounded-xl right-0">
              {artists.map((artist,index)=> <div key={index} className="w-full h-[40px] flex justify-start items-center hover:bg-white hover:bg-opacity-10" onClick={()=>{setValue('artistId',artist._id)}} >{artist.fullName}</div> )}
            </div>
          )}
        </div>

        <input
          type="submit"
          className=" w-[57%] rounded-xl bg-white h-[50px] cursor-pointer text-black"
        />
      </form>
    </div>
  );
};

export default AddAlbumPage;
