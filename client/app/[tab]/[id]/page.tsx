"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { EntitySkeleton } from "@/components/Skeletons";
import EntityDetails from "@/components/EntityDetails";

export default function Hotel() {
  const { tab, id } = useParams<{ tab: string; id: string }>();

  const [loading, setLoading] = useState(true);
  const [place, setPlace] = useState<DetailedPlace | undefined>(undefined);

  const fetchPlace = async (id: string) => {
    const res = await fetch(`/api/${tab}/${id}`);

    if (!res.ok) {
      throw new Error("Failed to fetch hotel");
    }

    return res.json();
  };

  useEffect(() => {
    setLoading(true);
    if (!id) return;

    fetchPlace(id)
      .then(setPlace)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading || !place) return <EntitySkeleton />;

  return <EntityDetails place={place} />;
}
