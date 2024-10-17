"use client";

import { AddSong } from "@/actions/AddSong";
import { s3UploadAction } from "@/actions/S3BucketAction";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { parseBlob } from 'music-metadata';

const AddSongPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset
  } = useForm<{
    name: string;
    desc: string;
    image: File | null;
    file: File | null;
    duration: {
      minutes: number;
      seconds: number;
    };
    artistId: string;
    albumId: string;
  }>();

  const { image, artistId, file } = watch();

  const onSubmit = handleSubmit(async (fData) => {
    console.log(fData);
    const image = fData.image;
    const file = fData.file;
    if (file && image) {
      console.log(file)
      console.log(image)
      const imageFromData = new FormData();
      const fileFromData = new FormData();
      fileFromData.set("file", file);
      imageFromData.set("file", image);
      console.log(fileFromData)
      console.log(imageFromData)
      const imageResult = await s3UploadAction(imageFromData);
      const fileResult = await s3UploadAction(fileFromData);
      if (
        imageResult.success &&
        fileResult.success &&
        imageResult.filePath &&
        fileResult.filePath
      ) {
        const metadata = await parseBlob(file);
        const duration = metadata.format.duration;


        const res = await AddSong({
          name: fData.name,
          desc: fData.desc,
          album: fData.albumId,
          artist: fData.artistId,
          image: imageResult.filePath,
          file: fileResult.filePath,
          duration: duration ?? 0,
        });
        if(res?.success)  reset();
      }
    }
  });

  const [artistIsOpen, setArtistIsOpen] = useState(false);

  const [artists, setArtists] = useState<
    {
      _id: string;
      fullName: string;
      image: string;
    }[]
  >([]);

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
          <label className="w-[300px] aspect-square border-[2px] border-dashed flex justify-center items-center border-white rounded-xl cursor-pointer relative overflow-hidden ">
            {file && (
              <div
                className="w-[70px] h-[50px] absolute bottom-2 right-2 rounded-xl bg-red-600 flex justify-center items-center text-white z-50 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  setValue("file", null);
                }}
              >
                delete
              </div>
            )}
            {file ? <p>{file.name}</p> : <p>upload music</p>}
            <input
              type="file"
              className="hidden"
              onChange={(e) => {
                setValue("file", e.target.files ? e.target.files[0] : null);
              }}
            />
          </label>
        </div>
        <input
          type="text"
          className="w-[57%] h-[50px] bg-transparent border-[1px] border-white rounded-xl p-2 px-4"
          placeholder="name"
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
          {artistId
            ? artists.find((artist) => artist._id == artistId)?.fullName ?? ""
            : "artist"}
          {artistIsOpen && (
            <div className="w-full max-h-[300px] p-2 flex flex-col justify-start items-center absolute top-[55px] bg-black  border-[1px] border-white rounded-xl right-0">
              {artists.map((artist, index) => (
                <div
                  key={index}
                  className="w-full h-[40px] flex justify-start items-center hover:bg-white hover:bg-opacity-10"
                  onClick={() => {
                    setValue("artistId", artist._id);
                  }}
                >
                  {artist.fullName}
                </div>
              ))}
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

export default AddSongPage;
