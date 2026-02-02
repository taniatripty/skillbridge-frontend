"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Booking } from "@/types/booking";
import Link from "next/link";
import { bookingServices } from "@/services/booking.services";
import { useRouter } from "next/navigation";


export default function BookingCard({ booking }: { booking: Booking }) {
  const { tutorProfile, availabilitySlot } = booking;
 const router = useRouter();
  const handleCancel = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${booking.id}`,
    {
      method: "DELETE",
      credentials: "include", // 👈 send cookies automatically
    }
  );

  if (res.ok) {
     router.refresh()
  }
};

  return (
    <Card className="border-muted bg-background">
      <CardContent className="p-5 space-y-4">
        {/* Tutor Info */}
        <div className="flex items-center gap-4">
          <Image
            src={tutorProfile.image || "/avatar.jpg"}
            alt={tutorProfile.name || "Tutor"}
            width={56}
            height={56}
            className="rounded-full object-cover"
          />

          <div className="flex-1">
            <h3 className="font-semibold text-lg">
              {tutorProfile.name || "Unknown Tutor"}
            </h3>

            <p className="text-sm text-muted-foreground">
              ৳ {tutorProfile.hourlyRate} / hour
            </p>
          </div>

          <Badge
            variant={
              booking.status === "CONFIRMED"
                ? "default"
                : booking.status === "COMPLETED"
                ? "secondary"
                : "destructive"
            }
          >
            {booking.status}
          </Badge>
        </div>

        {/* Subjects */}
        <div>
          <p className="text-sm font-medium mb-1">Subjects</p>
          <div className="flex flex-wrap gap-2">
            {tutorProfile.languages.map((subject) => (
              <span
                key={subject}
                className="rounded-full bg-muted px-3 py-1 text-xs"
              >
                {subject}
              </span>
            ))}
          </div>
        </div>

        {/* Slot Info */}
        <div className="flex justify-between items-center text-sm">
          <div>
            <p className="font-medium">{availabilitySlot.dayOfWeek}</p>
            <p className="text-muted-foreground">
              {availabilitySlot.startTime} – {availabilitySlot.endTime}
            </p>
          </div>

          <p className="font-semibold">৳ {booking.price}</p>
        </div>

        {/* Actions */}
        {booking.status === "CONFIRMED" && (
          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="flex-1"  onClick={handleCancel}>
              Cancel
            </Button>

            <Link
        href={`/mybooking/${booking.id}`}
        className=" block text-center rounded-lg bg-black px-4 py-2 text-sm text-white hover:bg-gray-800"
      >
        View Details
      </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
