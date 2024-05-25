import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  console.log(path);
  const isPublicPath = path === "/login" || path === "/signup";

  const token = request.cookies.get("auth-token")?.value || "";
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/profile", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/profile/:path*", "/login", "/signup"],
};
