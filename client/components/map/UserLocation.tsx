"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

export default function UserLocation() {
  const map = useMap();

  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        const userIcon = L.divIcon({
          className: "",
          html: `
            <div style="
              width:25px;
              height:25px;
              background:#2563eb;
              border:5px solid white;
              border-radius:50%;
              box-shadow:0 0 20px rgba(0,0,0,.5);
            ">
            </div>
          `,
        });

        L.marker([latitude, longitude], {
          icon: userIcon,
        })
          .addTo(map)
          .bindPopup("You are here")
          .openPopup();

        map.flyTo([latitude, longitude], 15, {
          duration: 1.5,
        });
      },

      (error) => {
        console.log(error.message);
      },
    );
  }, [map]);

  return null;
}
