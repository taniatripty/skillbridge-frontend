
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  
  if (
   
    pathname.startsWith("/verify-email") 
    
  ) {
    return NextResponse.next();
  }

  
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("better-auth.session_token")?.value;

  if (!sessionToken) {
    
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    
    const res = await fetch(`${process.env.AUTH_URL}/get-session`, {
      headers: {
        cookie: cookieStore.toString(), 
      },
      cache: "no-store", 
    });

    if (!res.ok) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

   
    const json = await res.json();
    const user = json.data?.user || json.user;
console.log(user)

    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const role = user.role;

   

    // ADMIN
    if (pathname.startsWith("/admin-dashboard") && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/student-dash", request.url));
    }

    // TUTOR
    if (pathname.startsWith("/tutor-dash") && role !== "TUTOR") {
      return NextResponse.redirect(new URL("/student-dash", request.url));
    }

    // STUDENT
    if (pathname.startsWith("/student-dash")) {
      if (role === "ADMIN") {
        return NextResponse.redirect(new URL("/admin-dashboard", request.url));
      }
      if (role === "TUTOR") {
        return NextResponse.redirect(new URL("/tutor-dash", request.url));
      }
    }

    // ✅ All good, allow access
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/student-dash/:path*",
    "/admin-dashboard/:path*",
    "/tutor-dash/:path*",
  ],
};
