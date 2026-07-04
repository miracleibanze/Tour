"use client";

import { StarRating, Tag } from "@/components/Reusables";
import { fetchHotels } from "@/store/features/hotelsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  Award,
  Bookmark,
  Camera,
  CheckCircle,
  ChevronLeft,
  Globe,
  Heart,
  Mail,
  MapPin,
  Navigation,
  Phone,
  Plus,
  Share2,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function EntityPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const tabs = ["overview", "photos", "reviews", "map"];
  const [place, setPlace] = useState<Place | undefined>(undefined);

  const dispatch = useAppDispatch();

  const { hotels, attractions } = useAppSelector((state) => state);

  useEffect(() => {
    dispatch(fetchHotels({ page: 1 }));
  }, [dispatch]);

  useEffect(() => {
    setPlace(hotels.data[0]);
  }, [hotels.data]);

  const reviews = [
    {
      id: 1,
      name: "Michael Chen",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&auto=format",
      rating: 5,
      date: "March 2025",
      text: "An absolutely extraordinary experience. The staff were knowledgeable and welcoming, the facilities were world-class, and the natural setting is unlike anything else I have seen in Africa.",
    },
    {
      id: 2,
      name: "Amara Diallo",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&auto=format",
      rating: 5,
      date: "February 2025",
      text: "Exceeded every expectation. Booking through Discover Rwanda was seamless and the recommendations were spot-on. Will be returning next year.",
    },
    {
      id: 3,
      name: "Lucas Bergmann",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop&auto=format",
      rating: 4,
      date: "January 2025",
      text: "Highly recommended. The location is stunning and the experience was genuinely memorable. A few minor organizational points but overall exceptional value.",
    },
  ];

  const ratingBreakdown = [
    { label: "Location", value: 4.9 },
    { label: "Cleanliness", value: 4.8 },
    { label: "Service", value: 4.9 },
    { label: "Value", value: 4.6 },
  ];
  if (!place) return <p>Loading.....</p>;
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero gallery */}
      <div className="relative h-80 md:h-96 bg-muted overflow-hidden">
        <img
          src={place.image}
          alt={place.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/60" />
        <button className="absolute top-4 left-4 mt-12 flex items-center gap-2 bg-white/90 backdrop-blur-sm text-foreground px-4 py-2 rounded-full text-sm font-medium hover:bg-white transition-colors shadow-sm">
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <div className="absolute top-4 right-4 mt-12 flex gap-2">
          <button
            onClick={() => setLiked(!liked)}
            className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm shadow transition-colors ${liked ? "bg-red-500 text-white" : "bg-white/90 text-foreground"}`}
          >
            <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
          </button>
          <button
            onClick={() => setSaved(!saved)}
            className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm shadow transition-colors ${saved ? "bg-primary text-white" : "bg-white/90 text-foreground"}`}
          >
            <Bookmark className={`w-5 h-5 ${saved ? "fill-current" : ""}`} />
          </button>
          <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-foreground shadow hover:bg-white transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
        <div className="absolute bottom-4 right-4">
          <button className="flex items-center gap-2 bg-white/90 backdrop-blur-sm text-foreground px-4 py-2 rounded-full text-sm font-medium shadow hover:bg-white transition-colors">
            <Camera className="w-4 h-4" /> View all photos
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-8 relative z-10">
        {/* Header card */}
        <div className="bg-card rounded-2xl border border-border shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-primary/10 text-primary text-xs font-bold font-mono px-3 py-1 rounded-full">
                  {place.category}
                </span>
                {place.featured && (
                  <span className="bg-accent text-accent-foreground text-xs font-bold font-mono px-3 py-1 rounded-full flex items-center gap-1">
                    <Award className="w-3 h-3" /> Featured
                  </span>
                )}
              </div>
              <h1
                className="text-2xl md:text-3xl font-bold text-foreground mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {place.name}
              </h1>
              <div className="flex items-center gap-2 text-muted-foreground mb-3">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm">{place.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <StarRating rating={place.rating} size="md" />
                  <span className="font-bold text-foreground">
                    {place.rating}
                  </span>
                </div>
                <span className="text-muted-foreground text-sm">
                  ({place.reviews.toLocaleString()} reviews)
                </span>
                <span className="text-muted-foreground text-sm font-mono">
                  ·
                </span>
                <div className="flex gap-1">
                  {place.tags &&
                    place.tags
                      .slice(0, 3)
                      .map((t) => <Tag key={t} label={t} color="green" />)}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start md:items-end gap-3">
              <div>
                <div className="text-2xl font-bold text-primary font-mono">
                  {place.price}
                </div>
                <div className="text-xs text-muted-foreground text-right mt-0.5">
                  per person / per night
                </div>
              </div>
              <button className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-md w-full md:w-auto">
                Book Now
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div
          className="flex gap-0 border-b border-border mb-6 overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: "none" }}
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-sm font-semibold capitalize border-b-2 transition-colors whitespace-nowrap ${activeTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h2
                  className="font-bold text-foreground text-lg mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  About
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {place.description ||
                    `${place.name} is one of Rwanda's most celebrated destinations, offering an unforgettable experience that blends natural beauty, cultural depth, and world-class hospitality. Visitors consistently rate it among the top experiences in East Africa.`}
                </p>
              </div>
              {/* Amenities */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h2
                  className="font-bold text-foreground text-lg mb-4"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Amenities & Services
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    ...(place.tags ? place?.tags : []),
                    "Free WiFi",
                    "24h Reception",
                    "Airport Transfer",
                  ].map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-2 text-sm text-foreground"
                    >
                      <CheckCircle className="w-4 h-4 text-primary shrink-0" />{" "}
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
              {/* Opening hours */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h2
                  className="font-bold text-foreground text-lg mb-4"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Opening Hours
                </h2>
                <div className="space-y-2">
                  {[
                    ["Monday – Friday", "6:00 AM – 10:00 PM"],
                    ["Saturday", "6:00 AM – 11:00 PM"],
                    ["Sunday", "7:00 AM – 10:00 PM"],
                  ].map(([day, hours]) => (
                    <div key={day} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{day}</span>
                      <span className="font-medium text-foreground font-mono">
                        {hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Quick stats */}
              <div className="bg-card rounded-2xl border border-border p-5">
                <h3 className="font-bold text-foreground mb-4 text-sm font-mono uppercase tracking-wide">
                  Performance
                </h3>
                <div className="space-y-3">
                  {[
                    { l: "Views this month", v: "12,483" },
                    { l: "Bookmarks", v: "3,241" },
                    { l: "Likes", v: "8,764" },
                    { l: "Popularity Score", v: "98 / 100" },
                  ].map(({ l, v }) => (
                    <div key={l} className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">{l}</span>
                      <span className="font-bold text-foreground text-sm font-mono">
                        {v}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Contact */}
              <div className="bg-card rounded-2xl border border-border p-5">
                <h3 className="font-bold text-foreground mb-4 text-sm font-mono uppercase tracking-wide">
                  Contact
                </h3>
                <div className="space-y-3">
                  {[
                    { icon: Phone, text: "+250 788 123 456" },
                    { icon: Mail, text: "info@example.rw" },
                    { icon: Globe, text: "www.example.rw" },
                  ].map(({ icon: Icon, text }) => (
                    <div
                      key={text}
                      className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    >
                      <Icon className="w-4 h-4 text-primary shrink-0" /> {text}
                    </div>
                  ))}
                </div>
              </div>
              {/* Nearby */}
              <div className="bg-card rounded-2xl border border-border p-5">
                <h3 className="font-bold text-foreground mb-4 text-sm font-mono uppercase tracking-wide">
                  Nearby
                </h3>
                <div className="space-y-3">
                  {attractions.data.slice(1, 4).map((a) => (
                    <div key={a.id} className="flex items-center gap-3">
                      <img
                        src={a.image}
                        alt={a.name}
                        className="w-12 h-10 rounded-lg object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-foreground truncate">
                          {a.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {a.location}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h2
                  className="font-bold text-foreground text-lg"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Guest Reviews
                </h2>
                <button className="flex items-center gap-1.5 bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors">
                  <Plus className="w-4 h-4" /> Write Review
                </button>
              </div>
              {reviews.map((r) => (
                <div
                  key={r.id}
                  className="bg-card rounded-2xl border border-border p-5"
                >
                  <div className="flex items-start gap-4 mb-3">
                    <img
                      src={r.avatar}
                      alt={r.name}
                      className="w-10 h-10 rounded-full object-cover shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-foreground text-sm">
                          {r.name}
                        </span>
                        <span className="text-xs text-muted-foreground font-mono">
                          {r.date}
                        </span>
                      </div>
                      <StarRating rating={r.rating} />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {r.text}
                  </p>
                </div>
              ))}
            </div>
            <div>
              <div className="bg-card rounded-2xl border border-border p-5 sticky top-24">
                <div className="text-center mb-5">
                  <div className="text-5xl font-bold text-foreground font-mono">
                    {place.rating}
                  </div>
                  <StarRating rating={place.rating} size="md" />
                  <div className="text-xs text-muted-foreground mt-1">
                    {place.reviews.toLocaleString()} reviews
                  </div>
                </div>
                <div className="space-y-3">
                  {ratingBreakdown.map(({ label, value }) => (
                    <div key={label}>
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>{label}</span>
                        <span className="font-mono font-bold text-foreground">
                          {value}
                        </span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${(value / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {(activeTab === "photos" || activeTab === "map") && (
          <div className="bg-card rounded-2xl border border-border p-6 text-center py-16">
            {activeTab === "photos" && (
              <>
                <Camera className="w-10 h-10 text-primary mx-auto mb-3" />
                <h3 className="font-bold text-foreground mb-2">
                  Photo Gallery
                </h3>
                <div className="grid grid-cols-3 gap-2 mt-4 max-w-lg mx-auto">
                  {[
                    place.image,
                    ...attractions.data.slice(0, 5).map((a) => a.image),
                  ].map((img, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-lg overflow-hidden bg-muted"
                    >
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
            {activeTab === "map" && (
              <>
                <Navigation className="w-10 h-10 text-primary mx-auto mb-3" />
                <h3 className="font-bold text-foreground mb-2">Location Map</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {place.location}
                </p>
                <div className="relative rounded-xl overflow-hidden h-64 bg-emerald-100 mx-auto max-w-lg">
                  <img
                    src="https://images.unsplash.com/photo-1516026672322-0f1b25a7b0b3?w=600&h=300&fit=crop&auto=format"
                    alt="Map"
                    className="w-full h-full object-cover opacity-70"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
                      <MapPin className="w-5 h-5" />
                    </div>
                  </div>
                </div>
                <button className="mt-4 flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-semibold mx-auto hover:bg-primary/90 transition-colors">
                  <Navigation className="w-4 h-4" /> Get Directions
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
