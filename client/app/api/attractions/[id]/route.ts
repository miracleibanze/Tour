import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { attractions } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const [data] = await db
      .select()
      .from(attractions)
      .where(eq(attractions.id, params.id));

    if (!data) {
      return NextResponse.json(
        { error: "Attraction not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch attraction" },
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
      .update(attractions)
      .set(body)
      .where(eq(attractions.id, params.id))
      .returning();

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json(
      { error: "Failed to update attraction" },
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
      .delete(attractions)
      .where(eq(attractions.id, params.id))
      .returning();

    return NextResponse.json(deleted);
  } catch {
    return NextResponse.json(
      { error: "Failed to delete attraction" },
      { status: 500 }
    );
  }
}