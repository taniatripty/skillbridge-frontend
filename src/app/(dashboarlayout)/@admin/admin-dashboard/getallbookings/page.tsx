"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Booking = {
  id: string;
  status: string;
  createdAt: string;

  tutorProfile: {
    name: string;
    email: string;
    hourlyRate: number;
  };
  availabilitySlot: {
    dayOfWeek: string;
    startTime: string;
    endTime: string;
  };
};

export default function AllBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/bookings/all", {
          credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch bookings");
        }

        setBookings(data.data);
      } catch (error: any) {
        toast.error("Failed to load bookings", {
          description: error.message,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <Card className="m-6">
      <CardHeader>
        <CardTitle>All Bookings</CardTitle>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="animate-spin h-6 w-6" />
          </div>
        ) : bookings.length === 0 ? (
          <p className="text-center text-muted-foreground">No bookings found</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>serial</TableCell>
                <TableHead>Tutor name</TableHead>
                <TableHead>Tutor email</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Booked At</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {bookings.map((booking, index) => (
                <TableRow key={booking.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {booking.tutorProfile.name}
                      </p>
                    </div>
                  </TableCell>

                  <TableCell>{booking.tutorProfile.email}</TableCell>

                  <TableCell>
                    <p>{booking.availabilitySlot.dayOfWeek}</p>
                    <p className="text-sm text-muted-foreground">
                      {booking.availabilitySlot.startTime} –{" "}
                      {booking.availabilitySlot.endTime}
                    </p>
                  </TableCell>

                  <TableCell>৳{booking.tutorProfile.hourlyRate}</TableCell>

                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        booking.status === "CONFIRMED"
                          ? "bg-green-600 "
                          : booking.status === "CANCELLED"
                            ? "bg-red-600 "
                            : ""
                      }
                    >
                      {booking.status}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
