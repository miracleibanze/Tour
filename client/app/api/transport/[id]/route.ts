import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { transport } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const [data] = await db.select().from(transport).where(eq(transport.id, id));

  if (!data) {
    return NextResponse.json({ error: "transport not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json();

  const [updated] = await db
    .update(transport)
    .set(body)
    .where(eq(transport.id, id))
    .returning();

  return NextResponse.json(updated);
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const [deleted] = await db
    .delete(transport)
    .where(eq(transport.id, id))
    .returning();

  return NextResponse.json(deleted);
}
