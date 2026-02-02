

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Booking } from "@/types/booking";
import { bookingServices } from "@/services/booking.services";
import { date } from "zod";
import { use } from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const {id}=await params
console.log(id)

  // 🔹 Fetch booking details by ID
  const{data:booking, error}=await bookingServices.getBookingById(id)
  console.log(booking)

  if (!booking) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold">Booking Not Found</h1>
        <p className="text-muted-foreground mt-2">
          We could not find a booking with this ID.
        </p>
      </div>
    );
  }

  const { tutorProfile, availabilitySlot, price, status, createdAt } = booking;

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6">
      <h1 className="text-2xl font-bold">Booking Details</h1>

      {/* Tutor Info */}
      <Card>
        <CardContent className="flex gap-4 items-center p-6">
          <Image
            src={tutorProfile.image || "/avatar.jpg"}
            alt={tutorProfile.name || "Tutor"}
            width={80}
            height={80}
            className="rounded-full"
          />
          <div>
            <h2 className="text-xl font-semibold">{tutorProfile.name}</h2>
            <p className="text-sm text-muted-foreground">
              ${tutorProfile.hourlyRate}/hour
            </p>
            <div className="flex flex-wrap gap-2 mt-1">
              {tutorProfile.languages.map((lang:any) => (
                <span
                  key={lang}
                  className="rounded-full  px-3 py-1 text-xs"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Booking Info */}
      <Card>
        <CardContent className="p-6 space-y-3">
          <div>
            <h3 className="font-semibold">Slot</h3>
            <p className="text-muted-foreground">
              {availabilitySlot.dayOfWeek} {availabilitySlot.startTime} -{" "}
              {availabilitySlot.endTime}
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Price</h3>
            <p className="text-muted-foreground">${price}</p>
          </div>

          <div>
            <h3 className="font-semibold">Status</h3>
            <p className="text-muted-foreground">{status}</p>
          </div>

          <div>
            <h3 className="font-semibold">Booked At</h3>
            <p className="text-muted-foreground">
              {new Date(createdAt).toLocaleString()}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Action Button */}
      <div className="mt-4">
        <Button className="w-full" disabled={status !== "CONFIRMED"}>
          {status === "CONFIRMED" ? "Start Booking" : "Booking Closed"}
        </Button>
      </div>
    </div>
  );
}
