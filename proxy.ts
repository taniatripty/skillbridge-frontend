
// import { cookies } from "next/headers";
// import { NextRequest, NextResponse } from "next/server";

// export async function proxy(request: NextRequest) {
//   const { pathname } = request.nextUrl;

  
//   if (
   
//     pathname.startsWith("/verify-email") 
    
//   ) {
//     return NextResponse.next();
//   }

  
//   const cookieStore = await cookies();
//   const sessionToken = cookieStore.get("better-auth.session_token")?.value;

//   if (!sessionToken) {
    
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   try {
    
//     const res = await fetch(`${process.env.AUTH_URL}/get-session`, {
//       headers: {
//         cookie: cookieStore.toString(), 
//       },
//       cache: "no-store", 
//     });

//     if (!res.ok) {
//       return NextResponse.redirect(new URL("/login", request.url));
//     }

   
//     const json = await res.json();
//     const user = json.data?.user || json.user;
// console.log(user)

//     if (!user) {
//       return NextResponse.redirect(new URL("/login", request.url));
//     }

//     const role = user.role;

   

//     // ADMIN
//     if (pathname.startsWith("/admin-dashboard") && role !== "ADMIN") {
//       return NextResponse.redirect(new URL("/student-dash", request.url));
//     }

//     // TUTOR
//     if (pathname.startsWith("/tutor-dash") && role !== "TUTOR") {
//       return NextResponse.redirect(new URL("/student-dash", request.url));
//     }

//     // STUDENT
//     if (pathname.startsWith("/student-dash")) {
//       if (role === "ADMIN") {
//         return NextResponse.redirect(new URL("/admin-dashboard", request.url));
//       }
//       if (role === "TUTOR") {
//         return NextResponse.redirect(new URL("/tutor-dash", request.url));
//       }
//     }

//     // ✅ All good, allow access
//     return NextResponse.next();
//   } catch (error) {
//     console.error("Middleware error:", error);
//     return NextResponse.redirect(new URL("/login", request.url));
//   }
// }

// export const config = {
//   matcher: [
//     "/student-dash/:path*",
//     "/admin-dashboard/:path*",
//     "/tutor-dash/:path*",
//   ],
// };


import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow email verification
  if (pathname.startsWith("/verify-email")) {
    return NextResponse.next();
  }

  try {
    const cookieStore = await cookies();

    // =====================================
    // GET BETTER AUTH SESSION COOKIE
    // =====================================

    const sessionToken =
      cookieStore.get("__Secure-better-auth.session_token")?.value ||
      cookieStore.get("better-auth.session_token")?.value ||
      cookieStore.get("__Secure-session_token")?.value ||
      cookieStore.get("session_token")?.value;

    console.log("Proxy session token exists:", Boolean(sessionToken));

    if (!sessionToken) {
      console.log("Proxy: No session cookie");

      return NextResponse.redirect(
        new URL("/login", request.url),
      );
    }

    // =====================================
    // GET SESSION FROM BACKEND
    // =====================================

    const authUrl = process.env.AUTH_URL;

    if (!authUrl) {
      console.error("AUTH_URL is not configured");

      return NextResponse.redirect(
        new URL("/login", request.url),
      );
    }

    const res = await fetch(`${authUrl}/get-session`, {
      method: "GET",
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    console.log("Get session status:", res.status);

    if (!res.ok) {
      console.log("Backend session request failed");

      return NextResponse.redirect(
        new URL("/login", request.url),
      );
    }

    const json = await res.json();

    console.log("Proxy session response:", json);

    // =====================================
    // GET USER
    // =====================================

    const user = json?.user;

    console.log("Proxy user:", user);

    if (!user) {
      console.log("Proxy: User not found in session");

      return NextResponse.redirect(
        new URL("/login", request.url),
      );
    }

    const role = user.role;

    console.log("Proxy role:", role);

    // =====================================
    // ADMIN
    // =====================================

    if (
      pathname.startsWith("/admin-dashboard") &&
      role !== "ADMIN"
    ) {
      return NextResponse.redirect(
        new URL("/student-dash", request.url),
      );
    }

    // =====================================
    // TUTOR
    // =====================================

    if (
      pathname.startsWith("/tutor-dash") &&
      role !== "TUTOR"
    ) {
      return NextResponse.redirect(
        new URL("/student-dash", request.url),
      );
    }

    // =====================================
    // STUDENT
    // =====================================

    if (pathname.startsWith("/student-dash")) {
      if (role === "ADMIN") {
        return NextResponse.redirect(
          new URL("/admin-dashboard", request.url),
        );
      }

      if (role === "TUTOR") {
        return NextResponse.redirect(
          new URL("/tutor-dash", request.url),
        );
      }
    }

    // =====================================
    // ALLOW REQUEST
    // =====================================

    return NextResponse.next();
  } catch (error) {
    console.error("Proxy authentication error:", error);

    return NextResponse.redirect(
      new URL("/login", request.url),
    );
  }
}

export const config = {
  matcher: [
    "/student-dash/:path*",
    "/admin-dashboard/:path*",
    "/tutor-dash/:path*",
  ],
};