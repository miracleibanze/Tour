// app/api/hotels/route.ts

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hotels } from "@/lib/schema";
import { count, desc, eq, ilike, and } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 12;
    const offset = (page - 1) * limit;

    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const search = searchParams.get("q");

    const conditions = [];

    if (category) {
      conditions.push(eq(hotels.category, category));
    }

    if (featured === "true") {
      conditions.push(eq(hotels.featured, true));
    }

    if (search) {
      conditions.push(ilike(hotels.name, `%${search}%`));
    }

    const data = await db
      .select()
      .from(hotels)
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(desc(hotels.rating))
      .limit(limit)
      .offset(offset);

    const [{ total }] = await db
      .select({
        total: count(),
      })
      .from(hotels)
      .where(conditions.length ? and(...conditions) : undefined);

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
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch hotels" },
      { status: 500 }
    );
  }
}


export async function POST(request: Request) {
  try {
    const body = await request.json();

    const [hotel] = await db
      .insert(hotels)
      .values(body)
      .returning();

    return NextResponse.json(hotel, {
      status: 201,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to create hotel" },
      { status: 500 }
    );
  }
}