import { NextResponse, NextRequest } from "next/server";

// request is type of NextRequest
export async function proxy(request) {
  // if someone has token he should not be allowed to access public path like login, signup
  const path = request.nextUrl.pathname;
  const isPublicPaths =
    path === "/login" || path === "/signup" || path === "/verifyemail";
  const token = request.cookies.get("token")?.value || "";
  if (isPublicPaths && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  // if someone does not have token he should not be allowd to access protected path like profile
  if (!isPublicPaths && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/profile", "/login", "/signup", "/verifyemail"],
};
