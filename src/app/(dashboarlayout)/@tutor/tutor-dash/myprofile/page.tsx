
export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { userServices } from "@/services/user.services";

export default async function ProfilePage() {
  const { data: session } = await userServices.getsession();

  console.log(session);

  if (!session) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-muted-foreground">
          Profile not available
        </p>
      </div>
    );
  }

  const image =
    session.user.image && session.user.image.trim() !== ""
      ? session.user.image
      : "/default-avatar.png";

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <Card>
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">
                Profile Overview
              </h1>
              <p className="text-sm text-muted-foreground">
                Manage your personal information
              </p>
            </div>

            <Button asChild variant="outline">
              <Link href="/tutor-dash/manageprofile">
                Edit Profile
              </Link>
            </Button>
          </div>

          <Separator className="my-6" />

          {/* Profile Body */}
          <div className="flex flex-col gap-8 md:flex-row">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="relative h-32 w-32 overflow-hidden rounded-full border shadow-sm">
                <Image
                  src={image}
                  alt={session.user.name || "Profile"}
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 space-y-5">
              <div>
                <p className="text-sm text-muted-foreground">
                  Full Name
                </p>
                <p className="text-lg font-medium">
                  {session.user.name}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Email Address
                </p>
                <p className="text-base font-medium">
                  {session.user.email}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Phone Number
                </p>
                <p className="text-base font-medium">
                  {session.user.phone || "Not provided"}
                </p>
              </div>

              <div>
                <p className="mb-1 text-sm text-muted-foreground">
                  Role
                </p>

                <Badge
                  variant="secondary"
                  className="px-3 py-1 text-sm"
                >
                  {session.user.role || "STUDENT"}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}