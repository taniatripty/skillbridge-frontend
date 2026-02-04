import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/navbar";
import React from "react";

export default function ComonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>
     <Navbar></Navbar>
    {children}
     <Footer></Footer>
    </div>;
}
