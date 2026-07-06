import { NextResponse } from "next/server";
import { and, isNotNull, sql } from "drizzle-orm";
import {
  attractions,
  cafes,
  destinations,
  events,
  hotels,
  restaurants,
  transport,
} from "@/lib/schema";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const [
      hotelsData,
      restaurantsData,
      cafesData,
      attractionsData,
      EventsData,
      transportData,
      destinationsData,
    ] = await Promise.all([
      db
        .select({
          id: hotels.id,
          name: hotels.name,
          lat: hotels.latitude,
          lng: hotels.longitude,
          type: sql`'hotel'`,
        })
        .from(hotels)
        .where(and(isNotNull(hotels.latitude), isNotNull(hotels.longitude))),
      db
        .select({
          id: restaurants.id,
          name: restaurants.name,
          lat: restaurants.latitude,
          lng: restaurants.longitude,
          type: sql`'restaurant'`,
        })
        .from(restaurants)
        .where(
          and(
            isNotNull(restaurants.latitude),
            isNotNull(restaurants.longitude),
          ),
        ),
      db
        .select({
          id: cafes.id,
          name: cafes.name,
          lat: cafes.latitude,
          lng: cafes.longitude,
          type: sql`'cafe'`,
        })
        .from(cafes)
        .where(and(isNotNull(cafes.latitude), isNotNull(cafes.longitude))),
      db
        .select({
          id: attractions.id,
          name: attractions.name,
          lat: attractions.latitude,
          lng: attractions.longitude,
          type: sql`'cafe'`,
        })
        .from(attractions)
        .where(
          and(
            isNotNull(attractions.latitude),
            isNotNull(attractions.longitude),
          ),
        ),
      db
        .select({
          id: events.id,
          name: events.name,
          lat: events.latitude,
          lng: events.longitude,
          type: sql`'cafe'`,
        })
        .from(events)
        .where(and(isNotNull(events.latitude), isNotNull(events.longitude))),
      db
        .select({
          id: transport.id,
          name: transport.name,
          lat: transport.latitude,
          lng: transport.longitude,
          type: sql`'cafe'`,
        })
        .from(transport)
        .where(
          and(isNotNull(transport.latitude), isNotNull(transport.longitude)),
        ),
      db
        .select({
          id: destinations.id,
          name: destinations.name,
          lat: destinations.latitude,
          lng: destinations.longitude,
          type: sql`'cafe'`,
        })
        .from(destinations)
        .where(
          and(
            isNotNull(destinations.latitude),
            isNotNull(destinations.longitude),
          ),
        ),
    ]);

    return NextResponse.json([
      ...hotelsData,
      ...restaurantsData,
      ...cafesData,
      ...attractionsData,
      ...EventsData,
      ...transportData,
      ...destinationsData,
    ]);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch pins" },
      { status: 500 },
    );
  }
}
