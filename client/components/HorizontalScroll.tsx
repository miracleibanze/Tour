import { ChevronLeft, ChevronRight } from "lucide-react";
import { PlaceCard } from "./Reusables";
import { FC, useRef } from "react";

export const HorizontalScroll: FC<{
  title: string;
  subtitle: string;
  loading: boolean;
  items: Place[];
  onSeeAll: () => void;
}> = ({ title, subtitle, loading, items, onSeeAll }) => {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: "left" | "right") => {
    if (ref.current)
      ref.current.scrollBy({
        left: dir === "left" ? -300 : 300,
        behavior: "smooth",
      });
  };
  return (
    <section className="py-12 bg-foreground">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-6 flex-wrap">
          <div className="flex-1">
            <h2
              className="text-3xl font-bold text-primary"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {title}
            </h2>
            <p className="text-accent text-sm mt-1">{subtitle}</p>
          </div>
          <div className="flex items-center justify-end flex-1 gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-9 h-9 rounded-full border border-secondary/30 bg-surface flex items-center justify-center hover:bg-secondary/40 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-primary" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-9 h-9 rounded-full border border-secondary/30 bg-surface flex items-center justify-center hover:bg-secondary/40 transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-primary" />
            </button>
            <button
              onClick={onSeeAll}
              className="flex items-center gap-1 text-primary text-sm font-semibold ml-2 hover:gap-2 transition-all"
            >
              See all <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div
          ref={ref}
          className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {loading ? (
            Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="flex-none w-72 h-80 rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 group cursor-pointer shimmer bg-linear-to-r from-secondary/30 via-secondary/10 to-secondary/30"
              />
            ))
          ) : items.length && items.length > 0 ? (
            items.map((item) => (
              <div key={item.id} className="flex-none w-72">
                <PlaceCard place={item} />
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
  );
};
