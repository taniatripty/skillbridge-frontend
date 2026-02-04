import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Roles } from "@/constrant/roles";
import { userServices } from "@/services/user.services";
import React from "react";

export default async function DashboardLayout({
  children,
  admin,
  tutor,
  student
   
 
  
}: {
    children: React.ReactNode;
admin:React.ReactNode;
tutor:React.ReactNode;
student:React.ReactNode
  
}) {
const {data}= await userServices.getsession()
//console.log(data)
  const userinfo=data.user;
  console.log(userinfo)

  return (
    <div>
      <SidebarProvider>
        <AppSidebar user={userinfo} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
        
         {
  userinfo.role === Roles.ADMIN
    ? admin
    : userinfo.role === Roles.TUTOR
    ? tutor
    : student
}

      
        </SidebarInset>
      </SidebarProvider>
    
    </div>
  );
}
