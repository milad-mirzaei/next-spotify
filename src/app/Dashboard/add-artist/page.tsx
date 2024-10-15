"use client";

import { AddArtist } from "@/actions/AddArtist";
import { s3UploadAction } from "@/actions/S3BucketAction";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";

const AddArtistPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<{ fullName: string; artistImage: File | null }>();

  const {artistImage} = watch()

  const onSubmit = handleSubmit(async (fData) => {
    const file = watch().artistImage;
    if (file) {
      const data = new FormData();
      data.set("file", file);
      const result = await s3UploadAction(data);
      if (result.success && result.filePath) {
        const res = await AddArtist({
          fullName: fData.fullName,
          artistImage: result.filePath,
        });
        res?.success && reset()
      }
    }
  });

  return (
    <div className="w-full h-full flex flex-col justify-start items-start gap-5 p-5">
      <p className="text-2xl">Add Artist</p>
      <form
        onSubmit={onSubmit}
        className="w-full h-full  flex flex-col items-center justify-center  gap-7"
      >
        <label className="w-[300px] aspect-square border-[2px] border-dashed flex justify-center items-center border-white rounded-xl cursor-pointer relative overflow-hidden ">
          {artistImage && <div className="w-[70px] h-[50px] absolute bottom-2 right-2 rounded-xl bg-red-600 flex justify-center items-center text-white z-50 cursor-pointer" onClick={
            (e)=>{
              e.preventDefault()
              setValue('artistImage',null)
            }
          } >delete</div>  }
         { artistImage ? <Image src={artistImage ? URL.createObjectURL(artistImage) : ''} alt="image" fill objectFit="cover"  /> : <p>upload image</p> }
          <input
            type="file"
            className="hidden"
            onChange={(e) => {
              setValue(
                "artistImage",
                e.target.files ? e.target.files[0] : null
              );
            }}
          />
        </label>

        <input
          type="text"
          className="w-[57%] h-[50px] bg-transparent border-[1px] border-white rounded-xl p-2 px-4"
          placeholder="Full Name"
          {...register("fullName")}
        />

        <input
          type="submit"
          className=" w-[57%] rounded-xl bg-white h-[50px] cursor-pointer text-black"
        />
      </form>
    </div>
  );
};

export default AddArtistPage;
