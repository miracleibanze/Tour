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
import { ilike, count, and } from "drizzle-orm";

const TABLES = {
  hotels,
  restaurants,
  cafes,
  attractions,
  events,
  transport,
};

const SEARCHABLE_COLUMNS = {
  hotels: hotels.name || hotels.location,
  restaurants: restaurants.name || restaurants.location,
  cafes: cafes.name || cafes.location,
  attractions: attractions.name || attractions.location,
  events: events.name || events.location,
  transport: transport.name || transport.location,
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const q = searchParams.get("q")?.trim() || "";
    const tab = searchParams.get("tab")?.trim();

    if (!q) {
      return NextResponse.json(
        { error: "Search query is required" },
        { status: 400 },
      );
    }

    if (tab && tab in TABLES) {
      const page = Math.max(1, Number(searchParams.get("page")) || 1);

      const limit = 24;
      const offset = (page - 1) * limit;

      const table = TABLES[tab as keyof typeof TABLES];
      const column = SEARCHABLE_COLUMNS[tab as keyof typeof SEARCHABLE_COLUMNS];

      const conditions = [ilike(column, `%${q}%`)];

      const data = await db
        .select()
        .from(table)
        .where(and(...conditions))
        .limit(limit)
        .offset(offset);

      const [{ total }] = await db
        .select({ total: count() })
        .from(table)
        .where(and(...conditions));

      console.log({ data: data.length });

      return NextResponse.json({
        tab,
        data,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          hasNext: page * limit < total,
          hasPrevious: page > 1,
        },
      });
    }

    const [
      hotelResults,
      restaurantResults,
      cafeResults,
      attractionResults,
      eventResults,
      transportResults,
    ] = await Promise.all([
      db
        .select()
        .from(hotels)
        .where(ilike(hotels.name, `%${q}%`))
        .limit(12),

      db
        .select()
        .from(restaurants)
        .where(ilike(restaurants.name, `%${q}%`))
        .limit(12),

      db
        .select()
        .from(cafes)
        .where(ilike(cafes.name, `%${q}%`))
        .limit(12),

      db
        .select()
        .from(attractions)
        .where(ilike(attractions.name, `%${q}%`))
        .limit(12),

      db
        .select()
        .from(events)
        .where(ilike(events.name, `%${q}%`))
        .limit(12),

      db
        .select()
        .from(transport)
        .where(ilike(transport.name, `%${q}%`))
        .limit(12),
    ]);

    console.log({
      hotels: hotelResults.length,
      restaurants: restaurantResults.length,
      cafes: cafeResults.length,
      attractions: attractionResults.length,
      events: eventResults.length,
      transport: transportResults.length,
    });
    return NextResponse.json({
      hotels: hotelResults,
      restaurants: restaurantResults,
      cafes: cafeResults,
      attractions: attractionResults,
      events: eventResults,
      transport: transportResults,
    });
  } catch {
    return NextResponse.json({ error: "Failed to search" }, { status: 500 });
  }
}
