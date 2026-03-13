import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const accept = request.headers.get("accept") || "";
  const pathname = request.nextUrl.pathname;

  // Content negotiation: if requesting JSON on a profile path, redirect to cli.json
  if (
    accept.includes("application/json") &&
    !pathname.includes(".") &&
    !pathname.startsWith("/api") &&
    !pathname.startsWith("/directory") &&
    pathname !== "/" &&
    pathname.split("/").length === 2
  ) {
    const url = request.nextUrl.clone();
    url.pathname = `${pathname}/cli.json`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
