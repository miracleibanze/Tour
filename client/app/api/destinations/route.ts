import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { destinations } from "@/lib/schema";
import { ilike, and, count } from "drizzle-orm";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const search = searchParams.get("q") || "";
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);

  const offset = (page - 1) * limit;

  const conditions = [];

  if (search) {
    conditions.push(ilike(destinations.name, `%${search}%`));
  }

  const data = await db
    .select()
    .from(destinations)
    .where(conditions.length ? and(...conditions) : undefined)
    .limit(limit)
    .offset(offset);

  const [{ total }] = await db
    .select({ total: count() })
    .from(destinations)
    .where(conditions.length ? and(...conditions) : undefined);

  return NextResponse.json({ data, total, page, limit });
}

export async function POST(request: Request) {
  const body = await request.json();

  const [item] = await db.insert(destinations).values(body).returning();

  return NextResponse.json(item, { status: 201 });
}
