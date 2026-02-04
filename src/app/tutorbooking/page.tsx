import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import TutorBookingActions from "@/components/modules/booking/TutorBookingActions";
import { bookingServices } from "@/services/booking.services";


export default async function TutorBookingsPage() {
  const { data } = await bookingServices.getTutorBookings()
  console.log(data)

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">My Booking Sessions</h1>

      {data?.length === 0 && (
        <p className="text-muted-foreground">
          No bookings found.
        </p>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Day</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.data?.map((booking: any) => (
            <TableRow key={booking.id}>
              <TableCell className="font-medium">
                {booking.availabilitySlot.dayOfWeek}
              </TableCell>

              <TableCell>
                {booking.availabilitySlot.startTime} –{" "}
                {booking.availabilitySlot.endTime}
              </TableCell>

              <TableCell>
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
              </TableCell>

              <TableCell className="text-right">
                <TutorBookingActions booking={booking} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
