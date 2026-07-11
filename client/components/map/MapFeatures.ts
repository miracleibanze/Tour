import {
  Building2,
  Utensils,
  Coffee,
  CalendarDays,
  Bus,
  Landmark,
  LucideIcon,
  MapPin,
} from "lucide-react";

export const pinColors: Record<string, string> = {
  park: "#20603D",
  lake: "#00A1DE",
  city: "#FAD201",
};

export const mapCategories: Record<
  ExploreTab,
  { color: string; icon: LucideIcon }
> = {
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
