"use client";

import { PlaceCard, StarRating, Tag } from "@/components/Reusables";
import { fetchAttractions } from "@/store/features/attractionsSlice";
import { fetchCafes } from "@/store/features/cafesSlice";
import { fetchDestinations } from "@/store/features/destinationSlice";
import { fetchEvents } from "@/store/features/eventsSlice";
import { fetchHotels } from "@/store/features/hotelsSlice";
import { fetchRestaurants } from "@/store/features/restaurantsSlice";
import { fetchTestimonials } from "@/store/features/testimonialsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  ArrowRight,
  Bus,
  Calendar,
  Coffee,
  Hotel,
  LayoutGrid,
  List,
  MapPin,
  Mountain,
  Search,
  SlidersHorizontal,
  Utensils,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState<ExploreTab>("hotels");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("All");
  const [selectedRating, setSelectedRating] = useState("All");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const { hotels, restaurants, attractions, events, cafes, transports } =
    useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchHotels({ page: 1 }));
    dispatch(fetchRestaurants({ page: 1 }));
    dispatch(fetchAttractions({ page: 1 }));
    dispatch(fetchEvents({ page: 1 }));
    dispatch(fetchTestimonials({ page: 1 }));
    dispatch(fetchCafes({ page: 1 }));
  }, [dispatch]);

  const tabs: { id: ExploreTab; label: string; icon: React.ElementType }[] = [
    { id: "hotels", label: "Hotels", icon: Hotel },
    { id: "restaurants", label: "Restaurants", icon: Utensils },
    { id: "cafes", label: "Cafes", icon: Coffee },
    { id: "attractions", label: "Attractions", icon: Mountain },
    { id: "events", label: "Events", icon: Calendar },
    { id: "transport", label: "Transport", icon: Bus },
  ];

  const dataMap: Record<ExploreTab, Place[]> = {
    hotels: hotels.data,
    restaurants: restaurants.data,
    cafes: cafes.data,
    attractions: attractions.data,
    events: events.data.map((e) => ({
      ...e,
      tags: [e.category],
      featured: false,
    })),
    transport: transports.data,
  };

  const items = dataMap[activeTab].filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      item.location.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-foreground pt-20 pb-20">
      {/* Search bar */}
      <div className="bg-white border-b border-secondary/20 sticky top-0 lg:-top-3 z-30">
        <div className="max-w-7xl mx-auto px-4 py-3 flex gap-3 items-center">
          <div className="flex-1 flex items-center gap-2 bg-foreground rounded-xl px-4 py-2.5">
            <Search className="w-4 h-4 text-secondary shrink-0" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search places, locations, categories…"
              className="flex-1 bg-transparent text-sm text-primary placeholder-secondary outline-none"
            />
          </div>
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors ${filtersOpen ? "bg-primary text-white border-primary" : "border-secondary/20 text-primary hover:bg-secondary/40"}`}
          >
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>
          <div className="hidden sm:flex border border-secondary/20 rounded-xl overflow-hidden">
            {(
              [
                ["grid", LayoutGrid],
                ["list", List],
              ] as const
            ).map(([mode, Icon]) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode as ViewMode)}
                className={`px-3 py-2.5 transition-colors ${viewMode === mode ? "bg-primary text-white" : "text-secondary hover:bg-secondary/20"}`}
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>
        </div>

        {/* Filters panel */}
        {filtersOpen && (
          <div className="border-t border-secondary/20 bg-white">
            <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  label: "Province",
                  options: [
                    "All",
                    "Kigali City",
                    "Northern",
                    "Western",
                    "Eastern",
                    "Southern",
                  ],
                  value: selectedProvince,
                  onChange: setSelectedProvince,
                },
                {
                  label: "Rating",
                  options: ["All", "5★ only", "4★ & above", "3★ & above"],
                  value: selectedRating,
                  onChange: setSelectedRating,
                },
              ].map(({ label, options, value, onChange }) => (
                <div key={label}>
                  <label className="block text-xs font-bold text-primary font-mono uppercase tracking-wide mb-1.5">
                    {label}
                  </label>
                  <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full bg-secondary/40 border border-secondary/20 rounded-lg px-3 py-2 text-sm text-primary outline-none focus:border-primary"
                  >
                    {options.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
              ))}
              <div className="flex items-end">
                <button className="w-full bg-primary text-white py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors">
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="border-t border-secondary/20">
          <div className="max-w-7xl mx-auto px-4">
            <div
              className="flex gap-0 overflow-x-auto scrollbar-hide"
              style={{ scrollbarWidth: "none" }}
            >
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap shrink-0 ${activeTab === id ? "border-primary text-primary" : "border-transparent text-secondary hover:text-primary"}`}
                >
                  <Icon className="w-4 h-4" /> {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-secondary font-mono">
            <span className="font-bold text-primary">{items.length}</span>{" "}
            results found
          </p>
          <select className="bg-foreground border border-secondary/20 rounded-lg px-3 py-2 text-sm text-primary outline-none">
            <option>Sort: Recommended</option>
            <option>Rating: High to Low</option>
            <option>Price: Low to High</option>
            <option>Most Reviewed</option>
          </select>
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {items.map((item) => (
              <PlaceCard key={item.id} place={item} />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-card border border-secondary/20 rounded-2xl flex overflow-hidden hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="w-48 h-36 shrink-0 bg-secondary/40 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-primary">{item.name}</h3>
                      <span className="font-bold text-primary shrink-0">
                        {item.price}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-secondary mt-1 mb-2">
                      <MapPin className="w-3 h-3 text-primary" />
                      <span className="text-xs">{item.location}</span>
                    </div>
                    {item.tags && (
                      <div className="flex gap-1 flex-wrap">
                        {item.tags.slice(0, 3).map((t) => (
                          <Tag key={t} label={t} color="gray" />
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <StarRating rating={item.rating} />
                      <span className="text-sm font-bold">{item.rating}</span>
                      <span className="text-xs text-secondary">
                        ({item.reviews.toLocaleString()} reviews)
                      </span>
                    </div>
                    <button className="flex items-center gap-1.5 text-primary text-sm font-semibold hover:gap-2 transition-all">
                      View details <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
