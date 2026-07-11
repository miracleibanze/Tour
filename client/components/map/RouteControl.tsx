"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

interface Props {
  from: {
    lat: number;
    lng: number;
  };

  to: {
    lat: number;
    lng: number;
  };
}

export default function RouteControl({ from, to }: Props) {
  const map = useMap();

  useEffect(() => {
    if (!from || !to) return;

    let routingControl: any;

    async function createRoute() {
      await import("leaflet-routing-machine");

      routingControl = (L as any).Routing.control({
        waypoints: [L.latLng(from.lat, from.lng), L.latLng(to.lat, to.lng)],
        routeWhileDragging: false,
        addWaypoints: false,
        draggableWaypoints: false,
        show: false,
        lineOptions: {
          styles: [
            {
              color: "#000000",
              weight: 8,
              opacity: 0.8,
            },
            {
              color: "#8888ff",
              weight: 5,
              opacity: 1,
            },
            {
              color: "#0030ea",
              weight: 5,
              opacity: 1,
              dashArray: "1, 20",
            },
          ],
        },
      }).addTo(map);
    }

    createRoute();

    return () => {
      if (routingControl) {
        map.removeControl(routingControl);
      }
    };
  }, [from, to, map]);

  return null;
}
