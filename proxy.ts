import { NextResponse, NextRequest } from "next/server";
import {
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
  DEFAULT_LOGIN_REDIRECT,
  protectedRoutes,
} from "./routes";
export default async function proxy(req: NextRequest) {
  const sessionToken = req.cookies.get("better-auth.session_token")?.value;
  const isLoggedIn = !!sessionToken;
  const { nextUrl } = req;

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isProtectedRoute = protectedRoutes.some((route) =>
    nextUrl.pathname.startsWith(route),
  );

  if (isApiAuthRoute) return NextResponse.next();
  if (isPublicRoute) return NextResponse.next();

  if (isProtectedRoute) {
    if (isLoggedIn) return NextResponse.next();

    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }

  if (isAuthRoute) {
    if (isLoggedIn)
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }

  return NextResponse.next();
}
