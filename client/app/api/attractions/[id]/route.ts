import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { attractions } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const [data] = await db
    .select()
    .from(attractions)
    .where(eq(attractions.id, id));

  if (!data) {
    return NextResponse.json(
      { error: "attraction not found" },
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
      .update(attractions)
      .set(body)
      .where(eq(attractions.id, id))
      .returning();

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json(
      { error: "Failed to update attraction" },
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
      .delete(attractions)
      .where(eq(attractions.id, id))
      .returning();

    return NextResponse.json(deleted);
  } catch {
    return NextResponse.json(
      { error: "Failed to delete attraction" },
      { status: 500 },
    );
  }
}
