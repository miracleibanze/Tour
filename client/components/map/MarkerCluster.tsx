"use client";

import { Marker } from "react-leaflet";
import { Pin } from "@/store/features/mapSlice";
import { createCustomIcon, createThumbnailIcon } from "./SelectedPlace";
import MarkerClusterGroup from "react-leaflet-cluster";

interface Props {
  pins: Pin[];
  selectedPinId: string | null;
  onSelect: (id: string) => void;
}

export default function MarkerCluster({
  pins,
  selectedPinId,
  onSelect,
}: Props) {
  return (
    <MarkerClusterGroup
      chunkedLoading
      spiderfyOnMaxZoom
      showCoverageOnHover={false}
    >
      {pins.map((pin) => (
        <Marker
          key={pin.id}
          position={[pin.lat, pin.lng]}
          icon={
            selectedPinId === pin.id
              ? createThumbnailIcon(pin.image)
              : createCustomIcon(pin.type)
          }
          eventHandlers={{
            click: () => onSelect(pin.id),
          }}
        />
      ))}
    </MarkerClusterGroup>
  );
}
