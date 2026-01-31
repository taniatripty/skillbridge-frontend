"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type DayOfWeek = "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";

type Slot = {
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
};

export default function UpdateAvailability() {
  const [slots, setSlots] = useState<Slot[]>([
    { dayOfWeek: "MON", startTime: "", endTime: "" },
  ]);

  const [loading, setLoading] = useState(false);

  const addSlot = () => {
    setSlots([...slots, { dayOfWeek: "MON", startTime: "", endTime: "" }]);
  };

  const removeSlot = (index: number) => {
    setSlots(slots.filter((_, i) => i !== index));
  };

  const updateSlot = (index: number, key: keyof Slot, value: string) => {
    const updated = [...slots];
    updated[index] = { ...updated[index], [key]: value };
    setSlots(updated);
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/tutor/availability", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ availability: slots }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      alert("Availability updated successfully");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Update Availability</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {slots.map((slot, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end"
          >
            {/* Day */}
            <Select
              value={slot.dayOfWeek}
              onValueChange={(v) =>
                updateSlot(index, "dayOfWeek", v)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Day" />
              </SelectTrigger>
              <SelectContent>
                {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day) => (
                  <SelectItem key={day} value={day}>
                    {day}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Start */}
            <Input
              type="time"
              value={slot.startTime}
              onChange={(e) =>
                updateSlot(index, "startTime", e.target.value)
              }
            />

            {/* End */}
            <Input
              type="time"
              value={slot.endTime}
              onChange={(e) =>
                updateSlot(index, "endTime", e.target.value)
              }
            />

            {/* Remove */}
            <Button
              variant="destructive"
              onClick={() => removeSlot(index)}
              disabled={slots.length === 1}
            >
              Remove
            </Button>
          </div>
        ))}

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={addSlot}>
            + Add Slot
          </Button>

          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : "Save Availability"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
