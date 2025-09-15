"use client";

import { ReactNode } from "react";

const AppsLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <div className="w-screen h-screen bg-gray-400/70 flex justify-center overflow-hidden">
      <div className="w-[430px] h-screen overflow-x-hidden overflow-y-auto bg-white">
        {children}
      </div>
    </div>
  );
};

export default AppsLayout;
