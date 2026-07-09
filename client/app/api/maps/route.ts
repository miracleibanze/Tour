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
      eventsData,
      transportData,
      destinationsData,
    ] = await Promise.all([
      db
        .select({
          id: hotels.id,
          name: hotels.name,
          lat: hotels.latitude,
          lng: hotels.longitude,
          location: hotels.location,
          image: hotels.image,
          type: sql`'hotels'`,
        })
        .from(hotels)
        .where(and(isNotNull(hotels.latitude), isNotNull(hotels.longitude)))
        .limit(3),

      db
        .select({
          id: restaurants.id,
          name: restaurants.name,
          lat: restaurants.latitude,
          lng: restaurants.longitude,
          location: restaurants.location,
          image: restaurants.image,
          type: sql`'restaurants'`,
        })
        .from(restaurants)
        .where(
          and(
            isNotNull(restaurants.latitude),
            isNotNull(restaurants.longitude),
          ),
        )
        .limit(3),

      db
        .select({
          id: cafes.id,
          name: cafes.name,
          lat: cafes.latitude,
          lng: cafes.longitude,
          location: cafes.location,
          image: cafes.image,
          type: sql`'cafes'`,
        })
        .from(cafes)
        .where(and(isNotNull(cafes.latitude), isNotNull(cafes.longitude)))
        .limit(3),

      db
        .select({
          id: attractions.id,
          name: attractions.name,
          lat: attractions.latitude,
          lng: attractions.longitude,
          location: attractions.location,
          image: attractions.image,
          type: sql`'attractions'`,
        })
        .from(attractions)
        .where(
          and(
            isNotNull(attractions.latitude),
            isNotNull(attractions.longitude),
          ),
        )
        .limit(3),

      db
        .select({
          id: events.id,
          name: events.name,
          lat: events.latitude,
          lng: events.longitude,
          location: events.location,
          image: events.image,
          type: sql`'events'`,
        })
        .from(events)
        .where(and(isNotNull(events.latitude), isNotNull(events.longitude)))
        .limit(3),

      db
        .select({
          id: transport.id,
          name: transport.name,
          lat: transport.latitude,
          lng: transport.longitude,
          location: transport.location,
          image: transport.image,
          type: sql`'transport'`,
        })
        .from(transport)
        .where(
          and(isNotNull(transport.latitude), isNotNull(transport.longitude)),
        )
        .limit(3),

      db
        .select({
          id: destinations.id,
          name: destinations.name,
          lat: destinations.latitude,
          lng: destinations.longitude,
          location: destinations.location,
          image: destinations.image,
          type: sql`'destinations'`,
        })
        .from(destinations)
        .where(
          and(
            isNotNull(destinations.latitude),
            isNotNull(destinations.longitude),
          ),
        )
        .limit(3),
    ]);

    return NextResponse.json([
      ...hotelsData,
      ...restaurantsData,
      ...cafesData,
      ...attractionsData,
      ...eventsData,
      ...transportData,
      ...destinationsData,
    ]);
  } catch (error) {
    console.error("Map pins fetch error:", error);

    return NextResponse.json(
      { error: "Failed to fetch pins" },
      { status: 500 },
    );
  }
}
