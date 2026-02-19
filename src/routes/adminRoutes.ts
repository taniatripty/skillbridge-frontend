import { Route } from "@/types/route.type";

export const adminRoutes:Route[]=[
    {
      title: "User Management",
      url:'/',
      
      items: [
        {
          title: "All statistics",
          url: "/admin-dashboard",
        },
        {
          title: "All users",
          url: "/admin-dashboard/user",
        },
        
       
        {
          title: "Status management",
          url: "/admin-dashboard/status-management",
        },
       
       
        {
          title: "create categories",
          url: "/admin-dashboard/categories",
        },
         {
          title: "Manage categories",
          url: "/admin-dashboard/getcategories",
        },
         {
          title: "All booking session",
          url: "/admin-dashboard/getallbookings",
        },


         
    ]}
]