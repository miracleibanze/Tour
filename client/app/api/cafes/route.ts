import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cafes } from "@/lib/schema";
import { desc, eq, ilike, and, count } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const rawPage = Number(searchParams.get("page"));
    const page = !rawPage || rawPage < 1 ? 1 : rawPage;

    const limit = Number(searchParams.get("limit") || 24);
    const offset = (page - 1) * limit;

    const category = searchParams.get("category") || "";
    const featured = searchParams.get("featured") || "";
    const search = searchParams.get("q") || "";

    const conditions = [];

    if (category.trim()) {
      conditions.push(eq(cafes.category, category));
    }

    if (featured === "true") {
      conditions.push(eq(cafes.featured, true));
    }

    if (search.trim()) {
      conditions.push(ilike(cafes.name, `%${search}%`));
    }

    const data = await db
      .select({
        id: cafes.id,
        name: cafes.name,
        image: cafes.image,
        rating: cafes.rating,
        reviews: cafes.reviews,
        price: cafes.price,
        location: cafes.location,
        category: cafes.category,
        tags: cafes.tags,
        featured: cafes.featured,
      })
      .from(cafes)
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(desc(cafes.rating))
      .limit(limit)
      .offset(offset);

    const [{ total }] = await db
      .select({ total: count() })
      .from(cafes)
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
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch cafes" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const [item] = await db.insert(cafes).values(body).returning();

    return NextResponse.json(item, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create cafe" },
      { status: 500 },
    );
  }
}
