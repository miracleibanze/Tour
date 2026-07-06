"use client";

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
import { StarRating, Tag } from "@/components/Reusables";
import { useRouter, useSearchParams } from "next/navigation";
import React, { FC, useEffect, useState } from "react";

const EntityDetails: FC<{ place: DetailedPlace }> = ({ place }) => {
  const searchParams = useSearchParams();

  const e = searchParams.has("e");
  const t = searchParams.has("t");
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("overview");
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const tabs = ["overview", "photos", "reviews", "map"];
  const [nearbyAttractions, setNearbyAttractions] = useState<NearByPlaces>([]);

  useEffect(() => {
    const fetchAttractions = async () => {
      try {
        const res = await fetch(
          `/api/attractions/nearby?q=${encodeURIComponent(place?.location ?? "kigali")}`,
        );

        if (!res.ok) {
          throw new Error("Failed to fetch attractions");
        }

        const data: NearByPlaces = await res.json();

        setNearbyAttractions(data);
      } catch (error) {
        console.error(error);
        setNearbyAttractions([]);
      }
    };

    fetchAttractions();
  }, [place?.location]);

  return (
    <div className="min-h-screen bg-foreground pb-24">
      {/* Hero gallery */}
      <div className="relative h-80 md:h-96 bg-secondary/50 overflow-hidden max-w-7xl mx-auto rounded-b-4xl">
        <img
          src={place.image}
          alt={place.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/30" />
        <button
          onClick={() => router.back()}
          className="absolute top-0 left-4 lg:left-12 mt-6 flex items-center gap-2 bg-white/90 backdrop-blur-sm text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-white transition-colors shadow-sm"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <div className="absolute top-0 right-4 lg:right-12 mt-6 flex gap-2">
          <button
            onClick={() => setLiked(!liked)}
            className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm shadow transition-colors ${liked ? "bg-red-500 text-white" : "bg-white/90 text-primary"}`}
          >
            <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
          </button>
          <button
            onClick={() => setSaved(!saved)}
            className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm shadow transition-colors ${saved ? "bg-primary text-white" : "bg-white/90 text-primary"}`}
          >
            <Bookmark className={`w-5 h-5 ${saved ? "fill-current" : ""}`} />
          </button>
          <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-primary shadow hover:bg-white transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
        <div className="absolute bottom-16  right-4 lg:right-12">
          <button
            onClick={() => setActiveTab("photos")}
            className="flex items-center gap-2 bg-white/90 backdrop-blur-sm text-primary px-4 py-2 rounded-full text-sm font-medium shadow hover:bg-white transition-colors"
          >
            <Camera className="w-4 h-4" /> View all photos
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-12 relative z-10">
        {/* Header card */}
        <div className="bg-canva rounded-2xl border border-secondary/20 shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-primary/10 text-primary text-xs font-bold font-mono px-4 py-1 rounded-full">
                  {place.category}
                </span>
                {place.featured && (
                  <span className="bg-accent text-foreground text-xs font-bold font-mono px-4 py-1 rounded-full flex items-center gap-1">
                    <Award className="w-3 h-3" /> Featured
                  </span>
                )}
              </div>
              <h1
                className="text-2xl md:text-3xl font-bold text-primary mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {place.name}
              </h1>
              <div className="flex items-center gap-2 text-acce/80 mb-3">
                <MapPin className="w-4 h-4 text-accent" />
                <span className="text-sm">{place.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <StarRating rating={place.rating} size="md" />
                  <span className="font-bold text-primary">{place.rating}</span>
                </div>
                <span className="text-secondary text-sm">
                  ({place.reviews.toLocaleString()} reviews)
                </span>
                <span className="text-secondary text-sm font-mono">·</span>
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
                <div className="text-2xl font-bold text-accent font-mono">
                  {place.price}
                </div>
                <div className="text-xs text-secondary text-right mt-0.5">
                  per person / per night
                </div>
              </div>
              <button className="bg-accent text-white px-8 py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-md w-full md:w-auto">
                Book Now
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div
          className="flex gap-0 border-b border-secondary/20 mb-6 overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: "none" }}
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-sm font-semibold capitalize border-b-2 transition-colors whitespace-nowrap ${activeTab === tab ? "border-primary text-primary" : "border-transparent text-secondary hover:text-primary"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <div className="bg-canva rounded-2xl border border-secondary/20 p-6">
                <h2
                  className="font-bold text-primary text-lg mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  About
                </h2>
                <p className="text-secondary text-sm leading-relaxed">
                  {place.description ||
                    `${place.name} is one of Rwanda's most celebrated destinations, offering an unforgettable experience that blends natural beauty, cultural depth, and world-class hospitality. Visitors consistently rate it among the top experiences in East Africa.`}
                </p>
              </div>
              {/* Amenities */}
              <div className="bg-canva rounded-2xl border border-secondary/20 p-6">
                <h2
                  className="font-bold text-primary text-lg mb-4"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Amenities & Services
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {(place.tags ? place?.tags : []).map((amenity) => (
                    <div
                      key={amenity + " "}
                      className="flex items-center gap-2 text-sm text-primary"
                    >
                      <CheckCircle className="w-4 h-4 text-primary shrink-0" />{" "}
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
              {/* Opening hours */}
              <div className="bg-canva rounded-2xl border border-secondary/20 p-6">
                <h2
                  className="font-bold text-primary text-lg mb-4"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Opening Hours
                </h2>
                <div className="space-y-2">
                  {place.workingHours && place.workingHours ? (
                    place.workingHours.map((time) => (
                      <div
                        key={time.day}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-secondary">{time.day}</span>
                        <span className="font-medium text-primary font-mono">
                          {time.hours}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="py-6 px-4 text-center text-secondary">
                      There is not working time specified
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Quick stats */}
              <div className="bg-canva rounded-2xl border border-secondary/20 p-5">
                <h3 className="font-bold text-primary mb-4 text-sm font-mono uppercase tracking-wide">
                  Performance
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      l: "Views this month",
                      v: place.performance?.views ?? "N/A",
                    },
                    {
                      l: "Bookmarks",
                      v: place.performance?.bookmarks ?? "N/A",
                    },
                    { l: "Likes", v: place.performance?.likes ?? "N/A" },
                    {
                      l: "Popularity Score",
                      v: place.performance?.popularity ?? "N/A",
                    },
                  ].map(({ l, v }) => (
                    <div key={l} className="flex justify-between items-center">
                      <span className="text-xs text-secondary">{l}</span>
                      <span className="font-bold text-primary text-sm font-mono">
                        {v}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Contact */}
              <div className="bg-canva rounded-2xl border border-secondary/20 p-5">
                <h3 className="font-bold text-primary mb-4 text-sm font-mono uppercase tracking-wide">
                  Contact
                </h3>
                <div className="space-y-3">
                  {[
                    { icon: Phone, text: place.contact?.phone ?? "N/A phone" },
                    { icon: Mail, text: place.contact?.email ?? "N/A email" },
                    {
                      icon: Globe,
                      text: place.contact?.website ?? "N/A website",
                    },
                  ].map(({ icon: Icon, text }) => (
                    <div
                      key={text + ". "}
                      className="flex items-center gap-3 text-sm text-secondary hover:text-primary transition-colors cursor-pointer"
                    >
                      <Icon className="w-4 h-4 text-primary shrink-0" /> {text}
                    </div>
                  ))}
                </div>
              </div>
              {/* Nearby */}
              <div className="bg-canva rounded-2xl border border-secondary/20 p-5">
                <h3 className="font-bold text-primary mb-4 text-sm font-mono uppercase tracking-wide">
                  Nearby
                </h3>
                <div className="space-y-3">
                  {nearbyAttractions.length > 0 ? (
                    nearbyAttractions.map((a) => (
                      <div
                        key={a.id}
                        onClick={() => router.push(`/attractions/${a.id}`)}
                        className="flex items-center gap-3 group cursor-pointer hover:bg-secondary/10 rounded-md"
                      >
                        <img
                          src={a.image}
                          className="w-12 h-10 rounded-lg object-cover shrink-0 bg-secondary"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold text-primary truncate group-hover:underline">
                            {a.name}
                          </div>
                          <div className="text-xs text-secondary">
                            {a.location}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="py-6 px-4 text-center text-secondary">
                      No nearby places detected
                    </p>
                  )}
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
                  className="font-bold text-primary text-lg"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Guest Reviews
                </h2>
                <button className="flex items-center gap-1.5 bg-accent text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors">
                  <Plus className="w-4 h-4" /> Write Review
                </button>
              </div>
              {place.writtenReviews ? (
                place.writtenReviews.map((review, idx) => (
                  <div
                    key={idx}
                    className="bg-canva rounded-2xl border border-secondary/20 p-5"
                  >
                    <div className="flex items-start gap-4 mb-3">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-10 h-10 rounded-full object-cover shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-primary text-sm">
                            {review.name}
                          </span>
                          <span className="text-xs text-secondary font-mono">
                            {review.date}
                          </span>
                        </div>
                        <StarRating rating={review.rating} />
                      </div>
                    </div>
                    <p className="text-sm text-secondary leading-relaxed">
                      {review.text}
                    </p>
                  </div>
                ))
              ) : (
                <p className="py-24 px-4 text-center text-secondary">
                  No reviews added yet
                </p>
              )}
            </div>
            <div>
              <div className="bg-canva rounded-2xl border border-secondary/20 p-5 sticky top-24">
                <div className="text-center mb-5">
                  <div className="text-5xl font-bold text-primary font-mono">
                    {place.rating}
                  </div>
                  <StarRating rating={place.rating} size="md" />
                  <div className="text-xs text-secondary mt-1">
                    {place.reviews.toLocaleString()} reviews
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    [
                      "Location",
                      place.ratingBreakDown?.Location ?? place.rating,
                    ],
                    [
                      "Cleanliness",
                      place.ratingBreakDown?.Cleanliness ?? place.rating,
                    ],
                    ["Service", place.ratingBreakDown?.Service ?? place.rating],
                    ["Value", place.ratingBreakDown?.Value ?? place.rating],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <div className="flex justify-between text-xs text-secondary mb-1">
                        <span>{label}</span>
                        <span className="font-mono font-bold text-primary">
                          {value ? Number(value).toFixed(1) : place.rating}
                        </span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${(Number(value) / 5) * 100}%` }}
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
          <div className="bg-canva rounded-2xl border border-secondary/20 p-6 text-center py-16">
            {activeTab === "photos" && (
              <>
                <Camera className="w-10 h-10 text-primary mx-auto mb-3" />
                <h3 className="font-bold text-primary mb-2">Photo Gallery</h3>
                <div className="grid grid-cols-3 gap-2 mt-4 max-w-lg mx-auto">
                  {[place.image, ...(place.imageCollection ?? [])].map(
                    (img, i) => (
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
                    ),
                  )}
                </div>
              </>
            )}
            {activeTab === "map" && (
              <>
                <Navigation className="w-10 h-10 text-primary mx-auto mb-3" />
                <h3 className="font-bold text-primary mb-2">Location Map</h3>
                <p className="text-secondary text-sm mb-4">{place.location}</p>
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
};

export default EntityDetails;
