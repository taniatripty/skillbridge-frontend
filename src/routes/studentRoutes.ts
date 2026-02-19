import { Route } from "@/types/route.type";


export const studentRoutes:Route[]=[
    {
      title: "Create and manage profile",
      url:'/',
      
      items: [
         {
          title: "All Statistics",
          url: "/student-dash",
        },
        {
          title: "See all bookings",
          url: "/student-dash/bookings",
        },
        {
          title: "Manage profile",
          url: "/student-dash/manageProfile",
        },
         {
          title: "My profile",
          url: "/student-dash/myProfile",
        }
         
    ]}
]