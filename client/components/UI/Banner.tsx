import Image, { StaticImageData } from "next/image";
import React, { type FC } from "react";

const Banner: FC<{ children: React.ReactNode; image: StaticImageData }> = ({
  children,
  image,
}) => {
  return (
    <section className="relative w-full min-h-140 rounded-b-4xl overflow-hidden px-8 md:px-16 py-16 flex flex-col justify-between bg-linear-to-b from-black/60 via-black/40 to-black/70 shadow-lg font-sans">
      <div className="absolute inset-0 -z-10">
        <Image
          src={image}
          loading="eager"
          alt="kigali image"
          className="w-full h-full object-cover object-top"
        />
      </div>
      <div className="w-full flex flex-col items-center gap-8 mt-12 mb-8 z-10">
        {children}
      </div>
    </section>
  );
};

export default Banner;
