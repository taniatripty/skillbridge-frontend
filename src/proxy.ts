// import { NextRequest, NextResponse } from "next/server";
// import { userServices } from "./services/user.services";


// export async function proxy(request: NextRequest) {
//   const pathname = request.nextUrl.pathname;

//   const { data } = await userServices.getsession()
  
//   //  Not authenticated
//   if (!data) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   const role = data.user.role;

 

//   // ADMIN
//   if (pathname.startsWith("/admin-dashboard")) {
//     if (role !== "ADMIN") {
//       return NextResponse.redirect(new URL("/student-dash", request.url));
//     }
//   }

//   // TUTOR
//   if (pathname.startsWith("/tutor-dash")) {
//     if (role !== "TUTOR") {
//       return NextResponse.redirect(new URL("/student-dash", request.url));
//     }
//   }

//   // STUDENT
//   if (pathname.startsWith("/student-dash")) {
//     if (role !== "STUDENT") {
//       if (role === "ADMIN") {
//         return NextResponse.redirect(new URL("/admin-dashboard", request.url));
//       }
//       if (role === "TUTOR") {
//         return NextResponse.redirect(new URL("/tutor-dash", request.url));
//       }
//     }
//   }

//   return NextResponse.next();
// }


// export const config = {
//   matcher: [
//     "/student-dash/:path*",
//     "/admin-dashboard/:path*",
//     "/tutor-dash/:path*",
//   ],
// };

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

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
