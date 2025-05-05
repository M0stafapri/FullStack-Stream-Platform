import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath =
    path === "/login" ||
    path === "/signup" ||
    path === "/" ||
    path.startsWith("/api/") ||
    path.includes("_next") ||
    path.includes("favicon.ico")

  // Get the token from the request cookies
  const token = request.cookies.get("accessToken")?.value || ""

  // For debugging
  console.log(`Middleware: Path ${path}, Token exists: ${!!token}, Public path: ${isPublicPath}`)

  // Redirect logic
  if (!isPublicPath && !token) {
    // If trying to access a protected route without a token, redirect to login
    console.log(`Middleware: Redirecting to login from ${path}`)
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // If already logged in and trying to access login/signup, redirect to dashboard
  if ((path === "/login" || path === "/signup") && token) {
    console.log(`Middleware: Redirecting to dashboard from ${path}`)
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

// Configure the paths that middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}
