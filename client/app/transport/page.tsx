"use client";

import { StarRating, Tag } from "@/components/Reusables";
import { fetchEvents } from "@/store/features/eventsSlice";
import { fetchTransport } from "@/store/features/transportsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  Bus,
  Calendar,
  Car,
  ChevronsLeft,
  ChevronsRight,
  Compass,
  MapPin,
  Waves,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useTopLoader } from "nextjs-toploader";
import { useEffect, useMemo, useState } from "react";

export default function TransportPage() {
  const { data, loading, pagination } = useAppSelector(
    (state) => state.transports,
  );
  const router = useRouter();
  const loader = useTopLoader();
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchTransport({}));
  }, [dispatch]);

  const canGoPrevious = pagination?.hasPrevious;
  const canGoNext = pagination?.hasNext;
  const hasPages = canGoNext || canGoPrevious;

  const goPrev = () => {
    if (canGoPrevious) setPage((p) => p - 1);
  };

  const goNext = () => {
    if (canGoNext) setPage((p) => p + 1);
  };

  return (
    <div className="min-h-screen bg-foreground pt-20 pb-24">
      <div className="bg-primary text-white py-12 mb-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1
            className="text-4xl font-bold text-white mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Transport Services
          </h1>
          <p className="text-white/80">
            Taxis, buses, car rentals, shuttles, and tour transport across
            Rwanda
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {[
            { icon: Car, label: "Car Rental" },
            { icon: Bus, label: "Bus" },
            { icon: Car, label: "Taxi" },
            { icon: Zap, label: "E-bike" },
            { icon: Waves, label: "Boat" },
            { icon: Compass, label: "Tour" },
          ].map(({ icon: Icon, label }) => (
            <button
              key={label}
              className="bg-canva border border-secondary/30 rounded-2xl p-4 text-center hover:border-primary hover:bg-primary/5 transition-all group"
            >
              <Icon className="w-6 h-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-primary">
                {label}
              </span>
            </button>
          ))}
        </div>
        <div className="space-y-4">
          {loading ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-linear-to-r from-secondary/30 via-secondary/10 to-secondary/30 shimmer h-32 my-2 w-full"
              />
            ))
          ) : data.length > 0 ? (
            data.map((t) => (
              <div
                key={t.id}
                className="bg-canva rounded-2xl border border-secondary/30 flex flex-col md:flex-row gap-4 p-5 hover:shadow-md transition-shadow"
                onClick={() => {
                  loader.start();
                  router.push(`/transport/${t.id}`);
                }}
              >
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-full md:w-48 h-36 md:h-28 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-primary">{t.name}</h3>
                    <span className="text-primary font-bold shrink-0">
                      {t.price}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-2 text-accent">
                    <MapPin className="w-3 h-3 text-primary" />
                    <span className="text-xs">{t.location}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <StarRating rating={t.rating} />
                    <span className="text-xs text-accent">
                      ({t.reviews} reviews)
                    </span>
                  </div>
                  <div className="flex gap-1 flex-wrap">
                    {t.tags &&
                      t.tags.map((tag) => (
                        <Tag key={tag} label={tag} color="blue" />
                      ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <button className="bg-links text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors">
                    Book Now
                  </button>
                  <button className="border border-secondary/30 text-primary px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-accent/20 hover:border-links transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-80 w-full sm:col-span-2 lg:col-span-3 xl:col-span-4">
              <span className="font-bold text-secondary/70">
                Didn't find what you are looking for, Try again later
              </span>
            </div>
          )}
        </div>
      </div>
      {!loading && pagination?.totalPages && pagination.totalPages > 1 && (
        <div className="flex justify-center w-full pt-8">
          <div className="flex items-center gap-3">
            <button
              onClick={goPrev}
              disabled={!canGoPrevious}
              className={`p-2 rounded-full border transition
          border-accent text-accent hover:bg-accent hover:text-canva
          ${!canGoPrevious ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <ChevronsLeft />
            </button>

            <div className="flex gap-2">
              {Array.from({ length: pagination?.totalPages ?? 1 }).map(
                (_, idx) => {
                  const current = idx + 1;

                  return (
                    <button
                      key={current}
                      onClick={() => setPage(current)}
                      className={`w-9 h-9 rounded-md border transition
                ${
                  current === page
                    ? "bg-accent text-canva border-accent"
                    : "border-secondary/30 hover:border-accent hover:bg-secondary/10"
                }`}
                    >
                      {current}
                    </button>
                  );
                },
              )}
            </div>

            <button
              onClick={goNext}
              disabled={!canGoNext}
              className={`p-2 rounded-full border transition
          border-accent text-accent hover:bg-accent hover:text-canva
          ${!canGoNext ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <ChevronsRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
