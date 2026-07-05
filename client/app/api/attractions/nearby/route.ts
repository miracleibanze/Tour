import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { attractions } from "@/lib/schema";
import { ilike, notInArray, sql, and } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q")?.trim();

    if (!q) {
      return NextResponse.json([]);
    }

    // 1. District-level search
    let results = await db
      .select({
        id: attractions.id,
        name: attractions.name,
        image: attractions.image,
        location: attractions.location,
      })
      .from(attractions)
      .where(ilike(attractions.location, `%${q}%`))
      .limit(3);

    // 2. City fallback
    if (results.length < 3) {
      const city = q.split(/\s+/)[0];
      const remaining = 3 - results.length;

      const existingIds = results.map((r) => r.id);

      const cityResults = await db
        .select({
          id: attractions.id,
          name: attractions.name,
          image: attractions.image,
          location: attractions.location,
        })
        .from(attractions)
        .where(
          existingIds.length
            ? and(
                ilike(attractions.location, `${city}%`),
                notInArray(attractions.id, existingIds),
              )
            : ilike(attractions.location, `${city}%`),
        )
        .limit(remaining);

      results = [...results, ...cityResults];
    }

    // 3. Random fallback if still not enough
    if (results.length < 3) {
      const remaining = 3 - results.length;
      const existingIds = results.map((r) => r.id);

      const randomResults = await db
        .select({
          id: attractions.id,
          name: attractions.name,
          image: attractions.image,
          location: attractions.location,
        })
        .from(attractions)
        .where(
          existingIds.length
            ? notInArray(attractions.id, existingIds)
            : undefined,
        )
        .orderBy(sql`RANDOM()`)
        .limit(remaining);

      results = [...results, ...randomResults];
    }

    return NextResponse.json(
      results.map(({ id, name, image, location }) => ({
        id,
        name,
        image,
        location,
      })),
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch attractions" },
      { status: 500 },
    );
  }
}
