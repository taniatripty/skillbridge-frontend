

"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function BookingModal({
  tutor,
  slot,
  onClose,
}: {
  tutor: any;
  slot: any;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          tutorProfileId: tutor.id,
          availabilitySlotId: slot.id,
          price: tutor.hourlyRate,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      //  Success Toast
      toast.success("Booking confirmed successfully ");

      onClose();
    } catch (err: any) {
      //  Error Toast
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-full max-w-md rounded-2xl bg-background p-6 space-y-6 shadow-2xl border">
        <h2 className="text-xl font-semibold">Confirm Booking</h2>

        {/* Tutor Info */}
        <div className="rounded-lg border p-4 space-y-1">
          <p className="font-medium">{tutor.name}</p>
          <p className="text-sm text-muted-foreground">
            {slot.dayOfWeek} • {slot.startTime} - {slot.endTime}
          </p>
        </div>

        {/* Price */}
        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>${tutor.hourlyRate}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="w-full rounded-lg border py-2 hover:bg-muted transition"
          >
            Cancel
          </button>

          <button
            onClick={handleBooking}
            disabled={loading}
            className="w-full rounded-lg bg-primary text-white py-2 hover:opacity-90 disabled:opacity-50 transition"
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
        </div>
      </div>
    </div>
  );
}
