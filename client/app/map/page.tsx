"use client";

import dynamic from "next/dynamic";

// Disable SSR for the map component
const MapComponent = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center">
      Loading Map...
    </div>
  ),
});

export default function Page() {
  return (
    <main className="h-[calc(100vh-3.5rem)] w-full">
      <MapComponent />
    </main>
  );
}
