import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

const publicRoutes = ["/login", "/register", "/forgot-password"];

function isPublicPath(pathname: string) {
  return publicRoutes.includes(pathname) || pathname.startsWith("/reset-password/");
}

export async function proxy(request: NextRequest) {
  const session = await auth();
  const isLoggedIn = !!session;
  const isPublicRoute = isPublicPath(request.nextUrl.pathname);

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  if (isLoggedIn && isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
