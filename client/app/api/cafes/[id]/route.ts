import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { cafes } from "@/lib/schema";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const [data] = await db.select().from(cafes).where(eq(cafes.id, id));

  if (!data) {
    return NextResponse.json({ error: "cafe not found" }, { status: 404 });
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
      .update(cafes)
      .set(body)
      .where(eq(cafes.id, id))
      .returning();

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json(
      { error: "Failed to update cafe" },
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
      .delete(cafes)
      .where(eq(cafes.id, id))
      .returning();

    return NextResponse.json(deleted);
  } catch {
    return NextResponse.json(
      { error: "Failed to delete cafe" },
      { status: 500 },
    );
  }
}
