


// "use client";

// import React from "react";
// import Link from "next/link";
// import { Menu, LogOut } from "lucide-react";

// import { cn } from "@/lib/utils";


// import { Button } from "@/components/ui/button";
// import {
//   NavigationMenu,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
// } from "@/components/ui/navigation-menu";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { ModeToggle } from "./ModeToggle";
// import { authClient } from "@/lib/auth-client";

// /* -------------------- Types -------------------- */

// interface MenuItem {
//   title: string;
//   url: string;
// }

// interface NavbarProps {
//   className?: string;
//   logo?: {
//     url: string;
//     src: string;
//     alt: string;
//     title: string;
//   };
//   menu?: MenuItem[];
// }

// /* -------------------- Component -------------------- */

// const Navbar = ({
//   className,
//   logo = {
//     url: "/",
//     src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
//     alt: "logo",
//     title: "Skillbridge management",
//   },
//   menu = [
//     { title: "Home", url: "/" },
//     { title: "About", url: "/about" },
//     { title: "Blog", url: "/blog" },
//   ],
// }: NavbarProps) => {
//   const { data: session, isPending } = authClient.useSession();

//   const handleLogout = async () => {
//     await authClient.signOut({
//       fetchOptions: {
//         onSuccess: () => {
//           window.location.href = "/";
//         },
//       },
//     });
//   };

//   return (
//     <header className={cn("border-b bg-background", className)}>
//       <div className="container mx-auto flex h-16 items-center justify-between px-4">
//         {/* ---------------- Logo ---------------- */}
//         <Link href={logo.url} className="flex items-center gap-2">
//           <img src={logo.src} alt={logo.alt} className="h-8 w-8 dark:invert" />
//           <span className="font-semibold">{logo.title}</span>
//         </Link>

//         {/* ---------------- Desktop Menu ---------------- */}
//         <nav className="hidden lg:flex items-center gap-6">
//           <NavigationMenu>
//             <NavigationMenuList>
//               {menu.map((item) => (
//                 <NavigationMenuItem key={item.title}>
//                   <NavigationMenuLink asChild>
//                     <Link
//                       href={item.url}
//                       className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
//                     >
//                       {item.title}
//                     </Link>
//                   </NavigationMenuLink>
//                 </NavigationMenuItem>
//               ))}
//             </NavigationMenuList>
//           </NavigationMenu>

//           <ModeToggle />

//           {!isPending && session?.user ? (
//             <div className="flex items-center gap-3">
//               <div className="text-right leading-tight">
//                 <p className="text-sm font-medium">
//                   {session.user.name}
//                 </p>
//                 <p className="text-xs text-muted-foreground">
//                   {session.user.email}
//                 </p>
//               </div>

//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={handleLogout}
//                 className="flex items-center gap-1"
//               >
//                 <LogOut className="size-4" />
//                 Logout
//               </Button>
//             </div>
//           ) : (
//             !isPending && (
//               <>
//                 <Button asChild variant="outline" size="sm">
//                   <Link href="/login">Login</Link>
//                 </Button>
//                 <Button asChild size="sm">
//                   <Link href="/register">Register</Link>
//                 </Button>
//               </>
//             )
//           )}
//         </nav>

//         {/* ---------------- Mobile Menu ---------------- */}
//         <Sheet>
//           <SheetTrigger asChild className="lg:hidden">
//             <Button variant="outline" size="icon">
//               <Menu className="size-4" />
//             </Button>
//           </SheetTrigger>

//           <SheetContent>
//             <SheetHeader>
//               <SheetTitle>{logo.title}</SheetTitle>
//             </SheetHeader>

//             <div className="mt-6 flex flex-col gap-4">
//               {menu.map((item) => (
//                 <Link
//                   key={item.title}
//                   href={item.url}
//                   className="text-sm font-medium"
//                 >
//                   {item.title}
//                 </Link>
//               ))}

//               <ModeToggle />

//               <div className="pt-4 border-t">
//                 {session?.user ? (
//                   <>
//                     <div className="mb-3">
//                       <p className="text-sm font-semibold">
//                         {session.user.name}
//                       </p>
//                       <p className="text-xs text-muted-foreground">
//                         {session.user.email}
//                       </p>
//                     </div>

