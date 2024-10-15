import React from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

const Navbar = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="w-full flex justify-between items-center p-4">
        <div className="flex justify-center items-center gap-2">
          <div className="h-[40px] aspect-square flex justify-center items-center bg-black rounded-full cursor-pointer">
            <SlArrowLeft />
          </div>
          <div className="h-[40px] aspect-square flex justify-center items-center bg-black rounded-full cursor-pointer">
            <SlArrowRight />
          </div>
        </div>
        <div className="flex justify-center items-center gap-2">
          <div className="bg-white text-black px-4 py-2 rounded-full font-semibold cursor-pointer">
            Explore Premium
          </div>
          <div className="bg-black px-4 py-2 rounded-full font-semibold cursor-pointer">
            Install App
          </div>
          <div className=" h-[40px] aspect-square flex justify-center items-center bg-purple-600  rounded-full font-semibold cursor-pointer">
            M
          </div>
        </div>
      </div>
      <div className="w-full flex justify-start items-center gap-2 px-4">
        <div className="bg-white text-black px-4 py-2 rounded-full font-semibold cursor-pointer">
          All
        </div>
        <div className="bg-black px-4 py-2 rounded-full font-semibold cursor-pointer">
          Music
        </div>
        <div className="bg-black px-4 py-2 rounded-full font-semibold cursor-pointer">
          Podcasts
        </div>
      </div>
    </div>
  );
};

export default Navbar;
