"use client";

import {
  Star,
  MapPin,
  Clock,
  Phone,
  ChevronLeft,
  X,
  Loader,
} from "lucide-react";
import { renderToString } from "react-dom/server";
import { useEffect, useState } from "react";
import { Pin } from "@/store/features/mapSlice";
import L from "leaflet";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { mapCategories, pinColors } from "./MapFeatures";

export const createCustomIcon = (type: ExploreTab) => {
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

export function createThumbnailIcon(image: string) {
  return L.divIcon({
    className: "",
    iconSize: [64, 64],
    iconAnchor: [32, 64],
    popupAnchor: [0, -64],
    html: `
      <div
        style="
          width:64px;
          height:64px;
          border-radius:14px;
          overflow:hidden;
          border:3px solid white;
          box-shadow:0 8px 20px rgba(0,0,0,.35);
          background:white;
          transform:translateY(-12px);
        "
      >
        <img
          src="${image}"
          style="
            width:100%;
            height:100%;
            object-fit:cover;
          "
        />
      </div>
    `,
  });
}

interface SelectedPlaceProps {
  pin: Pin;
  back: () => void;
  smallerScreen?: boolean;
}

export function SelectedPlace({
  pin,
  back,
  smallerScreen,
}: SelectedPlaceProps) {
  const router = useRouter();
  const [place, setPlace] = useState<{
    id: string;
    name: string;
    image: string;
    location: string;
    description: string;
    rating: string;
    reviews: string;
    price: string;
    category: string;
    tags?: string[];
    contact: Contacts;
    featured: string;
    workingHours: Workinghours;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlace() {
      try {
        setLoading(true);

        const res = await fetch(`/api/maps/${pin.type}/${pin.id}`);

        if (!res.ok) {
          throw new Error("Failed to fetch place");
        }

        const data = await res.json();

        setPlace(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchPlace();
  }, [pin.id, pin.type]);

  if (loading) {
    return (
      <p className="text-sm text-secondary/50 font-semibold h-full text-center flex items-center justify-center">
        <Loader />
      </p>
    );
  }

  if (!place) {
    return (
      <p className="text-sm text-secondary/50 font-semibold h-full text-center">
        No place found, Try again later!
      </p>
    );
  }

  return (
    <div className="w-full bg-white h-full overflow-y-auto border-r border-secondary/20 relative">
      {/* Image */}
      <button
        className={`py-1 text-sm px-1 bg-canva absolute top-3 rounded-full flex items-center hover:bg-accent hover:text-canva ${!smallerScreen ? "pr-3 left-3" : "right-3"}`}
        onClick={back}
      >
        {!smallerScreen ? (
          <>
            <ChevronLeft />
            Back
          </>
        ) : (
          <X />
        )}
      </button>
      <img
        src={place.image}
        alt={place.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-4 space-y-4">
        {/* Title */}
        <div>
          <h2 className="text-lg">
            <b>{place.name}</b> <i>({pin.distance}km)</i>
          </h2>

          <div className="flex items-center gap-1 text-sm mt-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />

            <span>{place.rating ?? "No rating"}</span>

            {place.reviews && (
              <span className="text-secondary">({place.reviews})</span>
            )}
          </div>
        </div>

        {/* Location */}
        <div className="flex gap-2 text-sm">
          <MapPin className="w-4 h-4 text-primary" />
          <span>{place.location}</span>
        </div>

        {/* Category */}
        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs capitalize">
          {place.category}
        </span>

        {/* Description */}
        {place.description && (
          <p className="text-sm text-secondary line-clamp-3">
            {place.description}
          </p>
        )}

        {/* Tags */}
        {place.tags && (
          <div className="flex flex-wrap gap-2">
            {place.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="text-xs bg-foreground px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Contact preview */}
        {place.contact?.phone && (
          <div className="flex gap-2 text-sm">
            <Phone className="w-4 h-4" />
            {place.contact.phone}
          </div>
        )}

        {/* Working hours */}
        {place.workingHours && (
          <div className="flex gap-2 text-sm">
            <Clock className="w-4 h-4" />
            {place.workingHours.map((hour, idx) => (
              <p key={idx} className="flex items-center justify-between">
                <span>{hour.day}</span>
                <span>{hour.hours}</span>
              </p>
            ))}
          </div>
        )}

        <Link href={`/${pin.type}/${pin.id}`}>
          <button className="w-full bg-canva border border-accent text-accent rounded-full py-1 font-semibold hover:bg-accent/90 hover:text-canva">
            See more details
          </button>
        </Link>
      </div>
    </div>
  );
}
