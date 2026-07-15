"use client";

import { StarRating } from "@/components/Reusables";
import { fetchEvents } from "@/store/features/eventsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Calendar, ChevronsLeft, ChevronsRight, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTopLoader } from "nextjs-toploader";
import { useEffect, useMemo, useState } from "react";

export default function EventsPage() {
  const { data, loading, pagination } = useAppSelector((state) => state.events);
  const router = useRouter();
  const loader = useTopLoader();
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchEvents({}));
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
            Events & Festivals
          </h1>
          <p className="text-white/80">
            Cultural celebrations, sports, music, and arts across Rwanda
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {loading ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="flex-none w-72 h-80 rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 group cursor-pointer shimmer bg-linear-to-r from-secondary/30 via-secondary/10 to-secondary/30"
              />
            ))
          ) : data.length > 0 ? (
            data.map((event) => (
              <div
                key={event.id}
                className="bg-canva rounded-2xl overflow-hidden border border-secondary/30 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer group"
                onClick={() => {
                  loader.start();
                  router.push(`/events/${event.id}`);
                }}
              >
                <div className="relative h-44 bg-secondary/20 overflow-hidden">
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
                  <div className="absolute bottom-3 left-3 text-white text-xs font-medium flex items-center gap-1">
                    <Calendar className="w-3 h-3" />{" "}
                    {event.date
                      ? new Date(event.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : ""}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-primary text-sm mb-2 line-clamp-2">
                    {event.name}
                  </h3>
                  <div className="flex items-center gap-1 text-accent mb-3">
                    <MapPin className="w-3 h-3 text-primary" />
                    <span className="text-xs">{event.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <StarRating rating={event.rating} />
                      <span className="text-xs text-accent">
                        ({event.reviews.toLocaleString()})
                      </span>
                    </div>
                    <span className="text-sm font-bold text-primary">
                      {event.price}
                    </span>
                  </div>
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
