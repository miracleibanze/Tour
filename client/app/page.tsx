"use client";

import {
  Search,
  BedDouble,
  UtensilsCrossed,
  Coffee,
  CalendarDays,
  Play,
  MapPin,
  Users,
  Building2,
  TrendingUp,
  TreePine,
  Calendar,
  MapIcon,
  Compass,
  Star,
  Zap,
  Mountain,
  X,
} from "lucide-react";
import Kigali from "@/public/Kigali - Rwanda 🇷🇼.jpg";
import Banner from "../components/UI/Banner";
import { SectionHeader, StarRating } from "@/components/Reusables";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchDestinations } from "@/store/features/destinationSlice";
import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/public/logo.png";
import { HorizontalScroll } from "@/components/HorizontalScroll";
import { fetchHotels } from "@/store/features/hotelsSlice";
import { fetchRestaurants } from "@/store/features/restaurantsSlice";
import { fetchAttractions } from "@/store/features/attractionsSlice";
import { fetchEvents } from "@/store/features/eventsSlice";
import { fetchTestimonials } from "@/store/features/testimonialsSlice";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useTopLoader } from "nextjs-toploader";

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const loader = useTopLoader();

  const [liveData, setLiveData] = useState({
    annualVisitors: null as number | null,
    listedBusinesses: 0,
    tourismRevenue: null as number | null,
    nationalParks: 0,
  });
  const [loading, setLoading] = useState(true);
  const [circles, setCircles] = useState<{ top: string; left: string }[]>([]);
  const [query, setQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("");

  const {
    destinations,
    hotels,
    restaurants,
    attractions,
    events,
    testimonials,
  } = useAppSelector((state) => state);

  useEffect(() => {
    dispatch(
      fetchDestinations({
        page: 1,
        limit: 6,
      }),
    );
    dispatch(fetchHotels({ page: 1, limit: 6, featured: true }));
    dispatch(fetchRestaurants({ page: 1, limit: 6, featured: true }));
    dispatch(fetchAttractions({ page: 1, limit: 6, featured: true }));
    dispatch(fetchEvents({ page: 1, limit: 4 }));
    dispatch(fetchTestimonials({ page: 1, limit: 3 }));
  }, [dispatch]);

  useEffect(() => {
    const fetchLiveData = async () => {
      try {
        const res = await fetch("/api/analytics/live");

        if (!res.ok) {
          throw new Error();
        }

        const data = await res.json();
        setLiveData(data);
      } catch {
        console.error("Failed to fetch live analytics");
      } finally {
        setLoading(false);
      }
    };

    fetchLiveData();
  }, []);

  const handleSearch = () => {
    if (!query.trim()) return;

    loader.start();

    const url =
      selectedTab === ""
        ? `/explore?q=${encodeURIComponent(query.trim())}`
        : `/explore?q=${encodeURIComponent(query.trim())}&tab=${selectedTab}`;

    router.push(url);
  };

  const analyticsData = [
    {
      value: liveData.annualVisitors
        ? `${liveData.annualVisitors.toLocaleString()}+`
        : "N/A",
      label: "Annual Visitors",
      icon: Users,
      sub: "International & domestic",
    },
    {
      value: `${liveData.listedBusinesses.toLocaleString()}+`,
      label: "Listed Businesses",
      icon: Building2,
      sub: "Hotels, restaurants & more",
    },
    {
      value: liveData.tourismRevenue
        ? `$${liveData.tourismRevenue.toLocaleString()}`
        : "N/A",
      label: "Tourism Revenue",
      icon: TrendingUp,
      sub: "2024 earnings",
    },
    {
      value: String(liveData.nationalParks),
      label: "National Parks",
      icon: TreePine,
      sub: "World-class ecosystems",
    },
  ];

  const inspirations = [
    {
      title: "Gorilla Trekking Adventure",
      subtitle: "Meet the mountain gorillas",
      image:
        "https://images.unsplash.com/photo-1547471080-7fad4915ef59?w=600&h=400&fit=crop&auto=format",
      tag: "Wildlife",
    },
    {
      title: "Kigali City Weekend",
      subtitle: "Rwanda\'s vibrant capital",
      image:
        "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=600&h=400&fit=crop&auto=format",
      tag: "Urban",
    },
    {
      title: "Lake Kivu Retreat",
      subtitle: "Sunset cruises & island hops",
      image:
        "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=600&h=400&fit=crop&auto=format",
      tag: "Nature",
    },
  ];

  useEffect(() => {
    setCircles(
      Array.from({ length: 20 }, () => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
      })),
    );
  }, []);

  return (
    <>
      <Banner image={Kigali}>
        <div className="flex items-center cursor-pointer md:hidden absolute top-2 left-4">
          <Image
            src={logo}
            alt="logo"
            className={`w-14 h-14 flex items-center justify-center -m-1 object-center`}
          />
          <div
            className={`flex flex-col leading-tight pl-2 justify-center border-l border-canva`}
          >
            <span
              className={`text-canva font-extrabold text-xl tracking-tight p-0 m-0`}
            >
              TWIVICS
            </span>
            <span className={`text-surface text-xs font-medium`}>
              Rwanda's Tourism Intelligence & Discovery Platform
            </span>
          </div>
        </div>

        <h1 className="text-canva text-3xl text-center md:text-5xl font-black tracking-tight leading-[1.1]">
          Discover the best around you
        </h1>
        <p className="text-canva-medium text-base md:text-lg font-medium leading-relaxed max-w-2xl text-center">
          Find top hotels, restaurants and cafes in Rwanda. Compare prices, read
          reviews and book easily.
        </p>

        <div className="flex items-center gap-4">
          <Link href={"/explore"}>
            <button className="bg-links hover:bg-accent text-white font-bold px-6 py-3.5 rounded-xl text-sm shadow-md transition-all">
              Explore Now
            </button>
          </Link>
          <button className="flex items-center gap-2 bg-white/20 hover:bg-white/60 backdrop-blur-sm text-canva font-bold px-5 py-3 rounded-full text-sm border border-primary/30 transition-all">
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm">
              <Play className="w-3 h-3 text-links fill-links ml-0.5" />
            </div>
            Watch Video
          </button>
        </div>
        <div className="lg:col-span-5 w-full flex flex-col mx-auto items-center justify-center">
          <div className="w-full max-w-2xl bg-white/20 backdrop-blur-sm border border-white/30 rounded-3xl p-4 shadow-xl flex flex-col gap-3">
            <div className="w-full relative flex items-center bg-white rounded-full px-1.5 py-1.5 shadow-inner gap-2">
              {selectedTab !== "" && (
                <div className="md:flex items-center bg-secondary/20 pl-3 pr-1 py-1 gap-2 rounded-full hidden">
                  {selectedTab}

                  <button
                    onClick={() => setSelectedTab("")}
                    className="p-1 rounded-full text-accent flex items-center justify-center hover:bg-secondary/40"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                type="text"
                placeholder="Search hotels, cafes, events ..."
                className="w-full pl-3 bg-transparent text-[#1E2B14] placeholder-gray-400 text-sm font-medium outline-none border-none focus:ring-0 p-0"
              />

              <button
                onClick={handleSearch}
                className="flex bg-links hover:bg-accent duration-500 py-2 px-4 rounded-full text-white items-center"
              >
                <Search size={16} className="shrink-0" />
                <span className="md:flex hidden">&nbsp;Search</span>
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-2 w-full">
              {[
                { name: "attractions", icon: Mountain },
                { name: "hotels", icon: BedDouble },
                { name: "restaurants", icon: UtensilsCrossed },
                { name: "cafes", icon: Coffee },
                { name: "events", icon: CalendarDays },
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() =>
                    selectedTab === item.name
                      ? setSelectedTab("")
                      : setSelectedTab(item.name)
                  }
                  className={`flex items-center  justify-center gap-2 text-xs font-bold py-2.5 px-4 rounded-full  min-w-28 shadow-sm transition-colors shrink-0 capitalize ${selectedTab === item.name ? "bg-accent text-canva hover:bg-accent/60" : "bg-white hover:bg-gray-50 text-[#1E2B14]"}`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Banner>

      <section className="py-16 max-w-7xl mx-auto px-4">
        <SectionHeader
          title="Featured Destinations"
          subtitle="Rwanda's most extraordinary places to explore"
          onSeeAll={"/explore"}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {destinations.loading ? (
            Array.from({ length: 4 }).map((_, idx) => (
              <div
                className={`bg-linear-to-r from-secondary/30 via-secondary/10 to-secondary/30 shimmer relative overflow-hidden rounded-2xl cursor-pointer group ${idx === 0 ? "md:row-span-2 md:col-span-1" : ""} ${idx === 3 ? "lg:col-span-2" : ""}`}
                style={{
                  height: idx === 0 ? "auto" : "200px",
                  minHeight: idx === 0 ? "400px" : "200px",
                }}
              />
            ))
          ) : destinations.data.length && destinations.data.length > 0 ? (
            destinations.data.map((dest, i) => (
              <Link
                href={"/explore"}
                key={dest.id}
                className={`relative overflow-hidden rounded-2xl cursor-pointer group ${i === 0 ? "md:row-span-2 md:col-span-1" : ""} ${i === 3 ? "lg:col-span-2" : ""}`}
                style={{
                  height: i === 0 ? "auto" : "200px",
                  minHeight: i === 0 ? "400px" : "200px",
                }}
              >
                <div>
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 absolute inset-0"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="inline-flex items-center gap-1 bg-links/80 backdrop-blur-sm text-white text-xs font-mono font-medium px-2 py-1 rounded-full mb-2">
                      <MapPin className="w-3 h-3" /> {dest.places} places
                    </div>
                    <h3
                      className="text-white font-bold text-lg leading-tight"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {dest.name}
                    </h3>
                    <p className="text-white/80 text-sm">{dest.tagline}</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-52 w-full">
              <span className="font-bold text-secondary/70">
                Unable to load resources, Try again
              </span>
            </div>
          )}
        </div>
      </section>

      <HorizontalScroll
        title="Popular Hotels & Lodges"
        subtitle="Handpicked stays from budget to ultra-luxury"
        loading={hotels.loading}
        items={hotels.data}
        onSeeAll={"/explore?tab=hotels"}
        tab="hotels"
      />

      <section className="py-16 max-w-7xl mx-auto px-4">
        <SectionHeader
          title="Travel Inspiration"
          subtitle="Curated experiences for every kind of traveler"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {inspirations.map((item) => (
            <Link href={"/explore"} key={item.title}>
              <div className="relative overflow-hidden rounded-2xl h-64 cursor-pointer group">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="bg-accent text-canva text-xs font-bold px-3 py-1 rounded-full font-mono">
                    {item.tag}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3
                    className="text-white font-bold text-lg"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-white/80 text-sm">{item.subtitle}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <HorizontalScroll
        title="Top Restaurants"
        subtitle="From street food to fine dining across Rwanda"
        items={restaurants.data}
        onSeeAll={"/explore?tab=restaurants"}
        loading={restaurants.loading}
        tab="restaurants"
      />

      <HorizontalScroll
        title="Best Attractions"
        subtitle="National parks, lakes, mountains and cultural gems"
        items={attractions.data}
        onSeeAll={"/explore?tab=attractions"}
        loading={attractions.loading}
        tab="attractions"
      />

      <section className="py-16 max-w-7xl mx-auto px-4">
        <SectionHeader
          title="Upcoming Events"
          subtitle="Festivals, sports, arts, and cultural celebrations"
          onSeeAll={"/events"}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {events.loading ? (
            Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-linear-to-r from-secondary/30 via-secondary/10 to-secondary/30 shimmer  rounded-2xl overflow-hidden transition-all hover:-translate-y-0.5 cursor-pointer"
              />
            ))
          ) : events.data.length && events.data.length > 0 ? (
            events.data.map((event) => (
              <Link
                href={`/events/${event.id}`}
                key={event.id}
                className="bg-surface rounded-2xl overflow-hidden border border-secondary/30 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer group"
              >
                <div className="relative h-44 bg-secondary/30 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-accent text-canva text-xs font-bold font-mono px-2 py-1 rounded-full">
                      {event.category}
                    </span>
                  </div>
                  {event.date && (
                    <div className="absolute bottom-3 left-3 text-white text-xs font-medium flex items-center gap-1">
                      <Calendar className="w-3 h-3" />{" "}
                      {event.date.toLocaleString()}
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-primary text-sm leading-snug mb-2 line-clamp-2">
                    {event.name}
                  </h3>
                  <div className="flex items-center gap-1 text-secondary mb-3">
                    <MapPin className="w-3 h-3 text-primary" />
                    <span className="text-xs">{event.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <StarRating rating={event.rating} />
                      <span className="text-xs text-secondary">
                        ({event.reviews.toLocaleString()})
                      </span>
                    </div>
                    <span className="text-sm font-bold text-primary">
                      {event.price}
                    </span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-52 w-full">
              <span className="font-bold text-secondary/70">
                Unable to load resources, Try again
              </span>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-accent text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {circles.map((circle, i) => (
            <div
              key={i}
              className="absolute w-48 h-48 border-10 border-white rounded-full"
              style={{
                top: circle.top,
                left: circle.left,
                opacity: 0.1,
              }}
            />
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2
              className="text-3xl font-bold text-white mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Rwanda Tourism at a Glance
            </h2>
            <p className="text-white/70 text-lg">
              Real data from across the country&rsquo;s tourism ecosystem
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {analyticsData.map(({ value, label, icon: Icon, sub }) => (
              <div key={label} className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-amber-400" />
                </div>
                <div className="text-4xl font-bold text-white font-mono mb-1">
                  {value}
                </div>
                <div className="text-white/90 font-medium text-sm mb-1">
                  {label}
                </div>
                <div className="text-white/50 text-xs">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={Kigali}
            alt="Rwanda aerial"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-linear-to-r from-primary via-primary/80 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-secondary/20 border border-secondary/30 rounded-full px-4 py-2 text-secondary text-sm font-medium mb-6">
              <MapIcon className="w-4 h-4" /> Interactive Tourism Map
            </div>
            <h2
              className="text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Explore Rwanda&rsquo;s Beauty on the Map
            </h2>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              Navigate national parks, hotels, restaurants, and attractions with
              our interactive map. Filter by category, get directions, and
              discover hidden gems.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href={"/map"}>
                <button className="flex items-center gap-2 bg-links text-white px-6 py-3 rounded-xl font-semibold hover:bg-accent transition-colors shadow-lg">
                  <MapIcon className="w-5 h-5" /> Open Full Map
                </button>
              </Link>
              <Link href={"/explore"}>
                <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
                  <Compass className="w-5 h-5" /> Explore Places
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-foreground">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2
              className="text-3xl font-bold text-primary mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Loved by Travelers Worldwide
            </h2>
            <p className="text-secondary">
              Hear from those who discovered Rwanda through our platform
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {!testimonials.loading ||
            (testimonials.data.length && testimonials.data.length > 0) ? (
              Array.from({ length: 3 }).map((_, idx) => (
                <div
                  key={idx}
                  className="bg-surface rounded-2xl p-6 border border-secondary/20 shadow-sm"
                >
                  <div className="flex gap-1 mb-4">
                    {!testimonials.loading && testimonials.data[idx]
                      ? [...Array(testimonials.data[idx].rating)].map(
                          (_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-amber-400 text-amber-400"
                            />
                          ),
                        )
                      : Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-secondary/20 text-secondary/20"
                          />
                        ))}
                  </div>
                  {!testimonials.loading && testimonials.data[idx] ? (
                    <p className="text-primary text-sm leading-relaxed mb-5 italic">
                      &ldquo;{testimonials.data[idx].text}&rdquo;
                    </p>
                  ) : (
                    <div className="text-primary text-sm leading-relaxed mb-5 italic">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <p
                          key={i}
                          className="w-full h-4 bg-linear-to-r from-secondary/30 via-secondary/10 to-secondary/30 text-secondary/20 shimmer"
                        ></p>
                      ))}
                    </div>
                  )}
                  {!testimonials.loading && testimonials.data[idx] && (
                    <div className="flex items-center gap-3 pt-4 border-t border-secondary/20">
                      <img
                        src={testimonials.data[idx].avatar}
                        alt={testimonials.data[idx].name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-semibold text-primary text-sm">
                          {testimonials.data[idx].name}
                        </div>
                        <div className="text-xs text-secondary">
                          {testimonials.data[idx].country} ·{" "}
                          {testimonials.data[idx].trip}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-52 w-full">
                <span className="font-bold text-secondary/70">
                  Unable to load resources, Try again
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4">
        <div className="bg-linear-to-r from-accent to-accent/80 rounded-3xl p-10 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-400/30 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2
                className="text-3xl md:text-4xl font-bold text-white mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Start Planning Your Rwanda Journey
              </h2>
              <p className="text-white/80 text-lg max-w-xl">
                Join thousands of travelers who plan smarter with Discover
                Rwanda. Create your itinerary, save favorites, and explore with
                confidence.
              </p>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              <Link href={"/trips"}>
                <button className="flex items-center gap-2 bg-cta text-primary px-8 py-4 rounded-xl font-bold hover:bg-cta/80 transition-colors whitespace-nowrap shadow-lg">
                  <Zap className="w-5 h-5" /> Plan My Trip
                </button>
              </Link>
              <Link href={"/explore"}>
                <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-colors whitespace-nowrap justify-center">
                  <Search className="w-5 h-5" /> Browse Places
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
