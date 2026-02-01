"use client";

import { useState } from "react";

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
        credentials: "include", // 🔥 session comes automatically
        body: JSON.stringify({
          tutorProfileId: tutor.id,
          availabilitySlotId: slot.id,
          price: tutor.hourlyRate,
        }),
      });

      const result = await res.json();
      console.log(result)

      if (!res.ok) {
        throw new Error(result.message);
      }

      alert("Booking confirmed ✅");
      onClose();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="w-full max-w-md rounded-xl bg-background p-6 space-y-4">
        <h2 className="text-xl font-semibold">Confirm Booking</h2>

        {/* Tutor Info */}
        <div className="rounded-lg border p-3">
          <p className="font-medium">{tutor.name}</p>
          <p className="text-sm text-muted-foreground">
            {slot.dayOfWeek} • {slot.startTime} - {slot.endTime}
          </p>
        </div>

        {/* Price */}
        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span>${tutor.hourlyRate}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="w-full rounded-lg border py-2"
          >
            Cancel
          </button>

          <button
            onClick={handleBooking}
            disabled={loading}
            className="w-full rounded-lg bg-black text-white py-2 hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? "Booking..." : "Book Now"}
          </button>
        </div>
      </div>
    </div>
  );
}
