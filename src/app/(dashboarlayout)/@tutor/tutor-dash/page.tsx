// import { bookingServices } from '@/services/booking.services'


// export default async function TutorDashboard() {
//   const {data}=await bookingServices.getalltutorokingstatus()
  
//   return (
//      <div className="w-11/12 mx-auto py-12">
//       <h1 className="text-3xl font-bold mb-8">My Booking Overview</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {/* Total Bookings */}
//         <div className="p-6 bg-white shadow-lg rounded-xl border border-gray-200 flex flex-col items-center justify-center">
//           <p className="text-gray-500 text-sm font-medium mb-2">Total Bookings</p>
//           <p className="text-3xl font-bold text-blue-600">{data.data.bookings.totalBookings}</p>
//         </div>

//         {/* Confirmed Bookings */}
//         <div className="p-6 bg-white shadow-lg rounded-xl border border-gray-200 flex flex-col items-center justify-center">
//           <p className="text-gray-500 text-sm font-medium mb-2">Confirmed</p>
//           <p className="text-3xl font-bold text-green-600">{data.data.bookings.confirmed}</p>
//         </div>

//         {/* Completed Bookings */}
//         <div className="p-6 bg-white shadow-lg rounded-xl border border-gray-200 flex flex-col items-center justify-center">
//           <p className="text-gray-500 text-sm font-medium mb-2">Completed</p>
//           <p className="text-3xl font-bold text-purple-600">{data.data.bookings.completed}</p>
//         </div>

//         {/* Cancelled Bookings */}
//         <div className="p-6 bg-white shadow-lg rounded-xl border border-gray-200 flex flex-col items-center justify-center">
//           <p className="text-gray-500 text-sm font-medium mb-2">Cancelled</p>
//           <p className="text-3xl font-bold text-red-600">{data.data.bookings.cancelled}</p>
//         </div>
//       </div>
//     </div>
//   )
// }


import { bookingServices } from "@/services/booking.services";
import { Star } from "lucide-react";

export default async function TutorDashboard() {
  const { data } = await bookingServices.getalltutorokingstatus();

  const bookingStats = data?.data?.bookings;
  const reviewStats = data?.data?.reviews;

  return (
    <div className="w-11/12 mx-auto py-12 space-y-10">
      <h1 className="text-3xl font-bold"></h1>

      {/* ---------------- Booking Overview ---------------- */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Booking Statistics</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Bookings" value={bookingStats.totalBookings} color="text-blue-600" />
          <StatCard title="Confirmed" value={bookingStats.confirmed} color="text-green-600" />
          <StatCard title="Completed" value={bookingStats.completed} color="text-purple-600" />
          <StatCard title="Cancelled" value={bookingStats.cancelled} color="text-red-600" />
        </div>
      </section>

      {/* ---------------- Review Overview ---------------- */}
      <section>
        <h2 className="text-xl mt-2 font-semibold mb-4">Review Statistics</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
          {/* Total Reviews */}
          <div className="p-6 bg-white shadow-lg rounded-xl border border-gray-200 flex flex-col items-center justify-center">
            <p className="text-gray-500 text-sm font-medium mb-2">
              Total Reviews
            </p>
            <p className="text-3xl font-bold text-indigo-600">
              {reviewStats.totalReviews}
            </p>
          </div>

          {/* Average Rating */}
          <div className="p-6 bg-white shadow-lg rounded-xl border border-gray-200 flex flex-col items-center justify-center">
            <p className="text-gray-500 text-sm font-medium mb-2">
              Average Rating
            </p>

            <div className="flex items-center gap-2">
              <Star className="size-6 text-yellow-400 fill-yellow-400" />
              <p className="text-3xl font-bold text-yellow-600">
                {reviewStats.averageRating}
              </p>
              <span className="text-sm text-muted-foreground">/ 5</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------------- Reusable Card ---------------- */

function StatCard({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) {
  return (
    <div className="p-6 bg-white shadow-lg rounded-xl border border-gray-200 flex flex-col items-center justify-center">
      <p className="text-gray-500 text-sm font-medium mb-2">{title}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );
}
