import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath =
    path === "/login" || path === "/register" || path === "/" || path.startsWith("/products") || path === "/cart"

  // Check if the path is for admin routes - be more specific to catch all admin routes
  const isAdminPath = path.startsWith("/admin") && path !== "/admin/login"

  // Get the token from the cookies
  const user = request.cookies.get("user")?.value
  let userData = null

  try {
    if (user) {
      userData = JSON.parse(user)
    }
  } catch (error) {
    console.error("Error parsing user data:", error)
  }

  // Check if the user is an admin
  const isAdmin = userData?.role === "admin"

  // If the path is an admin path and the user is not an admin, redirect to admin login
  if (isAdminPath && (!userData || !isAdmin)) {
    return NextResponse.redirect(new URL("/admin/login?message=access_denied", request.url))
  }

  // If the user is not logged in and the path is not public, redirect to login
  if (!isPublicPath && !userData) {
    return NextResponse.redirect(new URL(`/login?redirectTo=${path}`, request.url))
  }

  // If the user is logged in and tries to access login or register, redirect to home
  if ((path === "/login" || path === "/register") && userData) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // If the user is logged in as admin and tries to access admin login, redirect to admin dashboard
  if (path === "/admin/login" && userData && isAdmin) {
    return NextResponse.redirect(new URL("/admin", request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/admin/:path*",
    "/profile/:path*",
    "/orders/:path*",
    "/checkout/:path*",
    "/login",
    "/register",
    "/admin/login",
  ],
}

