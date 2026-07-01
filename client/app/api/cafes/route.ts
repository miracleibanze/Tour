import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cafes } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const [data] = await db
      .select()
      .from(cafes)
      .where(eq(cafes.id, params.id));

    if (!data) {
      return NextResponse.json(
        { error: "Cafe not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch cafe" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const [updated] = await db
      .update(cafes)
      .set(body)
      .where(eq(cafes.id, params.id))
      .returning();

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json(
      { error: "Failed to update cafe" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const [deleted] = await db
      .delete(cafes)
      .where(eq(cafes.id, params.id))
      .returning();

    return NextResponse.json(deleted);
  } catch {
    return NextResponse.json(
      { error: "Failed to delete cafe" },
      { status: 500 }
    );
  }
}