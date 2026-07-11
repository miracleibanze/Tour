"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ChevronDown, ChevronUp, Loader, Menu, Search } from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { fetchPins } from "@/store/features/mapSlice";
import { pinColors } from "./MapFeatures";
import {
  SelectedPlace,
  createCustomIcon,
  createThumbnailIcon,
} from "./SelectedPlace";
import { MapFocus, UserLocation } from "./MapFocus";

export default function MapPage() {
  const { pins, loading } = useSelector((state: RootState) => state.map);
  const [selectedPinId, setSelectedPinId] = useState<string | null>(null);
  const [activeLayer, setActiveLayer] = useState<ExploreTab>("all");
  const [mobileOpen, setMobileOpen] = useState(true);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const dispatch = useAppDispatch();
  const [locationDenied, setLocationDenied] = useState(false);

  const layers: ExploreTab[] = [
    "all",
    "hotels",
    "restaurants",
    "cafes",
    "attractions",
    "events",
    "transport",
  ];

  // const filteredPins =
  //   activeLayer === "all" ? pins : pins.filter((p) => p.type === activeLayer);
  const filteredPins = pins
    .filter((p) => activeLayer === "all" || p.type === activeLayer)
    .sort((a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity));

  const selectedPin = filteredPins.find((pin) => pin.id === selectedPinId);

  useEffect(() => {
    if (userLocation)
      dispatch(
        fetchPins({
          lat: userLocation.lat,
          lng: userLocation.lng,
        }),
      );
  }, [dispatch, userLocation]);

  function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // Earth's radius in km

    // Convert degrees to radians
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return Math.round(R * c);
  }

  useEffect(() => {
    setMobileOpen(true);
  }, [activeLayer]);

  return (
    <div className="fixed inset-0 pt-16 pb-14 lg:pb-0 flex">
      <div className="w-80 shrink-0 bg-white border-r border-secondary/20 flex-col h-full overflow-hidden hidden md:flex z-1000">
        {!selectedPin ? (
          <>
            <div className="p-4 border-b border-secondary/20">
              <div className="flex items-center gap-2 bg-foreground rounded-xl px-3 py-2.5 mb-3">
                <Search className="w-4 h-4 text-links" />
                <input
                  placeholder="Search on map…"
                  className="flex-1 bg-transparent text-sm outline-none"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {layers.map((l: ExploreTab) => (
                  <button
                    key={l}
                    onClick={() => {
                      setActiveLayer(l);
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors capitalize ${activeLayer === l ? "bg-primary text-white" : "bg-foreground text-links hover:bg-primary/10"}`}
                  >
                    {l === "all" ? "Suggested" : l}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {loading ? (
                <p className="text-sm text-secondary/50 font-semibold py-16 text-center h-full flex items-center justify-center">
                  <Loader />
                </p>
              ) : filteredPins.length > 0 ? (
                filteredPins.map((pin) => {
                  const distance = userLocation
                    ? getDistance(
                        pin.lat,
                        pin.lng,
                        userLocation?.lat,
                        userLocation?.lng,
                      )
                    : null;
                  return (
                    <div
                      key={pin.id}
                      onClick={() => setSelectedPinId(pin.id)}
                      className={`h-14 overflow-hidden rounded-xl border cursor-pointer ${selectedPinId === pin.id ? "border-primary bg-primary text-canva" : "border-secondary/20 hover:bg-foreground"} flex items-center gap-3`}
                    >
                      <img
                        src={pin.image}
                        alt="image"
                        className="h-full aspect-square object-cover "
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{pin.name}</h4>
                        <p className="italic text-[12px] text-secondary">
                          {pin.location +
                            " " +
                            (distance ? `(${distance}km)` : "")}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-sm text-secondary/50 font-semibold py-16 text-center">
                  No place found, Try again later!
                </p>
              )}
            </div>
          </>
        ) : (
          <SelectedPlace
            pin={selectedPin}
            back={() => setSelectedPinId(null)}
          />
        )}
      </div>

      {/* Map Area */}
      <div className="flex-1 relative bg-emerald-900">
        <MapContainer
          center={[-1.94, 30.05]}
          zoom={12}
          className="h-full w-full"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {filteredPins.map((pin) => (
            <Marker
              key={pin.id}
              position={[pin.lat, pin.lng]}
              icon={
                selectedPinId === pin.id
                  ? createThumbnailIcon(pin.image)
                  : createCustomIcon(pin.type)
              }
              eventHandlers={{
                click: () => setSelectedPinId(pin.id),
              }}
            />
          ))}

          <MapFocus
            position={selectedPin ? [selectedPin.lat, selectedPin.lng] : null}
          />

          <UserLocation
            onLocationFound={(location) => {
              setUserLocation(location);
            }}
            onLocationDenied={() => {
              setLocationDenied(true);
            }}
          />
        </MapContainer>

        {/* Overlays (Legend and Labels preserved) */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl border p-3 z-500 hidden md:block">
          <p className="text-xs font-bold font-mono text-cta uppercase mb-2">
            Map Legend
          </p>
          {Object.entries(pinColors).map(([type, color]) => (
            <div key={type} className="flex items-center gap-2 mb-1">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="text-xs capitalize">{type}</span>
            </div>
          ))}
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/10 text-8xl font-bold pointer-events-none select-none">
          RWANDA
        </div>
      </div>

      {locationDenied && (
        <div className="fixed inset-0 z-2000 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 text-center">
            <h2 className="text-lg font-bold mb-2">Location Required</h2>

            <p className="text-sm text-secondary mb-6">
              TWIVICS uses your location to show nearby hotels, restaurants,
              attractions, and events around you. Please allow location access
              to use the map features.
            </p>
            <p className="text-sm text-secondary/40 mb-6">
              You're required to allow this website to access your location in{" "}
              <u>Settings</u>
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => window.history.back()}
                className="flex-1 rounded-xl border border-secondary/30 py-2 text-sm font-semibold"
              >
                Go Back
              </button>

              <button
                onClick={() => {
                  setLocationDenied(false);
                  window.location.reload();
                }}
                className="flex-1 rounded-xl bg-primary text-white py-2 text-sm font-semibold"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        className={`md:hidden absolute top-12 left-0 right-0 z-1000 border-b border-secondary/20 flex flex-col ${mobileOpen ? "bottom-12" : "max-h-max"} ${selectedPin ? "bottom-15 flex-col-reverse" : ""}`}
      >
        {!selectedPin ? (
          <>
            <div className="p-4 border-b border-secondary/20 bg-canva">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-2 bg-foreground rounded-xl px-3 py-2.5 flex-1">
                  <Search className="w-4 h-4 text-links" />

                  <input
                    placeholder="Search on map..."
                    className="
                flex-1
                bg-transparent
                text-sm
                outline-none
              "
                  />
                </div>

                <button className=" w-11 h-11 rounded-xl bg-primary text-white flex items-center justify-center">
                  <Menu className="w-5 h-5" />
                </button>
              </div>

              {/* Categories */}
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {layers.map((l) => (
                  <button
                    key={l}
                    onClick={() => setActiveLayer(l)}
                    className={` whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-semibold capitalize ${
                      activeLayer === l
                        ? "bg-primary text-white"
                        : "bg-foreground text-links"
                    }`}
                  >
                    {l === "all" ? "Suggested" : l}
                  </button>
                ))}
              </div>
            </div>

            {mobileOpen && (
              <div className=" p-4 space-y-3 overflow-y-scroll flex-1 max-h-[40vh] bg-canva">
                {!selectedPin &&
                  filteredPins.map((pin) => {
                    const distance = userLocation
                      ? getDistance(
                          pin.lat,
                          pin.lng,
                          userLocation.lat,
                          userLocation.lng,
                        )
                      : null;

                    return (
                      <div
                        key={pin.id}
                        onClick={() => setSelectedPinId(pin.id)}
                        className=" h-14 rounded-xl border border-secondary/20 flex items-center gap-3 overflow-hidden cursor-pointer hover:bg-foreground
              "
                      >
                        <img
                          src={pin.image}
                          alt={pin.name}
                          className=" h-full aspect-square object-cover"
                        />

                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm truncate">
                            {pin.name}
                          </h4>

                          <p className="text-xs text-secondary truncate">
                            {pin.location}
                            {distance && ` • ${distance} km`}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </>
        ) : (
          <div className="max-h-[50vh] overflow-y-auto mt-auto rounded-t-3xl overflow-hidden">
            <SelectedPlace
              pin={selectedPin}
              back={() => {
                setSelectedPinId(null);
                setMobileOpen(false);
              }}
              smallerScreen={true}
            />
          </div>
        )}
        <div
          className={`w-full ${mobileOpen || selectedPin ? "flex-1" : "h-0"}`}
          onClick={() => {
            setMobileOpen((v) => !v);
            setSelectedPinId(null);
          }}
        >
          {!selectedPin && (
            <div className="w-24 border border-secondary/50 border-t-0 mx-auto bg-canva flex items-center justify-center rounded-b-2xl">
              {mobileOpen ? <ChevronUp /> : <ChevronDown />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
