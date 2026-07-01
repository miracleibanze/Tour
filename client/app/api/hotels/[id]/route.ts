// app/api/hotels/[id]/route.ts

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hotels } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const [hotel] = await db
    .select()
    .from(hotels)
    .where(eq(hotels.id, Number(id)));

  if (!hotel) {
    return NextResponse.json(
      { error: "Hotel not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(hotel);
}


export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const [hotel] = await db
    .update(hotels)
    .set(body)
    .where(eq(hotels.id, Number(id)))
    .returning();

  return NextResponse.json(hotel);
}


export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await db
    .delete(hotels)
    .where(eq(hotels.id, Number(id)));

  return NextResponse.json({
    message: "Hotel deleted successfully",
  });
}