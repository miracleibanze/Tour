"use client";

import {
  Bookmark,
  ChevronRight,
  Heart,
  MapPin,
  Star,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

export function StarRating({
  rating,
  size = "sm",
}: {
  rating: number;
  size?: "sm" | "md";
}) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${size === "sm" ? "w-3 h-3" : "w-4 h-4"} ${i <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
        />
      ))}
    </div>
  );
}

export function Tag({
  label,
  color = "green",
}: {
  label: string;
  color?: "green" | "blue" | "yellow" | "gray";
}) {
  const styles = {
    green: "bg-green-50 text-green-700 border border-green-200",
    blue: "bg-blue-50 text-blue-700 border border-blue-200",
    yellow: "bg-amber-50 text-amber-700 border border-amber-200",
    gray: "bg-gray-50 text-gray-600 border border-gray-200",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium font-mono ${styles[color]}`}
    >
      {label}
    </span>
  );
}

export function PlaceCard({ place }: { place: Place }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  return (
    <div className="bg-surface/20 rounded-2xl overflow-hidden shadow-sm border border-secondary/40 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 group cursor-pointer">
      <div className="relative overflow-hidden h-48 bg-secondary/20">
        <img
          src={place.image}
          alt={place.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors ${liked ? "bg-red-500 text-white" : "bg-white/80 text-gray-700 hover:bg-white"}`}
            onClick={(e) => {
              e.stopPropagation();
              setLiked(!liked);
            }}
          >
            <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
          </button>
          <button
            className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors ${saved ? "bg-primary text-white" : "bg-white/80 text-gray-700 hover:bg-white"}`}
            onClick={(e) => {
              e.stopPropagation();
              setSaved(!saved);
            }}
          >
            <Bookmark className={`w-4 h-4 ${saved ? "fill-current" : ""}`} />
          </button>
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-800 px-2 py-1 rounded-full font-mono">
            {place.category}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-primary text-sm leading-snug mb-1 line-clamp-1">
          {place.name}
        </h3>
        <div className="flex items-center gap-1 text-accent mb-2">
          <MapPin className="w-3 h-3 text-primary shrink-0" />
          <span className="text-xs truncate">{place.location}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <StarRating rating={place.rating} />
            <span className="text-xs font-semibold text-primary">
              {place.rating}
            </span>
            <span className="text-xs text-accent">
              ({place.reviews.toLocaleString()})
            </span>
          </div>
          <span className="text-sm font-bold text-primary">{place.price}</span>
        </div>
        {place.tags && place.tags.length > 0 && (
          <div className="flex gap-1 mt-3 flex-wrap">
            {place.tags.slice(0, 2).map((tag) => (
              <Tag key={tag} label={tag} color="gray" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function SectionHeader({
  title,
  subtitle,
  onSeeAll,
}: {
  title: string;
  subtitle?: string;
  onSeeAll?: () => void;
}) {
  return (
    <div className="flex items-end justify-between mb-6">
      <div>
        <h2
          className="text-3xl font-bold text-primary"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {title}
        </h2>
        {subtitle && <p className="text-accent text-sm mt-1">{subtitle}</p>}
      </div>
      {onSeeAll && (
        <button
          onClick={onSeeAll}
          className="flex items-center gap-1 text-primary text-sm font-semibold hover:gap-2 transition-all"
        >
          See all <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export function StatCard({
  value,
  label,
  icon: Icon,
  trend,
  color = "green",
}: {
  value: string;
  label: string;
  icon: React.ElementType;
  trend?: string;
  color?: "green" | "blue" | "yellow";
}) {
  const colors = {
    green: "bg-green-50 text-primary border-green-100",
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    yellow: "bg-amber-50 text-amber-600 border-amber-100",
  };
  return (
    <div className="bg-surface rounded-2xl p-5 border border-secondary/30 shadow-sm">
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 border ${colors[color]}`}
      >
        <Icon className="w-5 h-5" />
      </div>
      <div className="text-2xl font-bold text-primary font-mono mb-1">
        {value}
      </div>
      <div className="text-sm text-accent">{label}</div>
      {trend && (
        <div className="flex items-center gap-1 mt-2">
          <TrendingUp className="w-3 h-3 text-green-600" />
          <span className="text-xs text-green-600 font-medium">{trend}</span>
        </div>
      )}
    </div>
  );
}
