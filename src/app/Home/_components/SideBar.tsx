import Link from "next/link";
import React from "react";
import { FiArrowRight, FiHome, FiPlus, FiSearch } from "react-icons/fi";
import { VscLibrary } from "react-icons/vsc";

const SideBar = () => {
  const sideMenuItems: { title: string; icon: React.ReactElement,href:string }[] = [
    {
      title: "Home",
      icon: <FiHome size={30} />,
      href:'/Home'
    },
    {
      title: "Search",
      icon: <FiSearch size={30} />,
      href:'/Dashboard'
    },
  ];

  return (
    <div className="md:w-[20%] md:min-w-[350px] w-0 h-full lg:flex hidden flex-col justify-start items-center gap-2 p-2 bg-black">
      <div className="w-full flex flex-col ">
        {sideMenuItems.map((item, index) => (
          <Link  key={index} href={item.href} >
          <div
            className="w-full h-[57px] flex justify-start items-center gap-3 px-2 cursor-pointer bg-white text-white bg-opacity-5 hover:bg-opacity-10"
          >
            {item.icon}
            <p className="text-lg">{item.title}</p>
          </div>
          </Link>
        ))}
      </div>
      <div className="w-full h-1 flex-auto bg-white text-white bg-opacity-5 px-2 flex flex-col justify-start items-center gap-4">
        <div className="w-full h-[57px] flex justify-between items-center">
          <div className="flex justify-center items-center gap-2">
            <VscLibrary size={30} />
            <p className="text-lg">Your Library</p>
          </div>
          <div className="flex justify-center items-center ">
            <div className="w-[40px] aspect-square flex justify-center items-center hover:bg-white hover:bg-opacity-20 cursor-pointer">
              <FiArrowRight fontSize={25} />
            </div>
            <div className="w-[40px] aspect-square flex justify-center items-center hover:bg-white hover:bg-opacity-20 cursor-pointer">
              <FiPlus fontSize={25} />
            </div>
          </div>
        </div>
        <div className="w-full bg-white bg-opacity-20  p-4 flex flex-col justify-start items-start gap-2">
          <p className="text-lg ">Create your first playlist</p>
          <p className="text-base text-white text-opacity-50 ">{`it's easy we will help you`}</p>
          <p className="bg-white text-black px-5 py-2 rounded-full font-bold text-base cursor-pointer hover:bg-opacity-90">
            Create Playlist
          </p>
        </div>
        <div className="w-full bg-white bg-opacity-20  p-4 flex flex-col justify-start items-start gap-2">
          <p className="text-lg ">{`Let's find some podcasts to follow`}</p>
          <p className="text-base text-white text-opacity-50 ">{`we'll keep you update on new episodes`}</p>
          <p className="bg-white text-black px-5 py-2 rounded-full font-bold text-base cursor-pointer hover:bg-opacity-90">
            Browse Podcasts
          </p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
