import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  hotels,
  restaurants,
  cafes,
  attractions,
  events,
  transport,
  destinations,
} from "@/lib/schema";
import { ilike, or } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q")?.trim();

    const condition = q
      ? (table: any) => ilike(table.name, `%${q}%`)
      : undefined;

    const [
      hotelResults,
      restaurantResults,
      cafeResults,
      attractionResults,
      eventResults,
      transportResults,
      destinationResults,
    ] = await Promise.all([
      db
        .select()
        .from(hotels)
        .where(condition ? condition(hotels) : undefined)
        .limit(12),
      db
        .select()
        .from(restaurants)
        .where(condition ? condition(restaurants) : undefined)
        .limit(12),
      db
        .select()
        .from(cafes)
        .where(condition ? condition(cafes) : undefined)
        .limit(12),
      db
        .select()
        .from(attractions)
        .where(condition ? condition(attractions) : undefined)
        .limit(12),
      db
        .select()
        .from(events)
        .where(condition ? condition(events) : undefined)
        .limit(12),
      db
        .select()
        .from(transport)
        .where(condition ? condition(transport) : undefined)
        .limit(12),
      db
        .select()
        .from(destinations)
        .where(condition ? condition(destinations) : undefined)
        .limit(12),
    ]);

    return NextResponse.json({
      hotels: hotelResults,
      restaurants: restaurantResults,
      cafes: cafeResults,
      attractions: attractionResults,
      events: eventResults,
      transport: transportResults,
      destinations: destinationResults,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch all results" },
      { status: 500 },
    );
  }
}
