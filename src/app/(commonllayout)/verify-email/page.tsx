"use client"; 

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function VerifyEmailPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/student-dash"); 
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">
         Email verified successfully!
      </h2>
      <p>You are now logged in. Redirecting to your dashboard...</p>
    </div>
  );
}
