import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { restaurants } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const [data] = await db
    .select()
    .from(restaurants)
    .where(eq(restaurants.id, id));

  if (!data) {
    return NextResponse.json(
      { error: "Restaurant not found" },
      { status: 404 },
    );
  }

  return NextResponse.json(data);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const [updated] = await db
      .update(restaurants)
      .set(body)
      .where(eq(restaurants.id, id))
      .returning();

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json(
      { error: "Failed to update restaurant" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const [deleted] = await db
      .delete(restaurants)
      .where(eq(restaurants.id, id))
      .returning();

    return NextResponse.json(deleted);
  } catch {
    return NextResponse.json(
      { error: "Failed to delete restaurant" },
      { status: 500 },
    );
  }
}
