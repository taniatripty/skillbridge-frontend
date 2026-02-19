

import {
  Users,
  GraduationCap,
  CalendarCheck,
  BookOpenCheck,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { userServices } from "@/services/user.services";

export default async function PlatformStats() {
  const { data } = await userServices.getDashboardStats();

  const user = data.data.user;
  const bookings = data.data.bookings;

  return (
    <section className="w-11/12 mx-auto py-20 space-y-16">
      {/*  Section Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold tracking-tight">
          Our Platform in Numbers
        </h2>
       
      </div>

      {/*  Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard
          title="Total Students"
          value={user.totalStudents}
          icon={<GraduationCap size={26} />}
        />

        <StatCard
          title="Expert Tutors"
          value={user.totalTutors}
          icon={<Users size={26} />}
        />

        <StatCard
          title="Total Bookings"
          value={bookings.totalBookings}
          icon={<CalendarCheck size={26} />}
        />

        <StatCard
          title="Completed Sessions"
          value={bookings.completed}
          icon={<BookOpenCheck size={26} />}
        />
      </div>
    </section>
  );
}

/*  Modern Stat Card */
function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <Card className="group relative overflow-hidden rounded-2xl border border-border/40 bg-background shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <CardContent className="p-6 flex items-center justify-between">
        {/* Text Section */}
        <div>
          <p className="text-sm text-muted-foreground mb-2">
            {title}
          </p>
          <h3 className="text-4xl font-bold tracking-tight">
            {value}
          </h3>
        </div>

        {/* Adaptive Icon Container */}
        <div className="p-4 rounded-xl bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary transition-colors duration-300">
          {icon}
        </div>
      </CardContent>

      {/* Subtle Hover Glow */}
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </Card>
  );
}

