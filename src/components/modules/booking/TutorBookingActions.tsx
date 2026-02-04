"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function TutorBookingActions({
  booking,
}: {
  booking: any;
}) {
  const router = useRouter();

  const updateStatus = async (status: "CANCELLED" | "COMPLETED") => {
    try {
      await fetch(`http://localhost:5000/api/bookings/${booking.id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
         credentials: "include",
        body: JSON.stringify({ status }),
      });

      toast.success(`Booking ${status.toLowerCase()}`);
      router.refresh();
    } catch (error) {
      toast.error("Action failed");
    }
  };

  if (booking.status !== "CONFIRMED") {
    return (
      <span className="text-muted-foreground text-sm">
        No actions
      </span>
    );
  }

  return (
    <div className="flex justify-end gap-2">
      <Button
        size="sm"
        variant="outline"
        onClick={() => updateStatus("CANCELLED")}
      >
        Cancel
      </Button>

      <Button
        size="sm"
        onClick={() => updateStatus("COMPLETED")}
      >
        Complete
      </Button>
    </div>
  );
}
