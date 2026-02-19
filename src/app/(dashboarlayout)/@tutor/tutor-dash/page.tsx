

import { bookingServices } from "@/services/booking.services";
import { Star } from "lucide-react";

export default async function TutorDashboard() {
  // Fetch tutor statistics
  const { data, error } = await bookingServices.getalltutorokingstatus();

  // -----------------------
  // Handle banned or errors
  // -----------------------
  if (error) {
    return (
      <div className="w-11/12 mx-auto py-12 text-center">
        <h1 className="text-xl font-semibold text-red-600 mb-4">
          Access Denied
        </h1>
        <p className="text-gray-600">
          {error || "You are banned or cannot access this page."}
        </p>
      </div>
    );
  }

  const bookingStats = data?.data?.bookings;
  const reviewStats = data?.data?.reviews;

  // -----------------------
  // Render dashboard normally
  // -----------------------
  return (
    <div className="w-11/12 mx-auto py-12 space-y-10">
      <h1 className="text-xl text-center font-semibold"> Tutor Dashboard</h1>

      {/* ---------------- Booking Overview ---------------- */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Booking Statistics</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Bookings" value={bookingStats?.totalBookings || 0} color="text-blue-600" />
          <StatCard title="Confirmed" value={bookingStats?.confirmed || 0} color="text-green-600" />
          <StatCard title="Completed" value={bookingStats?.completed || 0} color="text-purple-600" />
          <StatCard title="Cancelled" value={bookingStats?.cancelled || 0} color="text-red-600" />
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
              {reviewStats?.totalReviews || 0}
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
                {reviewStats?.averageRating || 0}
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
