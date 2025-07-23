import { NextRequest, NextResponse } from "next/server";
import checkAuth from "./app/actions/checkAuth";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const { isAuthenticated } = await checkAuth();

  if (pathname === '/bookings' && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if((pathname === '/login' || pathname === '/register') && isAuthenticated) {
    return NextResponse.redirect(new URL("/bookings", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/bookings", "/login"],
};
