import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { attractions } from "@/lib/schema";
import { count, desc, eq, ilike, and } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 24;
    const offset = (page - 1) * limit;

    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const search = searchParams.get("q");

    const conditions = [];

    if (category) {
      conditions.push(eq(attractions.category, category));
    }

    if (featured === "true") {
      conditions.push(eq(attractions.featured, true));
    }

    if (search) {
      conditions.push(ilike(attractions.name, `%${search}%`));
    }

    const data = await db
      .select({
        id: attractions.id,
        name: attractions.name,
        image: attractions.image,
        rating: attractions.rating,
        reviews: attractions.reviews,
        price: attractions.price,
        location: attractions.location,
        category: attractions.category,
        tags: attractions.tags,
        featured: attractions.featured,
      })
      .from(attractions)
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(desc(attractions.rating))
      .limit(limit)
      .offset(offset);

    const [{ total }] = await db
      .select({ total: count() })
      .from(attractions)
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
      { error: "Failed to fetch attractions" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const [attraction] = await db.insert(attractions).values(body).returning();

    return NextResponse.json(attraction, {
      status: 201,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to create attraction" },
      { status: 500 },
    );
  }
}