//                     <Button
//                       variant="outline"
//                       onClick={handleLogout}
//                       className="w-full flex items-center gap-2"
//                     >
//                       <LogOut className="size-4" />
//                       Logout
//                     </Button>
//                   </>
//                 ) : (
//                   <div className="flex flex-col gap-3">
//                     <Button asChild variant="outline">
//                       <Link href="/login">Login</Link>
//                     </Button>
//                     <Button asChild>
//                       <Link href="/register">Register</Link>
//                     </Button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </SheetContent>
//         </Sheet>
//       </div>
//     </header>
//   );
// };

// export { Navbar };

// "use client";

// import React from "react";
// import Link from "next/link";
// import { Menu, LogOut } from "lucide-react";

// import { cn } from "@/lib/utils";

// import { Button } from "@/components/ui/button";
// import {
//   NavigationMenu,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
// } from "@/components/ui/navigation-menu";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { ModeToggle } from "./ModeToggle";
// import { authClient } from "@/lib/auth-client";

// /* -------------------- Types -------------------- */

// interface MenuItem {
//   title: string;
//   url: string;
// }

// interface NavbarProps {
//   className?: string;
//   logo?: {
//     url: string;
//     src: string;
//     alt: string;
//     title: string;
//   };
//   menu?: MenuItem[];
// }

// /* -------------------- Component -------------------- */

// const Navbar = ({
//   className,
//   logo = {
//     url: "/",
//     src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
//     alt: "logo",
//     title: "Skillbridge management",
//   },
//   menu = [
//     { title: "Home", url: "/" },
//     { title: "About", url: "/about" },
//     { title: "Blog", url: "/blog" },
//   ],
// }: NavbarProps) => {
//   const { data: session, isPending } = authClient.useSession();

//   const handleLogout = async () => {
//     await authClient.signOut({
//       fetchOptions: {
//         onSuccess: () => {
//           window.location.href = "/";
//         },
//       },
//     });
//   };

//   // Build menu items dynamically
//   const menuItems = session?.user
//     ? [...menu, { title: "Be a Tutor", url: "/tutor" }]
//     : menu;

//   return (
//     <header className={cn("border-b bg-background", className)}>
//       <div className="container mx-auto flex h-16 items-center justify-between px-4">
//         {/* ---------------- Logo ---------------- */}
//         <Link href={logo.url} className="flex items-center gap-2">
//           <img src={logo.src} alt={logo.alt} className="h-8 w-8 dark:invert" />
//           <span className="font-semibold">{logo.title}</span>
//         </Link>

//         {/* ---------------- Desktop Menu ---------------- */}
//         <nav className="hidden lg:flex items-center gap-6">
//           <NavigationMenu>
//             <NavigationMenuList>
//               {menuItems.map((item) => (
//                 <NavigationMenuItem key={item.title}>
//                   <NavigationMenuLink asChild>
//                     <Link
//                       href={item.url}
//                       className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
//                     >
//                       {item.title}
//                     </Link>
//                   </NavigationMenuLink>
//                 </NavigationMenuItem>
//               ))}
//             </NavigationMenuList>
//           </NavigationMenu>

//           <ModeToggle />

//           {!isPending && session?.user ? (
//             <div className="flex items-center gap-3">
//               <div className="text-right leading-tight">
//                 <p className="text-sm font-medium">{session.user.name}</p>
//                 <p className="text-xs text-muted-foreground">{session.user.email}</p>
//               </div>

//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={handleLogout}
//                 className="flex items-center gap-1"
//               >
//                 <LogOut className="size-4" />
//                 Logout
//               </Button>
//             </div>
//           ) : (
//             !isPending && (
//               <>
//                 <Button asChild variant="outline" size="sm">
//                   <Link href="/login">Login</Link>
//                 </Button>
//                 <Button asChild size="sm">
//                   <Link href="/register">Register</Link>
//                 </Button>
//               </>
//             )
//           )}
//         </nav>

//         {/* ---------------- Mobile Menu ---------------- */}
//         <Sheet>
//           <SheetTrigger asChild className="lg:hidden">
//             <Button variant="outline" size="icon">
//               <Menu className="size-4" />
//             </Button>
//           </SheetTrigger>

//           <SheetContent>
//             <SheetHeader>
//               <SheetTitle>{logo.title}</SheetTitle>
//             </SheetHeader>

