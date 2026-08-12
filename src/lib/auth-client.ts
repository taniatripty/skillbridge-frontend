// import { createAuthClient } from "better-auth/react";
// import { inferAdditionalFields } from "better-auth/client/plugins";

// export const authClient = createAuthClient({
//   baseURL:
//     typeof window !== "undefined"
//       ? window.location.origin
//       : "",

//   fetchOptions: {
//     credentials: "include",
//   },

//   plugins: [
//     inferAdditionalFields({
//       user: {
//         role: {
//           type: "string",
//           required: false,
//         },
//         phone: {
//           type: "string",
//           required: false,
//         },
//       },
//     }),
//   ],
// });

import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  //  baseURL:
  //   typeof window !== "undefined"
  //     ? window.location.origin
  //     : "process.env.NEXT_PUBLIC_FRONTEND_URL",
  
   baseURL: process.env.NEXT_PUBLIC_FRONTEND_URL,

  fetchOptions: {
    credentials: "include",
  },

  plugins: [
    inferAdditionalFields({
      user: {
        role: {
          type: "string",
          required: false,
        },
        phone: {
          type: "string",
          required: false,
        },
      },
    }),

    // Forward cookies when Better Auth is called
    // from a Next.js server environment.
    {
      id: "next-cookies-request",

      fetchPlugins: [
        {
          id: "next-cookies-request-plugin",
          name: "next-cookies-request-plugin",

          hooks: {
            async onRequest(ctx) {
              if (typeof window === "undefined") {
                const { cookies } = await import("next/headers");

                const cookieStore = await cookies();

                ctx.headers.set("cookie", cookieStore.toString());
              }
            },
          },
        },
      ],
    },
  ],
});