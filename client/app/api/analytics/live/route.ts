import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hotels, restaurants, cafes, attractions } from "@/lib/schema";
import { count, eq } from "drizzle-orm";

export async function GET() {
  try {
    const [
      [{ hotelsCount }],
      [{ restaurantsCount }],
      [{ cafesCount }],
      [{ nationalParksCount }],
    ] = await Promise.all([
      db
        .select({
          hotelsCount: count(),
        })
        .from(hotels),

      db
        .select({
          restaurantsCount: count(),
        })
        .from(restaurants),

      db
        .select({
          cafesCount: count(),
        })
        .from(cafes),

      db
        .select({
          nationalParksCount: count(),
        })
        .from(attractions)
        .where(eq(attractions.category, "National Park")),
    ]);

    const listedBusinesses = hotelsCount + restaurantsCount + cafesCount;

    return NextResponse.json({
      annualVisitors: null,
      tourismRevenue: null,
      listedBusinesses,
      nationalParks: nationalParksCount,
    });
  } catch {
    return NextResponse.json(
      {
        error: "Failed to fetch live analytics",
      },
      {
        status: 500,
      },
    );
  }
}
