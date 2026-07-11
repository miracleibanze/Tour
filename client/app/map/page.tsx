"use client";

import dynamic from "next/dynamic";
import Loading from "../loading";

// Disable SSR for the map component
const MapComponent = dynamic(
  () => import("@/components/map/MapComponent").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 flex items-center justify-center">sdkj</div>
    ),
  },
);

export default function Page() {
  return (
    <main className="h-[calc(100vh-3.5rem)] w-full">
      <MapComponent />
    </main>
  );
}
