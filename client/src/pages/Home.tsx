import {
  Search,
  BedDouble,
  UtensilsCrossed,
  Coffee,
  CalendarDays,
  Play,
} from "lucide-react";
import Kigali from "../assets/Kigali - Rwanda 🇷🇼.jpg";
import Banner from "../components/UI/Banner";

export default function HeroSection() {
  return (
    <>
      <Banner image={Kigali}>
        <h1 className="text-[#1E2B14] text-3xl text-center md:text-5xl font-black tracking-tight leading-[1.1]">
          Discover the best around you
        </h1>
        <p className="text-[#4A5568] text-base md:text-lg font-medium leading-relaxed max-w-2xl text-center">
          Find top hotels, restaurants and cafés in Rwanda. Compare prices, read
          reviews and book easily.
        </p>

        <div className="flex items-center gap-4">
          <button className="bg-[#1E2B14] hover:bg-[#2D4A22] text-white font-bold px-6 py-3.5 rounded-xl text-sm shadow-md transition-all">
            Explore Now
          </button>
          <button className="flex items-center gap-2 bg-white/40 hover:bg-white/60 backdrop-blur-sm text-[#1E2B14] font-bold px-5 py-3 rounded-full text-sm border border-white/20 transition-all">
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm">
              <Play className="w-3 h-3 text-[#1E2B14] fill-[#1E2B14] ml-0.5" />
            </div>
            Watch Video
          </button>
        </div>
        <div className="lg:col-span-5 w-full flex flex-col mx-auto items-center justify-center">
          <div className="w-full max-w-2xl bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl p-4 shadow-xl flex flex-col gap-3">
            <div className="w-full relative flex items-center bg-white rounded-full px-4 py-1 shadow-inner">
              <Search className="w-5 h-5 text-gray-400 mr-2 shrink-0" />
              <input
                type="text"
                placeholder="Search places, dishes, hotels..."
                className="w-full bg-transparent text-[#1E2B14] placeholder-gray-400 text-sm font-medium outline-none border-none focus:ring-0 p-0"
              />
              <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors shrink-0">
                <svg
                  className="w-5 h-5 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-2 w-full">
              <button className="flex items-center  justify-center gap-2 bg-white hover:bg-gray-50 text-[#1E2B14] text-xs font-bold py-2.5 px-4 rounded-full  min-w-28 shadow-sm transition-colors shrink-0">
                <BedDouble className="w-4 h-4 text-gray-700" />
                Hotels
              </button>
              <button className="flex items-center  justify-center gap-2 bg-white hover:bg-gray-50 text-[#1E2B14] text-xs font-bold py-2.5 px-4 rounded-full  min-w-28 shadow-sm transition-colors shrink-0">
                <UtensilsCrossed className="w-4 h-4 text-gray-700" />
                Restaurants
              </button>
              <button className="flex items-center  justify-center gap-2 bg-white hover:bg-gray-50 text-[#1E2B14] text-xs font-bold py-2.5 px-4 rounded-full  min-w-28 shadow-sm transition-colors shrink-0">
                <Coffee className="w-4 h-4 text-gray-700" />
                Cafés
              </button>
              <button className="flex items-center  justify-center gap-2 bg-white hover:bg-gray-50 text-[#1E2B14] text-xs font-bold py-2.5 px-4 rounded-full  min-w-28 shadow-sm transition-colors shrink-0">
                <CalendarDays className="w-4 h-4 text-gray-700" />
                Events
              </button>
            </div>
          </div>
        </div>
      </Banner>
    </>
  );
}
