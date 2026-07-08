"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import L from "leaflet";
import { renderToString } from "react-dom/server";
import {
  Search,
  TreePine,
  Waves,
  Building2,
  Star,
  Navigation,
  Utensils,
  Coffee,
  Mountain,
  CalendarDays,
  Bus,
  Landmark,
  LucideIcon,
  Bookmark,
  MapPin,
} from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { fetchPins } from "@/store/features/mapSlice";
import UserLocation from "./UserLocation";

// IMPORTANT: Import your ATTRACTIONS or relevant state
// import { ATTRACTIONS } from "@/data/data";

const pinColors: Record<string, string> = {
  park: "#20603D",
  lake: "#00A1DE",
  city: "#FAD201",
};

const mapCategories: Record<ExploreTab, { color: string; icon: LucideIcon }> = {
  all: {
    color: "bg-[#2563eb]",
    icon: MapPin,
  },
  hotels: {
    color: "bg-[#2563eb]",
    icon: Building2,
  },
  restaurants: {
    color: "bg-[#ef4444]",
    icon: Utensils,
  },
  cafes: {
    color: "bg-[#d97706]",
    icon: Coffee,
  },
  attractions: {
    color: "bg-[#059669]",
    icon: Landmark,
  },
  events: {
    color: "bg-[#9333ea]",
    icon: CalendarDays,
  },
  transport: {
    color: "bg-[#475569]",
    icon: Bus,
  },
};
// Helper for custom Tailwind icons in Leaflet
const createCustomIcon = (type: ExploreTab) => {
  const color = pinColors[type] || "#333";
  const category = mapCategories[type];
  const Icon = category.icon;

  const iconHtml = renderToString(
    <div className="relative group">
      <div
        className={`w-10 h-10 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${
          category.color
        }`}
      >
        {type === "hotels" ? (
          <Icon className="w-4 h-4 text-white" />
        ) : type === "restaurants" ? (
          <Icon className="w-4 h-4 text-white" />
        ) : type === "cafes" ? (
          <Icon className="w-4 h-4 text-white" />
        ) : type === "attractions" ? (
          <Icon className="w-4 h-4 text-white" />
        ) : type === "events" ? (
          <Icon className="w-4 h-4 text-white" />
        ) : type === "transport" ? (
          <Icon className="w-4 h-4 text-white" />
        ) : (
          <Icon className="w-4 h-4 text-white" />
        )}
      </div>
      <div
        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45"
        style={{ backgroundColor: color }}
      />
    </div>,
  );
  return L.divIcon({
    html: iconHtml,
    className: "custom-pin",
    iconSize: [40, 48],
    iconAnchor: [20, 48],
  });
};

export default function MapPage() {
  const { pins } = useSelector((state: RootState) => state.map);
  const [selectedPinId, setSelectedPinId] = useState<string | null>(null);
  const [activeLayer, setActiveLayer] = useState<ExploreTab>("all");
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const dispatch = useAppDispatch();

  const layers: ExploreTab[] = [
    "all",
    "hotels",
    "restaurants",
    "cafes",
    "attractions",
    "events",
    "transport",
  ];

  const filteredPins =
    activeLayer === "all" ? pins : pins.filter((p) => p.type === activeLayer);

  useEffect(() => {
    dispatch(fetchPins());
  }, [dispatch]);

  function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // Earth's radius in km

    // Convert degrees to radians
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return Math.round(R * c);
  }

  return (
    <div className="fixed inset-0 pt-16 pb-14 lg:pb-0 flex">
      {/* Sidebar */}
      <div className="w-80 shrink-0 bg-white border-r border-secondary/20 flex-col h-full overflow-hidden hidden md:flex z-1000">
        <div className="p-4 border-b border-secondary/20">
          <div className="flex items-center gap-2 bg-foreground rounded-xl px-3 py-2.5 mb-3">
            <Search className="w-4 h-4 text-links" />
            <input
              placeholder="Search on map…"
              className="flex-1 bg-transparent text-sm outline-none"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {layers.map((l: ExploreTab) => (
              <button
                key={l}
                onClick={() => setActiveLayer(l)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors capitalize ${activeLayer === l ? "bg-primary text-white" : "bg-foreground text-links hover:bg-primary/10"}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredPins.map((pin) => {
            const distance = userLocation
              ? getDistance(
                  pin.lat,
                  pin.lng,
                  userLocation?.lat,
                  userLocation?.lng,
                )
              : null;
            return (
              <div
                key={pin.id}
                onClick={() => setSelectedPinId(pin.id)}
                className={`p-3 rounded-xl border cursor-pointer ${selectedPinId === pin.id ? "border-primary bg-primary text-canva" : "border-secondary/20 hover:bg-foreground"} flex gap-3`}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                  <img
                    src={pin.image}
                    alt="image"
                    className="w-full h-full object-cover "
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">{pin.name}</h4>
                  <p className="italic text-sm">
                    {pin.location + " " + (distance ? `(${distance}m)` : "")}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative bg-emerald-900">
        <MapContainer
          center={[-1.94, 30.05]}
          zoom={12}
          className="h-full w-full"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {filteredPins.map((pin) => (
            <Marker
              key={pin.id}
              position={[pin.lat, pin.lng]}
              icon={createCustomIcon(pin.type)}
              eventHandlers={{ click: () => setSelectedPinId(pin.id) }}
            />
          ))}

          <UserLocation
            onLocationFound={(location) => {
              setUserLocation(location);
            }}
          />
        </MapContainer>

        {/* Overlays (Legend and Labels preserved) */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl border p-3 z-500 hidden md:block">
          <p className="text-xs font-bold font-mono text-cta uppercase mb-2">
            Map Legend
          </p>
          {Object.entries(pinColors).map(([type, color]) => (
            <div key={type} className="flex items-center gap-2 mb-1">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="text-xs capitalize">{type}</span>
            </div>
          ))}
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/10 text-8xl font-bold pointer-events-none select-none">
          RWANDA
        </div>
      </div>
    </div>
  );
}
