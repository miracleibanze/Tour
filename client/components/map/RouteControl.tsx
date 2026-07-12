"use client";

import { useEffect, useRef } from "react";
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
  const routingControl = useRef<any>(null);

  useEffect(() => {
    if (!from || !to) return;

    async function createRoute() {
      await import("leaflet-routing-machine");

      if (routingControl.current) {
        map.removeControl(routingControl.current);
        routingControl.current = null;
      }

      routingControl.current = (L as any).Routing.control({
        waypoints: [L.latLng(from.lat, from.lng), L.latLng(to.lat, to.lng)],

        routeWhileDragging: false,
        addWaypoints: false,
        draggableWaypoints: false,
        show: false,

        lineOptions: {
          styles: [
            {
              color: "#0030ea",
              weight: 5,
              opacity: 1,
            },
            {
              color: "#8888ff",
              weight: 5,
              opacity: 1,
              dashArray: "1,20",
            },
          ],
        },
      }).addTo(map);
    }

    createRoute();

    return () => {
      if (routingControl.current) {
        map.removeControl(routingControl.current);
        routingControl.current = null;
      }
    };
  }, [from.lat, from.lng, to.lat, to.lng, map]);

  return null;
}
