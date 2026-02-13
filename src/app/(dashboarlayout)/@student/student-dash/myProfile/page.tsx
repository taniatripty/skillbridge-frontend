import Image from "next/image";


import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { userServices } from "@/services/user.services";
import Link from "next/link";

export default async function ProfilePage() {
  const { data: session} = await userServices.getsession()

  if (!session) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center text-muted-foreground">
        Profile not available
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <Card className="shadow-lg">
        <CardContent className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold tracking-tight">
              Profile Overview
            </h1>

            <Button asChild variant="outline">
              <Link href="/student-dash/manageProfile">Edit Profile</Link>
            </Button>
          </div>

          <Separator className="my-6" />

          {/* Profile Body */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="relative h-32 w-32 rounded-full overflow-hidden border shadow-sm">
                <Image
                  src={session.user.image || "/avatar-placeholder.png"}
                  alt={session.user.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 space-y-5">
              <div>
                <p className="text-sm text-muted-foreground">Full Name</p>
                <p className="text-lg font-medium">{session.user.name}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Email Address</p>
                <p className="text-base font-medium">{session.user.email}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Phone Number</p>
                <p className="text-base font-medium">
                  {session.user.phone || "Not provided"}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">Role</p>
                <Badge variant="secondary" className="text-sm px-3 py-1">
                  {session.user.role}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
