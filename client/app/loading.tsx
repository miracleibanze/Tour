import React from "react";
import Logo from "@/public/logo.png";
import Image from "next/image";

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-canva flex items-center justify-center z-999">
      <Image
        src={Logo}
        width={100}
        height={100}
        className="animate-spin aspect-square origin-center"
        alt="logo"
      />
    </div>
  );
};

export default Loading;
