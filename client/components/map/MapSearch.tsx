"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { Pin } from "@/store/features/mapSlice";

interface Props {
  pins: Pin[];
  onResult: (pin: Pin) => void;
}

export default function MapSearch({ pins, onResult }: Props) {
  const [query, setQuery] = useState("");

  function search(value: string) {
    setQuery(value);

    if (!value) {
      return;
    }

    const result = pins.find((pin) =>
      pin.name.toLowerCase().includes(value.toLowerCase()),
    );

    if (result) {
      onResult(result);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow p-3 flex items-center gap-2">
      <Search size={18} />

      <input
        value={query}
        onChange={(e) => search(e.target.value)}
        placeholder="Search places..."
        className="outline-none flex-1"
      />
    </div>
  );
}
