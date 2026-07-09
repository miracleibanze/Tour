import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  hotels,
  restaurants,
  cafes,
  attractions,
  events,
  transport,
} from "@/lib/schema";
import { eq } from "drizzle-orm";

const tables = {
  hotels,
  restaurants,
  cafes,
  attractions,
  events,
  transport,
} as const;

type TableName = keyof typeof tables;

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      tab: TableName;
      id: string;
    }>;
  },
) {
  const { tab, id } = await params;

  const table = tables[tab];

  if (!table) {
    return NextResponse.json({ error: "Invalid table" }, { status: 400 });
  }

  const [place] = await db
    .select({
      id: table.id,
      name: table.name,
      image: table.image,
      location: table.location,
      description: table.description,
      rating: table.rating,
      reviews: table.reviews,
      price: table.price,
      category: table.category,
      tags: table.tags,
      contact: table.contact,
      featured: table.featured,
      workingHours: table.workingHours,
    })
    .from(table)
    .where(eq(table.id, id));
  console.log("fetched successfully");
  console.log(place);
  if (!place) {
    return NextResponse.json({ error: "Place not found" }, { status: 404 });
  }

  return NextResponse.json(place);
}
