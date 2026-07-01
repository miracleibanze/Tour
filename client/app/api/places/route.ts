// app/api/places/route.ts

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { places } from "@/lib/schema";
import { count, eq } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 12;
    const category = searchParams.get("category");

    const offset = (page - 1) * limit;

    const data = category
      ? await db
          .select()
          .from(places)
          .where(eq(places.category, category))
          .limit(limit)
          .offset(offset)
      : await db
          .select()
          .from(places)
          .limit(limit)
          .offset(offset);

    const total = category
      ? (
          await db
            .select({ count: count() })
            .from(places)
            .where(eq(places.category, category))
        )[0].count
      : (
          await db
            .select({ count: count() })
            .from(places)
        )[0].count;

    return NextResponse.json({
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
  } catch (error) {
    return NextResponse.json(
      { error: "Database error" },
      { status: 500 }
    );
  }
}


export async function POST(request: Request) {
  try {
    const body = await request.json();

    const [place] = await db
      .insert(places)
      .values(body)
      .returning();

    return NextResponse.json(place, {
      status: 201,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to create place" },
      { status: 500 }
    );
  }
}