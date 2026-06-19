import React from "react";
import {
  // Main Category Dropdown Icons
  LayoutDashboard,
  Star,
  Tags,
  Sparkles,
  MessageSquare,
  HelpCircle, // Home
  Compass,
  ShieldCheck,
  Trees,
  Landmark,
  Palmtree,
  Mountain, // Explore
  Hotel,
  Building,
  Tent,
  Home as HouseIcon,
  Bed,
  Activity, // Hotels
  Utensils,
  Flame,
  Store,
  Egg,
  Wine, // Restaurants
  Coffee,
  Croissant,
  Briefcase,
  Leaf,
  Cake, // Cafés
  Music,
  Users,
  GalleryHorizontal,
  Pizza,
  Globe,
  Hammer,
  Bookmark,
  Sunset,
  Blender,
  Ellipsis,
} from "lucide-react";
import logo from "./../assets/logo.png";
import { useLocation } from "react-router-dom";

export default function HeroSection() {
  const { pathname } = useLocation();
  // Navigation data with dedicated icons mapped for each specific submenu option

  const menuCategories = [
    {
      name: "Home",
      href: "/",
      active: pathname === "/",
      links: [
        { name: "Dashboard", icon: LayoutDashboard },
        { name: "Featured Stays", icon: Star },
        { name: "Top Offers", icon: Tags },
        { name: "New Openings", icon: Sparkles },
        { name: "User Reviews", icon: MessageSquare },
        { name: "Help Center", icon: HelpCircle },
        { name: "Others", icon: Ellipsis },
      ],
    },
    {
      name: "Explore",
      href: "/explore",
      active: pathname.startsWith("/explore"),
      links: [
        { name: "Gorilla Trekking", icon: Compass },
        { name: "Akagera Safaris", icon: ShieldCheck },
        { name: "Nyungwe Canopy", icon: Trees },
        { name: "Cultural Sites", icon: Landmark },
        { name: "Art Galleries", icon: Palmtree },
        { name: "Hiking Trails", icon: Mountain },
        { name: "Others", icon: Ellipsis },
      ],
    },
    {
      name: "Hotels & Motels",
      href: "/hotels",
      active: pathname.startsWith("/hotels"),
      links: [
        { name: "Luxury Resorts", icon: Hotel },
        { name: "Boutique Hotels", icon: Building },
        { name: "Roadside Motels", icon: Bed },
        { name: "Eco-Lodges", icon: Tent },
        { name: "Serviced Apartments", icon: HouseIcon },
        { name: "Wellness Spas", icon: Activity },
        { name: "Others", icon: Ellipsis },
      ],
    },
    {
      name: "Restaurants",
      href: "/restaurants",
      active: pathname.startsWith("/restaurants"),
      links: [
        { name: "Fine Dining", icon: Utensils },
        { name: "Traditional Kitchens", icon: Flame },
        { name: "Rooftop Lounges", icon: Sunset },
        { name: "Local Bistros", icon: Store },
        { name: "Food Markets", icon: Egg },
        { name: "Wine Bars", icon: Wine },
        { name: "Others", icon: Ellipsis },
      ],
    },
    {
      name: "Cafés",
      href: "/cafes",
      active: pathname.startsWith("/cafes"),
      links: [
        { name: "Specialty Coffee", icon: Coffee },
        { name: "Bakery Cafés", icon: Croissant },
        { name: "Work-Friendly", icon: Briefcase },
        { name: "Artisan Roasters", icon: Leaf },
        { name: "Tea Houses", icon: Blender },
        { name: "Dessert Spots", icon: Cake },
        { name: "Others", icon: Ellipsis },
      ],
    },
    {
      name: "Events",
      href: "/events",
      active: pathname.startsWith("/events"),
      links: [
        { name: "Live Concerts", icon: Music },
        { name: "Conferences & MICE", icon: Users },
        { name: "Art Exhibitions", icon: GalleryHorizontal },
        { name: "Food Festivals", icon: Pizza },
        { name: "Cultural Expos", icon: Globe },
        { name: "Workshops", icon: Hammer },
        { name: "Others", icon: Ellipsis },
      ],
    },
  ];

  return (
    <header className="w-full flex items-center justify-between z-50 backdrop-blur-2xl fixed top-0 right-0 left-0 border-b border-[#1E2B14]/5 bg-white/70">
      <div className="flex items-center justify-between py-1 mx-auto max-w-screen-2xl w-full px-14">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3 cursor-pointer">
          <img
            src={logo}
            alt="logo"
            className="w-14 h-14 flex items-center justify-center -m-1"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-[#1E2B14] font-extrabold text-xl tracking-tight">
              DHHD
            </span>
            <span className="text-[#4A7C3A] text-xs font-medium">
              Hospitality Platform
            </span>
          </div>
        </div>

        {/* Navigation Links with Hover/Click Dropdown Menus */}
        <nav className="hidden lg:flex items-center gap-2 text-[#1E2B14] font-semibold text-sm h-12">
          {menuCategories.map((category, index) => (
            <div
              key={index}
              className={`relative group/nav h-full flex items-center px-3`}
            >
              {/* Main Nav Item */}
              <a
                href={category.href}
                className={`hover:text-[#4A7C3A] transition-colors py-2 block  ${category.active ? "custom_underline" : ""}`}
              >
                {category.name}
              </a>

              {/* The Dropdown Box (Appears Below) */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-60 bg-white/95 backdrop-blur-md border border-[#1E2B14]/10 rounded-2xl p-2 shadow-xl invisible opacity-0 scale-95 group-hover/nav:visible group-hover/nav:opacity-100 group-hover/nav:scale-100 focus-within:visible focus-within:opacity-100 focus-within:scale-100 transition-all duration-200 ease-out pointer-events-auto">
                <div className="grid grid-cols-1 gap-0.5">
                  {category.links.map((link, linkIdx) => {
                    const LinkIcon = link.icon;
                    return (
                      <a
                        key={linkIdx}
                        href={`#${link.name.toLowerCase().replace(/\s+/g, "-")}`}
                        className="flex items-center gap-2.5 text-xs font-bold text-[#4A7C3A] hover:text-[#1E2B14] hover:bg-[#F4F9C5]/60 px-3 py-2 rounded-xl transition-all block "
                      >
                        <LinkIcon className="w-4 h-4 text-[#4A7C3A]/80 shrink-0" />
                        <span>{link.name}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </nav>

        {/* Action Controls (Bookmarks + Auth Link) */}
        <div className="flex items-center gap-4">
          {/* User Saved / Bookmarked Places Link */}
          <a
            href="#bookmarks"
            aria-label="View bookmarked items"
            className="relative p-2.5 rounded-xl border border-[#1E2B14]/10 bg-white/50 text-[#1E2B14] hover:bg-white hover:text-[#4A7C3A] transition-all shadow-sm group"
          >
            <Bookmark className="w-5 h-5 transition-transform group-hover:scale-105" />
            {/* Visual indicator notification bubble */}
            <span className="absolute -top-1 -right-1 bg-[#F2B705] text-[#1E2B14] text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white shadow-sm">
              3
            </span>
          </a>

          {/* Auth Button */}
          <button className="bg-[#1E2B14] hover:bg-[#2D4A22] text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-all shadow-md">
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
}
