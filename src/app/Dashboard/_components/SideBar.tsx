import Link from "next/link";
import React from "react";
import { BiSolidAlbum } from "react-icons/bi";
import { BsFilePersonFill } from "react-icons/bs";
import { MdLibraryMusic, MdSpaceDashboard } from "react-icons/md";

const dashboardItems: {
  icon: React.ReactElement;
  title: string;
  link: string;
}[] = [
  {
    icon: <MdSpaceDashboard size={25} />,
    title: "Dashboard",
    link: "/Dashboard",
  },
  {
    icon: <BsFilePersonFill size={25} />,
    title: "Add Artist",
    link: "/Dashboard/add-artist",
  },
  {
    icon: <BiSolidAlbum size={25} />,
    title: "Add Album",
    link: "/Dashboard/add-album",
  },
  {
    icon: <MdLibraryMusic size={25} />,
    title: "Add Song",
    link: "/Dashboard/add-song",
  },
];

const SideBar = () => {
  return (
    <div className="h-full w-[20%] min-w-[200px] flex flex-col justify-start items-center bg-white">
      {dashboardItems.map((item, index) => (
        <Link key={index} href={item.link} className="w-full">
          <div className="w-full h-[70px] p-2 flex justify-start items-center gap-2 cursor-pointer bg-black">
            {item.icon}
            <p className="text-xl">{item.title}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SideBar;
