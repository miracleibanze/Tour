"use client";

import { useMap } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import { useEffect, useRef } from "react";
import L from "leaflet";

interface MapFocusProps {
  position: LatLngExpression | null;
}

export function MapFocus({ position }: MapFocusProps) {
  const map = useMap();

  useEffect(() => {
    if (!position) return;

    map.flyTo(position, 16, {
      duration: 1.2,
    });
  }, [position, map]);

  return null;
}

interface UserLocationProps {
  onLocationFound?: (location: { lat: number; lng: number }) => void;
  onLocationDenied?: () => void;
}

export function UserLocation({
  onLocationFound,
  onLocationDenied,
}: UserLocationProps) {
  const map = useMap();

  const markerRef = useRef<L.Marker | null>(null);
  const circleRef = useRef<L.Circle | null>(null);
  const hasZoomedRef = useRef(false);

  const onLocationFoundRef = useRef(onLocationFound);
  const onLocationDeniedRef = useRef(onLocationDenied);

  useEffect(() => {
    onLocationFoundRef.current = onLocationFound;
    onLocationDeniedRef.current = onLocationDenied;
  }, [onLocationFound, onLocationDenied]);

  useEffect(() => {
    if (!navigator.geolocation) {
      onLocationDeniedRef.current?.();
      return;
    }

    const userIcon = L.divIcon({
      className: "",
      html: `
        <div style="
          width:25px;
          height:25px;
          background:#2563eb;
          border:3px solid white;
          border-radius:50%;
          box-shadow:0 0 12px rgba(0,0,0,0.4);
        "></div>
      `,
      iconSize: [18, 18],
      iconAnchor: [9, 9],
    });

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude: lat, longitude: lng, accuracy } = position.coords;

        onLocationFoundRef.current?.({
          lat,
          lng,
        });

        if (!markerRef.current) {
          markerRef.current = L.marker([lat, lng], {
            icon: userIcon,
          }).addTo(map);

          circleRef.current = L.circle([lat, lng], {
            radius: accuracy,
            color: "#2563eb",
            fillOpacity: 0.1,
          }).addTo(map);
        } else {
          markerRef.current.setLatLng([lat, lng]);

          circleRef.current?.setLatLng([lat, lng]);
          circleRef.current?.setRadius(accuracy);
        }

        if (!hasZoomedRef.current) {
          map.flyTo([lat, lng], 15, {
            duration: 1.5,
          });

          hasZoomedRef.current = true;
        }
      },

      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          onLocationDeniedRef.current?.();
        }

        console.error("Location error:", error.message);
      },

      {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 10000,
      },
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);

      markerRef.current?.remove();
      circleRef.current?.remove();

      markerRef.current = null;
      circleRef.current = null;
    };
  }, [map]);

  return null;
}
