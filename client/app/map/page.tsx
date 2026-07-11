"use client";

import dynamic from "next/dynamic";
import Loading from "../loading";

// Disable SSR for the map component
const MapComponent = dynamic(
  () => import("@/components/map/MapComponent").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <Loading />,
  },
);

export default function Page() {
  return (
    <main className="h-[calc(100vh-3.5rem)] w-full">
      <MapComponent />
    </main>
  );
}
