// import * as React from "react";

// import { SearchForm } from "@/components/search-form";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarRail,
// } from "@/components/ui/sidebar";
// import { VersionSwitcher } from "@/components/version-switcher";
// import { adminRoutes } from "@/routes/adminRoutes";
// import { tutorRoutes } from "@/routes/tutor";
// import Link from "next/link";
// import { Route } from "@/types/route.type";
// import { Roles } from "@/constrant/roles";
// import { studentRoutes } from "@/routes/studentRoutes";

// // This is sample data.
// const data = {
//   versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
//   navMain: [
//     {
//       title: "Getting Started",
//       url: "#",
//       items: [
//         {
//           title: "admin-dashboard",
//           url: "/admin-dashboard",
//         },
//         {
//           title: "user-dashboard",
//           url: "/user-dash",
//         },
//       ],
//     },
//   ],
// };

// export function AppSidebar({
//   user,
//   ...props
// }: {
//   user: { role: string } & React.ComponentProps<typeof Sidebar>;
// }) {
//   let routes:Route[] = [];
//   switch (user.role) {
//     case Roles.ADMIN:
//       routes = adminRoutes;
//       break;
//     case Roles.TUTOR:
//       routes =tutorRoutes;
//       break;
//        case Roles.STUDENT:
//       routes = studentRoutes;
//       break;
//     default:
//       routes = [];
//       break;
//   }

//   return (
//     <Sidebar {...props}>
//       <SidebarHeader>
//         <VersionSwitcher
//           versions={data.versions}
//           defaultVersion={data.versions[0]}
//         />
//         <SearchForm />
//       </SidebarHeader>
//       <SidebarContent>
//         {/* We create a SidebarGroup for each parent. */}
//         {routes.map((item) => (
//           <SidebarGroup key={item.title}>
//             <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
//             <SidebarGroupContent>
//               <SidebarMenu>
//                 {item.items.map((item) => (
//                   <SidebarMenuItem key={item.title}>
//                     <SidebarMenuButton asChild>
//                       <Link href={item.url}>{item.title}</Link>
//                     </SidebarMenuButton>
//                   </SidebarMenuItem>
//                 ))}
//               </SidebarMenu>
//             </SidebarGroupContent>
//           </SidebarGroup>
//         ))}
//       </SidebarContent>
//       <SidebarRail />
//     </Sidebar>
//   );
// }

"use client";

import * as React from "react";
import Link from "next/link";
import { LogOut } from "lucide-react";

import { SearchForm } from "@/components/search-form";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { VersionSwitcher } from "@/components/version-switcher";

import { adminRoutes } from "@/routes/adminRoutes";
import { tutorRoutes } from "@/routes/tutor";
import { studentRoutes } from "@/routes/studentRoutes";

import { Route } from "@/types/route.type";
import { Roles } from "@/constrant/roles";
import { authClient } from "@/lib/auth-client";

/* -------------------- Sample Meta -------------------- */

// const data = {
//   versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
// };

/* -------------------- Component -------------------- */

export function AppSidebar({
  user,
  ...props
}: {
  user: { role: string };
} & React.ComponentProps<typeof Sidebar>) {
  /* ---------------- Role based routes ---------------- */
  let routes: Route[] = [];

  switch (user.role) {
    case Roles.ADMIN:
      routes = adminRoutes;
      break;
    case Roles.TUTOR:
      routes = tutorRoutes;
      break;
    case Roles.STUDENT:
      routes = studentRoutes;
      break;
    default:
      routes = [];
  }

  /* ---------------- Logout ---------------- */
  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/login";
        },
      },
    });
  };

  return (
    <Sidebar {...props}>
      {/* ---------- Header ---------- */}
      <SidebarHeader>
        {/* <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        /> */}
        {/* <SearchForm /> */}
      </SidebarHeader>

      {/* ---------- Main Content ---------- */}
      <SidebarContent>
        {routes.map((group) => (
          // <SidebarGroup key={group.title}>
          //   <SidebarGroupLabel>{group.title}</SidebarGroupLabel>

          <SidebarGroup key={group.title}>
  {group.url ? (
    <Link href={group.url}>
      <SidebarGroupLabel className="cursor-pointer text-5xl hover:underline">
        {group.title}
      </SidebarGroupLabel>
    </Link>
  ) : (
    <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
  )}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        {/* ---------- Logout (Bottom Fixed) ---------- */}
        <div className="border-t mt-6"></div>
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={handleLogout}
                  className="text-red-500 mb-6 border border-red-500 hover:text-red-600"
                >
                  <LogOut className="mr-6  h-4 w-4" />
                  Logout
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
