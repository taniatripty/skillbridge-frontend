import { NextRequest, NextResponse } from "next/server";
import { userServices } from "./services/user.services";


export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const { data } = await userServices.getsession()

  // 🔐 Not authenticated
  if (!data) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const role = data.user.role;

 

  // ADMIN
  if (pathname.startsWith("/admin-dashboard")) {
    if (role !== "ADMIN") {
      return NextResponse.redirect(new URL("/student-dash", request.url));
    }
  }

  // TUTOR
  if (pathname.startsWith("/tutor-dash")) {
    if (role !== "TUTOR") {
      return NextResponse.redirect(new URL("/student-dash", request.url));
    }
  }

  // STUDENT
  if (pathname.startsWith("/student-dash")) {
    if (role !== "STUDENT") {
      if (role === "ADMIN") {
        return NextResponse.redirect(new URL("/admin-dashboard", request.url));
      }
      if (role === "TUTOR") {
        return NextResponse.redirect(new URL("/tutor-dash", request.url));
      }
    }
  }

  return NextResponse.next();
}


export const config = {
  matcher: [
    "/student-dash/:path*",
    "/admin-dashboard/:path*",
    "/tutor-dash/:path*",
  ],
};