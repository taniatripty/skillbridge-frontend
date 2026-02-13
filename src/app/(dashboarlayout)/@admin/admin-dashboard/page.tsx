
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { userServices } from "@/services/user.services";

export default async function AdminDashboard() {
  const { data } = await userServices.getDashboardStats();

 const user=data.data.user
 const bookings=data.data.bookings

  return (
    <div className="w-11/12 mx-auto py-12 space-y-10">
      <h1 className="text-xl  text-center font-extrabold">Admin Dashboard</h1>

      {/* USER STATS */}
      <section>
        <h2 className="text-xl font-semibold mt-2 mb-6">User Statistics</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard title="Total Users" value={data.data.user.totalUsers} />
          <StatCard title="Students" value={user.totalStudents} />
          <StatCard title="Tutors" value={user.totalTutors} />
        </div>
      </section>

      {/* BOOKING STATS */}
      <section>
        <h2 className="text-xl font-semibold mt-8 mb-6">Booking Statistics</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Bookings" value={bookings.totalBookings} />
          <StatCard
            title="Confirmed"
            value={bookings.confirmed}
            color="text-green-600"
          />
          <StatCard
            title="Completed"
            value={bookings.completed}
            color="text-purple-600"
          />
          <StatCard
            title="Cancelled"
            value={bookings.cancelled}
            color="text-red-600"
          />
        </div>
      </section>
    </div>
  );
}

/* 🔹 Reusable Stat Card */
function StatCard({
  title,
  value,
  color = "text-blue-600",
}: {
  title: string;
  value: number;
  color?: string;
}) {
  return (
    <Card className="shadow-md hover:shadow-lg transition">
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className={`text-3xl font-bold ${color}`}>{value}</p>
      </CardContent>
    </Card>
  );
}

