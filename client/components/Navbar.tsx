"use client";

import {
  LayoutDashboard,
  Compass,
  Hotel,
  Utensils,
  Coffee,
  Music,
  Bookmark,
  Map,
  Bus,
  User,
} from "lucide-react";
import logo from "@/public/logo.png";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  // Navigation data with dedicated icons mapped for each specific submenu option

  const menuCategories: {
    label: string;
    page: Page;
    active: boolean;
    home?: boolean;
  }[] = [
    { label: "Home", page: "/", active: pathname === "/", home: true },
    {
      label: "Explore",
      page: "/explore",
      active: pathname.startsWith("/explore"),
    },
    { label: "Map", page: "/map", active: pathname.startsWith("/map") },
    {
      label: "Events",
      page: "/events",
      active: pathname.startsWith("/events"),
    },
    {
      label: "Transport",
      page: "/transport",
      active: pathname.startsWith("/transport"),
    },
  ];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);

    window.addEventListener("scroll", handler);

    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, []);

  return (
    <>
      <header
        className={`w-full md:flex items-center justify-between z-50 md:fixed ${pathname === "/" ? "hidden" : "absolute"} top-0 right-0 left-0 ${scrolled || pathname !== "/" ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"} transition-all duration-300`}
      >
        <div className="flex items-center justify-between py-1 mx-auto max-w-7xl w-full px-4">
          {/* Brand Logo & Name */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Image
              src={logo}
              alt="logo"
              className={`w-14 h-14 flex items-center justify-center -m-1 object-center`}
            />
            <div
              className={`flex flex-col leading-tight pl-2 justify-center border-l ${scrolled || pathname !== "/" ? "border-primary" : "border-canva"}`}
            >
              <span
                className={`${scrolled || pathname !== "/" ? "text-primary" : "text-canva"} font-extrabold text-xl tracking-tight p-0 m-0`}
              >
                TWIVICS
              </span>
              <span
                className={`${scrolled || pathname !== "/" ? "text-accent" : "text-surface"} text-xs font-medium`}
              >
                Hospitality Platform
              </span>
            </div>
          </div>

          {/* Navigation Links with Hover/Click Dropdown Menus */}
          <nav className="hidden lg:flex items-center gap-1">
            {menuCategories.map(({ label, page, active, home }) => (
              <button
                key={page}
                onClick={() => router.push(page)}
                className={`px-3 py-2 rounded-lg text-sm ${scrolled || pathname !== "/" ? "text-primary" : "text-canva"} font-medium transition-colors ${active ? "custom_underline" : ""} hover:bg-secondary/20 cursor-pointer`}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Action Controls (Bookmarks + Auth Link) */}
          <div className="hidden lg:flex items-center gap-4">
            {/* User Saved / Bookmarked Places Link */}
            <a
              href="/bookmarks"
              aria-label="View bookmarked items"
              className="relative p-2.5 rounded-xl border border-canva/40 bg-white/30 text-[#1E2B14] hover:bg-white hover:text-[#4A7C3A] transition-all shadow-sm group"
            >
              <Bookmark
                className={`w-5 h-5 transition-transform group-hover:scale-105 ${scrolled || pathname !== "/" ? "text-primary" : "text-canva hover:text-primary"}`}
              />
              {/* Visual indicator notification bubble */}
              <span className="absolute -top-1 -right-1 bg-[#F2B705] text-[#1E2B14] text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white shadow-sm">
                3
              </span>
            </a>

            {/* Auth Button */}
            <button className="bg-links hover:bg-accent text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-all shadow-md">
              Sign In
            </button>
          </div>
        </div>
      </header>
      <MobileNavbar />
    </>
  );
};

const MobileNavbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const items = [
    { name: "Home", href: "/", icon: LayoutDashboard },
    { name: "Explore", href: "/explore", icon: Compass },
    { name: "Map", href: "/map", icon: Map },
    { name: "Events", href: "/events", icon: Music },
    { name: "Transport", href: "/transport", icon: Bus },
    { name: "Profile", href: "/profile", icon: User },
  ];

  return (
    <nav className="fixed lg:hidden bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-black/10 shadow-lg">
      <div className="flex items-center justify-between px-2 py-2">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <button
              key={item.name}
              onClick={() => router.push(item.href)}
              className="flex flex-col items-center justify-center gap-1 flex-1"
            >
              <div
                className={`p-2 rounded-xl transition-all ${
                  active
                    ? "bg-[#1E2B14] text-white scale-110"
                    : "text-[#1E2B14]/70"
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>

              <span
                className={`text-[10px] font-semibold ${
                  active ? "text-[#1E2B14]" : "text-gray-500"
                }`}
              >
                {item.name}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
