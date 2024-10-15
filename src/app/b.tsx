
import Navbar from "./Home/_components/Navbar";

import AddSongSection from "./Dashboard/_components/AddSongSection";
import SongsList from "./Home/_components/SongsList";

export default function Home() {


  return (
    <div className="w-full h-full  p-2 ">
      <div className="w-full h-full bg-white bg-opacity-5 flex flex-col justify-start items-center">
        <Navbar/> 
          <AddSongSection/>
            <SongsList/>
      </div>
    </div>
  );
}
