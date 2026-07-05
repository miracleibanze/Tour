import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hotels } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const [hotel] = await db.select().from(hotels).where(eq(hotels.id, id));

  if (!hotel) {
    return NextResponse.json({ error: "Hotel not found" }, { status: 404 });
  }

  const reviews = hotel.writtenReviews || [];

  const ratingBreakDown =
    reviews.length === 0
      ? {
          Location: 0,
          Cleanliness: 0,
          Service: 0,
          Value: 0,
        }
      : reviews.reduce(
          (acc, review) => {
            acc.Location += review.details.Location;
            acc.Cleanliness += review.details.Cleanliness;
            acc.Service += review.details.Service;
            acc.Value += review.details.Value;
            return acc;
          },
          {
            Location: 0,
            Cleanliness: 0,
            Service: 0,
            Value: 0,
          },
        );

  const count = reviews.length;

  const normalizedRatingBreakDown = {
    Location: ratingBreakDown.Location / count,
    Cleanliness: ratingBreakDown.Cleanliness / count,
    Service: ratingBreakDown.Service / count,
    Value: ratingBreakDown.Value / count,
  };

  return NextResponse.json({
    ...hotel,
    ratingBreakDown: normalizedRatingBreakDown,
  });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json();

  const [hotel] = await db
    .update(hotels)
    .set(body)
    .where(eq(hotels.id, id))
    .returning();

  return NextResponse.json(hotel);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  await db.delete(hotels).where(eq(hotels.id, id));

  return NextResponse.json({
    message: "Hotel deleted successfully",
  });
}