//             <div className="mt-6 flex flex-col gap-4">
//               {menuItems.map((item) => (
//                 <Link
//                   key={item.title}
//                   href={item.url}
//                   className="text-sm font-medium"
//                 >
//                   {item.title}
//                 </Link>
//               ))}

//               <ModeToggle />

//               <div className="pt-4 border-t">
//                 {session?.user ? (
//                   <>
//                     <div className="mb-3">
//                       <p className="text-sm font-semibold">{session.user.name}</p>
//                       <p className="text-xs text-muted-foreground">{session.user.email}</p>
//                     </div>

//                     <Button
//                       variant="outline"
//                       onClick={handleLogout}
//                       className="w-full flex items-center gap-2"
//                     >
//                       <LogOut className="size-4" />
//                       Logout
//                     </Button>
//                   </>
//                 ) : (
//                   <div className="flex flex-col gap-3">
//                     <Button asChild variant="outline">
//                       <Link href="/login">Login</Link>
//                     </Button>
//                     <Button asChild>
//                       <Link href="/register">Register</Link>
//                     </Button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </SheetContent>
//         </Sheet>
//       </div>
//     </header>
//   );
// };

// export { Navbar };


"use client";

import React from "react";
import Link from "next/link";
import { Menu, LogOut } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "./ModeToggle";
import { authClient } from "@/lib/auth-client";
import { Roles } from "@/constrant/roles";

/* -------------------- Types -------------------- */

interface MenuItem {
  title: string;
  url: string;
}

interface NavbarProps {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
}

/* -------------------- Component -------------------- */

const Navbar = ({
  className,
  logo = {
    url: "/",
    src: "/logo.jpg",
    alt: "logo",
    title: "Skillbridge management",
  },
  menu = [
    { title: "Home", url: "/" },
    { title: "About", url: "/about" },
    { title: "Blog", url: "/blog" },
  ],
}: NavbarProps) => {
  const { data, isPending } = authClient.useSession();

  const user = data?.user;
  
  const role = user?.role as string;

  /* ---------------- Dashboard Route ---------------- */
  const dashboardRoute =
    role === Roles.ADMIN
      ? "/admin-dashboard"
      : role === Roles.TUTOR
      ? "/tutor-dash"
      : "/student-dash";

  /* ---------------- Build Menu Correctly ---------------- */
  const menuItems: MenuItem[] = [...menu];

  if (user) {
    menuItems.push({ title: "Dashboard", url: dashboardRoute });

    // ✅ ONLY STUDENT sees "Be a Tutor"
    if (role === Roles.STUDENT) {
      menuItems.push({ title: "Be a Tutor", url: "/tutor" });
    }
  }

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/";
        },
      },
    });
  };

  return (
    <header className={cn("border-b bg-background", className)}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* ---------------- Logo ---------------- */}
        <Link href={logo.url} className="flex items-center gap-2">
          <img src={logo.src} alt={logo.alt} className="h-8 w-8 dark:invert" />
          <span className="font-semibold">{logo.title}</span>
        </Link>

        {/* ---------------- Desktop Menu ---------------- */}
        <nav className="hidden lg:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              {menuItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.url}
                      className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
                    >
                      {item.title}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <ModeToggle />

          {!isPending && user ? (
            <div className="flex items-center gap-3">
              <div className="text-right leading-tight">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-1"
              >
                <LogOut className="size-4" />
                Logout
              </Button>
            </div>
          ) : (
            !isPending && (
              <>
                <Button asChild variant="outline" size="sm">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/register">Register</Link>
                </Button>
              </>
            )
          )}
        </nav>

        {/* ---------------- Mobile Menu ---------------- */}
        <Sheet>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="outline" size="icon">
              <Menu className="size-4" />
            </Button>
          </SheetTrigger>

          <SheetContent>
            <SheetHeader>
              <SheetTitle>{logo.title}</SheetTitle>
            </SheetHeader>

            <div className="mt-6 flex flex-col gap-4">
              {menuItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.url}
                  className="text-sm font-medium"
                >
                  {item.title}
                </Link>
              ))}

              <ModeToggle />

              <div className="pt-4 border-t">
                {user ? (
                  <>
                    <div className="mb-3">
                      <p className="text-sm font-semibold">{user.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>

                    <Button
                      variant="outline"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2"
                    >
                      <LogOut className="size-4" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Button asChild variant="outline">
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button asChild>
                      <Link href="/register">Register</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export { Navbar };
