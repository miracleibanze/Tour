import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { testimonials } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function GET(_: Request, { params }: any) {
  const [data] = await db
    .select()
    .from(testimonials)
    .where(eq(testimonials.id, params.id));

  if (!data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}

export async function DELETE(_: Request, { params }: any) {
  const [deleted] = await db
    .delete(testimonials)
    .where(eq(testimonials.id, params.id))
    .returning();

  return NextResponse.json(deleted);
}