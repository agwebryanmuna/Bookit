import { NextRequest, NextResponse } from "next/server";
import checkAuth from "./app/actions/checkAuth";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const { isAuthenticated, userId } = await checkAuth();
  const isPublicPath = ["/login", "/register"].includes(pathname);

  if (isPublicPath && isAuthenticated) {
    return NextResponse.redirect(new URL("/bookings", request.url));
  }

  if (!isAuthenticated || !userId) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/bookings", "/rooms/add", "/rooms/my-rooms"],
};
