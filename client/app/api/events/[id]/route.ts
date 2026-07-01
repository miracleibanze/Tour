import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { events } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function GET(_: Request, { params }: any) {
  const [data] = await db.select().from(events).where(eq(events.id, params.id));

  if (!data) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}

export async function PATCH(request: Request, { params }: any) {
  const body = await request.json();

  const [updated] = await db
    .update(events)
    .set(body)
    .where(eq(events.id, params.id))
    .returning();

  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: any) {
  const [deleted] = await db
    .delete(events)
    .where(eq(events.id, params.id))
    .returning();

  return NextResponse.json(deleted);
}