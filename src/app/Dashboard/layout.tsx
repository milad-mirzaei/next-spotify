import React from "react";
import SideBar from "./_components/SideBar";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body>
        <div className="w-screen h-screen flex " >
            <SideBar/>
            <div className="h-full w-[80%] flex flex-col justify-start items-center" >
            {children}
            </div>
            </div>
      </body>
    </html>
  );
};

export default Layout;
