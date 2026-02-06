import BookingCard from "@/components/modules/booking/BookingCard";
import { bookingServices } from "@/services/booking.services";
import { Booking } from "@/types/booking";




export default async function MyBookingsPage() {
  const { data } = await bookingServices.getMyBooking()
  console.log(data)

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">My Bookings</h1>

      {data?.length === 0 && (
        <p className="text-muted-foreground">
          You have no bookings yet.
        </p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {data?.data?.map((booking:Booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}

        
      </div>
    </div>
  );
}


