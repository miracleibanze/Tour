import React, { type FC } from "react";

const Banner: FC<{ children: React.ReactNode; image: string }> = ({
  children,
  image,
}) => {
  return (
    <section className="relative w-full min-h-140 rounded-b-4xl overflow-hidden px-8 md:px-16 py-8 flex flex-col justify-between bg-linear-to-b from-[#FFFCE0] via-[#f4f9c5e2] to-[#a3d97700] shadow-lg font-sans">
      <div className="absolute inset-0 -z-10">
        <img src={image} alt="kigali image" className="w-full h-full" />
      </div>
      <div className="w-full flex flex-col items-center gap-8 mt-12 mb-8 z-10">
        {children}
      </div>
    </section>
  );
};

export default Banner;
