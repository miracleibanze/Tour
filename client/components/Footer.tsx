"use client";

import { Flag, Globe, Mail, Phone } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "@/public/logo.png";

const Footer = () => {
  const router = useRouter();
  const footerText = [
    {
      title: "Discover",
      links: ["Hotels", "Restaurants", "Attractions", "Events", "Transport"],
    },
    {
      title: "Destinations",
      links: ["Kigali", "Musanze", "Lake Kivu", "Nyungwe", "Akagera"],
    },
    {
      title: "Platform",
      links: [
        "Trip Planner",
        "Business Portal",
        "Government Portal",
        "Mobile App",
        "API Access",
      ],
    },
  ];

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Image src={logo} alt="logo" className="w-full h-full" />
              </div>
              <span
                className="font-bold text-lg"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                <span className="text-white">Discover </span>
                <span className="text-amber-400">Rwanda</span>
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Rwanda&rsquo;s official national tourism discovery and
              intelligence platform. Connecting travelers with the world&rsquo;s
              most extraordinary destination.
            </p>
            <div className="flex gap-3 mt-4">
              {[Globe, Mail, Phone].map((Icon, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
                >
                  <Icon className="w-4 h-4 text-white/70" />
                </div>
              ))}
            </div>
          </div>
          {footerText.map(({ title, links }) => (
            <div key={title}>
              <h4 className="font-bold text-white text-sm mb-4 font-mono uppercase tracking-wide">
                {title}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => router.push("/explore")}
                      className="text-white/60 hover:text-white text-sm transition-colors text-left"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © 2025 Rwanda Development Board. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Use", "Accessibility", "Contact"].map(
              (link) => (
                <button
                  key={link}
                  className="text-white/40 hover:text-white/70 text-xs transition-colors"
                >
                  {link}
                </button>
              ),
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
