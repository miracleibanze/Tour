"use client";

import { PlaceCard, StarRating, Tag } from "@/components/Reusables";
import { fetchAttractions } from "@/store/features/attractionsSlice";
import { fetchCafes } from "@/store/features/cafesSlice";
import { fetchEvents } from "@/store/features/eventsSlice";
import { fetchHotels } from "@/store/features/hotelsSlice";
import { fetchRestaurants } from "@/store/features/restaurantsSlice";
import { fetchTestimonials } from "@/store/features/testimonialsSlice";
import { fetchTransport } from "@/store/features/transportsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  ArrowRight,
  Bus,
  Calendar,
  ChevronsLeft,
  ChevronsRight,
  Coffee,
  Hotel,
  LayoutGrid,
  List,
  MapPin,
  Mountain,
  RotateCcw,
  RotateCw,
  Search,
  SlidersHorizontal,
  Utensils,
  X,
} from "lucide-react";
import { Suspense, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { fetchAll } from "@/store/features/allSlice";
import { fetchSearch } from "@/store/features/searchSlice";

function ExplorePageContent() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedProvince, setSelectedProvince] = useState("All");
  const [selectedRating, setSelectedRating] = useState("All");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("recommended");

  const validTabs: ExploreTab[] = [
    "all",
    "hotels",
    "restaurants",
    "cafes",
    "attractions",
    "events",
    "transport",
  ];

  const activeTab: ExploreTab = useMemo(() => {
    const tab = searchParams.get("tab");

    return tab && validTabs.includes(tab as ExploreTab)
      ? (tab as ExploreTab)
      : "all";
  }, [searchParams]);

  const setTab = (tab: ExploreTab) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("tab", tab);

    router.push(`${pathname}?${params.toString()}`);
  };

  const {
    hotels,
    restaurants,
    attractions,
    events,
    cafes,
    transports,
    all,
    search,
  } = useAppSelector((state) => state);

  const fetchMap: Record<ExploreTab, () => void> = {
    all: () => {
      dispatch(fetchAll({ q: "" }));
    },
    hotels: () => dispatch(fetchHotels({ page })),
    restaurants: () => dispatch(fetchRestaurants({ page })),
    cafes: () => dispatch(fetchCafes({ page })),
    attractions: () => dispatch(fetchAttractions({ page })),
    events: () => {
      dispatch(fetchEvents({ page }));
      dispatch(fetchTestimonials({ page }));
    },
    transport: () => dispatch(fetchTransport({ page })),
  };

  useEffect(() => {
    setSearchQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  useEffect(() => {
    setPage(1);
  }, [activeTab]);

  useEffect(() => {
    const handleResize = () => {
      setViewMode(window.innerWidth < 768 ? "list" : "grid");
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const q = searchParams.get("q")?.trim();

    if (q) {
      dispatch(
        fetchSearch({
          tab: activeTab === "all" ? undefined : activeTab,
          q,
          page,
        }),
      );

      return;
    }

    fetchMap[activeTab]?.();

    window.scrollTo({ top: 0 });
  }, [activeTab, page, searchParams, dispatch]);

  const runSearch = () => {
    const q = searchQuery.trim();

    const params = new URLSearchParams(searchParams.toString());

    if (q) {
      params.set("q", q);
    } else {
      params.delete("q");
    }

    params.delete("page");

    router.push(`${pathname}?${params.toString()}`);
    setPage(1);
  };

  const tabs: { id: ExploreTab; label: string; icon: React.ElementType }[] = [
    { id: "all", label: "All", icon: Search },
    { id: "hotels", label: "Hotels", icon: Hotel },
    { id: "restaurants", label: "Restaurants", icon: Utensils },
    { id: "cafes", label: "Cafes", icon: Coffee },
    { id: "attractions", label: "Attractions", icon: Mountain },
    { id: "events", label: "Events", icon: Calendar },
    { id: "transport", label: "Transport", icon: Bus },
  ];

  const allPagination: Record<Exclude<ExploreTab, "all">, Pagination | null> = {
    hotels: hotels.pagination,
    restaurants: restaurants.pagination,
    cafes: cafes.pagination,
    attractions: attractions.pagination,
    events: events.pagination,
    transport: transports.pagination,
  };

  const dataMap: Record<Exclude<ExploreTab, "all">, Place[]> = {
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

  const loadingMap: Record<ExploreTab, boolean> = {
    all: all.loading,
    hotels: hotels.loading,
    restaurants: restaurants.loading,
    cafes: cafes.loading,
    attractions: attractions.loading,
    events: events.loading,
    transport: transports.loading,
  };

  const isLoading = searchParams.get("q")
    ? search.loading
    : loadingMap[activeTab];

  const items = useMemo(() => {
    const isSearching = searchParams.get("q");

    if (isSearching) {
      if (activeTab !== "all") {
        return {
          [activeTab]: search.results || [],
        } as GroupedPlaces;
      }

      return {
        hotels: search.grouped.hotels || [],
        restaurants: search.grouped.restaurants || [],
        cafes: search.grouped.cafes || [],
        attractions: search.grouped.attractions || [],
        events: search.grouped.events || [],
        transport: search.grouped.transport || [],
      };
    }

    if (activeTab === "all") {
      return {
        hotels: all.hotels,
        restaurants: all.restaurants,
        cafes: all.cafes,
        attractions: all.attractions,
        events: all.events.map((e) => ({
          ...e,
          tags: [e.category],
          featured: false,
        })),
        transport: all.transport,
      };
    }

    return {
      [activeTab]: dataMap[activeTab],
    } as GroupedPlaces;
  }, [activeTab, search.results, search.grouped, all, dataMap]);

  const currentListLength = useMemo(() => {
    return Object.values(items).reduce((acc, list) => acc + list.length, 0);
  }, [items]);

  const finalList = useMemo(() => {
    const result: GroupedPlaces = {
      hotels: [],
      restaurants: [],
      cafes: [],
      attractions: [],
      events: [],
      transport: [],
    };

    Object.entries(items).forEach(([key, list]) => {
      const sorted = [...list];

      switch (sortBy) {
        case "featured":
          sorted.sort(
            (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)),
          );
          break;

        case "rating-desc":
          sorted.sort((a, b) => b.rating - a.rating);
          break;

        case "rating-asc":
          sorted.sort((a, b) => a.rating - b.rating);
          break;

        case "reviews-desc":
          sorted.sort((a, b) => b.reviews - a.reviews);
          break;

        case "reviews-asc":
          sorted.sort((a, b) => a.reviews - b.reviews);
          break;

        case "price-asc":
          sorted.sort((a, b) => {
            const priceA =
              Number(String(a.price ?? "").replace(/[^\d]/g, "")) || 0;
            const priceB =
              Number(String(b.price ?? "").replace(/[^\d]/g, "")) || 0;

            return priceA - priceB;
          });
          break;

        case "price-desc":
          sorted.sort((a, b) => {
            const priceA =
              Number(String(a.price ?? "").replace(/[^\d]/g, "")) || 0;
            const priceB =
              Number(String(b.price ?? "").replace(/[^\d]/g, "")) || 0;

            return priceB - priceA;
          });
          break;

        case "name-asc":
          sorted.sort((a, b) => a.name.localeCompare(b.name));
          break;

        case "name-desc":
          sorted.sort((a, b) => b.name.localeCompare(a.name));
          break;

        case "newest":
          sorted.sort(
            (a, b) =>
              new Date(b.createdAt ?? 0).getTime() -
              new Date(a.createdAt ?? 0).getTime(),
          );
          break;

        default:
          break;
      }
      result[key as keyof GroupedPlaces] = sorted;
    });

    return result;
  }, [items, sortBy]);

  const canGoPrevious =
    activeTab !== "all" && allPagination[activeTab]?.hasPrevious;
  const canGoNext = activeTab !== "all" && allPagination[activeTab]?.hasNext;
  const hasPages = canGoNext || canGoPrevious;

  const Pagination = useMemo(() => {
    if (isLoading) {
      return { top: null, bottom: null };
    }

    const goPrev = () => setPage((p) => Math.max(1, p - 1));
    const goNext = () => setPage((p) => p + 1);

    const common = (
      <div className="flex items-center gap-3">
        <button
          onClick={goPrev}
          disabled={!canGoPrevious}
          className={`p-2 rounded-full border transition hover:bg-accent hover:text-canva border-accent text-accent ${!canGoPrevious ? "opacity-0 pointer-events-none" : ""}`}
        >
          <ChevronsLeft />
        </button>

        {hasPages && (
          <div className="text-sm font-medium text-secondary flex gap-2">
            {Array.from({
              length: allPagination[activeTab]?.totalPages ?? 1,
            }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setPage(idx + 1)}
                className={`min-w-8 flex-0 aspect-square p-1 rounded-md border-secondary/30 ${allPagination[activeTab]?.page !== idx + 1 ? "border" : ""} hover:border-accent hover:bg-secondary/10`}
              >
                <u>{idx + 1}</u>
              </button>
            ))}
          </div>
        )}

        <button
          onClick={goNext}
          disabled={!canGoNext}
          className={`p-2 rounded-full border transition hover:bg-accent hover:text-canva border-accent text-accent ${!canGoNext ? "opacity-0 pointer-events-none" : ""}`}
        >
          <ChevronsRight />
        </button>
      </div>
    );

    return {
      top: <div className="flex justify-end">{common}</div>,
      bottom: (
        <div className="flex justify-center w-full max-w-7xl px-14 pt-8">
          {common}
        </div>
      ),
    };
  }, [isLoading, canGoPrevious, canGoNext, page]);

  return (
    <div
      className={`min-h-screen ${viewMode === "grid" ? "bg-foreground/40" : "bg-white"} pt-20 pb-20`}
    >
      {/* Search */}

      <div className="bg-white border-b border-accent/20 sticky md:-top-1.5 top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-3 flex gap-3 items-center">
          <div className="flex-1 flex items-center gap-2 bg-secondary/10 rounded-full pl-4 pr-0 py-0">
            <Search className="w-4 h-4 text-links shrink-0" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  runSearch();
                }
              }}
              placeholder="Search places, locations, categories…"
              className="flex-1 bg-transparent text-sm text-primary placeholder-accent/50 outline-none py-2"
            />
            {searchQuery.length > 0 && (
              <>
                <button
                  onClick={() => setSearchQuery("")}
                  className="p-1 rounded-full text-accent flex items-center justify-center hover:bg-secondary/40"
                >
                  <X />
                </button>
                <button
                  onClick={runSearch}
                  className="bg-accent px-5 py-1.5 rounded-e-full text-foreground flex items-center"
                >
                  Search
                </button>
              </>
            )}{" "}
            {searchParams.get("q")?.trim() && searchQuery === "" && (
              <button
                onClick={() => runSearch()}
                className="p-1 mr-2 rounded-full text-accent flex items-center justify-center hover:bg-secondary/40"
              >
                <RotateCw size={16} />
              </button>
            )}
          </div>
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-colors ${filtersOpen ? "bg-accent text-white border-accent/50" : "border-accent/30 text-accent hover:bg-foreground"}`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="ml-2 max-sm:hidden">Filters</span>
          </button>
          <div className="flex border border-accent/30 rounded-full overflow-hidden">
            {(
              [
                ["grid", LayoutGrid],
                ["list", List],
              ] as const
            ).map(([mode, Icon]) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode as ViewMode)}
                className={`px-3 py-2 transition-colors ${viewMode === mode ? "bg-accent text-white" : "text-links hover:bg-secondary/30"}`}
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>
        </div>

        {/* Filters panel */}
        {filtersOpen && (
          <div className="border-t border-secondary/20">
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
                    className="w-full bg-accent/10 border border-accent/30 rounded-full px-3 py-2 text-sm text-primary outline-none focus:border-accent/40"
                  >
                    {options.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
              ))}
              <div className="flex items-end">
                <button className="w-full bg-accent text-white py-2 rounded-lg text-sm font-semibold hover:bg-links transition-colors">
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
                  onClick={() => setTab(id)}
                  className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap shrink-0 ${activeTab === id ? "border-primary text-primary" : "border-transparent text-accent/70 hover:text-primary"}`}
                >
                  <Icon className="w-4 h-4" /> {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="w-full flex justify-between items-center pb-6">
          <p className="text-sm text-gray-500">
            {searchQuery.trim()
              ? `${Object.values(finalList).reduce(
                  (a, b) => a + b.length,
                  0,
                )} results found for "${searchQuery}"`
              : activeTab === "all"
                ? "Discover hotels, restaurants, attractions, events, and more across Rwanda"
                : `Showing ${finalList[activeTab]?.length || 0} ${activeTab}`}
          </p>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-secondary/30 bg-foreground rounded-2xl px-3 py-2 text-sm text-accent outline-none"
          >
            <option value="recommended">Sort: Recommended</option>
            <option value="featured">Featured First</option>
            <option value="rating-desc">Rating: High to Low</option>
            <option value="rating-asc">Rating: Low to High</option>
            <option value="reviews-desc">Most Reviewed</option>
            <option value="reviews-asc">Least Reviewed</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
            <option value="newest">Newest First</option>
          </select>
        </div>

        {viewMode === "grid" ? (
          activeTab === "all" ? (
            Object.entries(finalList).map(([key, list]) => (
              <div key={key} className="mb-20">
                {/* HEADER (TITLE + VIEW MORE) */}
                {isLoading ? (
                  <div className="flex flex-wrap gap-4">
                    {Array.from({ length: 3 }).map((_, idx) => (
                      <div
                        key={idx}
                        className="flex-none w-72 h-80 rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 group cursor-pointer shimmer bg-linear-to-r from-secondary/30 via-secondary/10 to-secondary/30"
                      />
                    ))}
                  </div>
                ) : currentListLength > 0 ? (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-bold capitalize text-primary">
                        {key}
                      </h2>

                      <button
                        onClick={() => setTab(key as ExploreTab)}
                        className="text-sm font-semibold text-accent hover:underline"
                      >
                        View more
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {list.map((item) => (
                        <PlaceCard
                          key={item.id}
                          place={item}
                          href={item.id}
                          tab={key}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-80 w-full sm:col-span-2 lg:col-span-3 xl:col-span-4">
                    <span className="font-bold text-secondary/70">
                      Didn't find what you are looking for, Try again later
                    </span>
                  </div>
                )}
              </div>
            ))
          ) : isLoading ? (
            <div className="flex flex-wrap gap-4">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div
                  key={idx}
                  className="flex-none w-72 h-80 rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 group cursor-pointer shimmer bg-linear-to-r from-secondary/30 via-secondary/10 to-secondary/30"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {currentListLength > 0 ? (
                finalList[activeTab].map((item: Place) => (
                  <PlaceCard
                    key={item.id}
                    place={item}
                    tab={activeTab}
                    href={item.id}
                  />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-80 w-full sm:col-span-2 lg:col-span-3 xl:col-span-4">
                  <span className="font-bold text-secondary/70">
                    Didn't find what you are looking for, Try again later
                  </span>
                </div>
              )}
            </div>
          )
        ) : (
          <div className="">
            {isLoading
              ? Array.from({ length: 2 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="bg-linear-to-r from-secondary/30 via-secondary/10 to-secondary/30 shimmer h-32 my-2 w-full"
                  />
                ))
              : activeTab === "all"
                ? Object.entries(finalList).map(([key, list]) => (
                    <div key={key} className="mb-20">
                      <div className="border-b border-foreground py-3 flex items-center justify-between mb-3">
                        <h2 className="text-lg font-bold capitalize text-primary">
                          {key}
                        </h2>

                        <button
                          onClick={() => setTab(key as ExploreTab)}
                          className="text-sm font-semibold text-accent hover:underline"
                        >
                          View more
                        </button>
                      </div>

                      {list.map((item) => (
                        <div
                          key={item.id}
                          className="border-b border-accent/20 flex overflow-hidden hover:bg-foreground transition-all cursor-pointer group p-4"
                        >
                          <div className="w-36 h-28 shrink-0 bg-secondary/30 overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>

                          <div className="flex-1 flex flex-col justify-between px-4">
                            <div>
                              <div className="flex items-start justify-between gap-2">
                                <h3 className="font-bold text-primary group-hover:underline">
                                  {item.name}
                                </h3>
                                <span className="font-bold text-accent shrink-0">
                                  {item.price}
                                </span>
                              </div>

                              <div className="flex items-center gap-1 text-accent mt-1 mb-2">
                                <MapPin className="w-3 h-3" />
                                <span className="text-xs">{item.location}</span>
                              </div>

                              {item.tags && (
                                <div className="flex gap-1 flex-wrap">
                                  {item.tags.slice(0, 3).map((t: any) => (
                                    <Tag key={t} label={t} color="gray" />
                                  ))}
                                </div>
                              )}
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1.5">
                                <StarRating rating={item.rating} />
                                <span className="text-sm font-bold">
                                  {item.rating}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  ({item.reviews.toLocaleString()} reviews)
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))
                : finalList[activeTab]?.map((item: Place) => (
                    <div
                      key={item.id}
                      className="border-b border-accent/20 flex overflow-hidden hover:bg-foreground transition-all cursor-pointer group p-4"
                    >
                      <div className="w-36 h-28 shrink-0 bg-secondary/30 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between px-4">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-bold text-primary group-hover:underline">
                              {item.name}
                            </h3>
                            <span className="font-bold text-accent shrink-0">
                              {item.price}
                            </span>
                          </div>

                          <div className="flex items-center gap-1 text-accent mt-1 mb-2">
                            <MapPin className="w-3 h-3" />
                            <span className="text-xs">{item.location}</span>
                          </div>

                          {item.tags && (
                            <div className="flex gap-1 flex-wrap">
                              {item.tags.slice(0, 3).map((t: any) => (
                                <Tag key={t} label={t} color="gray" />
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <StarRating rating={item.rating} />
                            <span className="text-sm font-bold">
                              {item.rating}
                            </span>
                            <span className="text-xs text-muted-foreground">
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
      {Pagination.bottom}
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ExplorePageContent />
    </Suspense>
  );
}
