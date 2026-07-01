import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { transport } from "@/lib/schema";
import { desc, eq, ilike, and, count } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 12;
    const offset = (page - 1) * limit;

    const search = searchParams.get("q");

    const conditions = [];

    if (search) {
      conditions.push(ilike(transport.name, `%${search}%`));
    }

    const data = await db
      .select()
      .from(transport)
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(desc(transport.rating))
      .limit(limit)
      .offset(offset);

    const [{ total }] = await db
      .select({ total: count() })
      .from(transport)
      .where(conditions.length ? and(...conditions) : undefined);

    return NextResponse.json({
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch transport" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const body = await request.json();

  const [item] = await db.insert(transport).values(body).returning();

  return NextResponse.json(item, { status: 201 });
}