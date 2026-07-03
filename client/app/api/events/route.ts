import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { events } from "@/lib/schema";
import { desc, eq, ilike, and, count } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 24;
    const offset = (page - 1) * limit;

    const search = searchParams.get("q");

    const conditions = [];

    if (search) {
      conditions.push(ilike(events.name, `%${search}%`));
    }

    const data = await db
      .select()
      .from(events)
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(desc(events.date))
      .limit(limit)
      .offset(offset);

    const [{ total }] = await db
      .select({ total: count() })
      .from(events)
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
      { error: "Failed to fetch events" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const [event] = await db.insert(events).values(body).returning();

    return NextResponse.json(event, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 },
    );
  }
}
