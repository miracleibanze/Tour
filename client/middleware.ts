import { NextResponse } from "next/server";

const allowed = [
  "hotels",
  "restaurants",
  "cafes",
  "attractions",
  "events",
  "transport",
];

export function middleware(req: Request) {
  const url = new URL(req.url);
  const parts = url.pathname.split("/");

  const page = parts[1];

  if (page && !allowed.includes(page)) {
    return new NextResponse("Not Found", { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/(hotel|restaurants|cafes|attractions|events|transport)/:id"],
};
