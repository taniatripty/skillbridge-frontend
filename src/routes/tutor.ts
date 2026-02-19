import { Route } from "@/types/route.type";


export const tutorRoutes:Route[]=[
    {
      title: "Manage all activity",
        url:'/',
      
      items: [
         {
          title: "All Statistics",
          url: "/tutor-dash",
        },
        {
          title: "Set Availibility",
          url: "/tutor-dash/updateavailability",
        },
        {
          title: "View teaching session",
          url: "/tutor-dash/tutorbooking",
        },
        {
          title: "Manage profile",
          url: "/tutor-dash/manageprofile",
        },
        {
          title: "See all review",
          url: "/tutor-dash/myreviews",
        },
         {
          title: "My profile",
          url: "/tutor-dash/myprofile",
        },


        
         
    ]}
]