export type BookingStatus = "CONFIRMED" | "COMPLETED" | "CANCELLED";

export type DayOfWeek =
  | "MON"
  | "TUE"
  | "WED"
  | "THU"
  | "FRI"
  | "SAT"
  | "SUN";

/* Tutor info shown inside booking */
export interface BookingTutor {
  id: string;
  name: string | null;
  image: string | null;
  hourlyRate: number;
  languages: string[];
}

/* Availability slot info */
export interface BookingSlot {
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
}

/* Main Booking type */
export interface Booking {
  id: string;
  studentId: string;
  tutorProfileId: string;
  availabilitySlotId: string;

  status: BookingStatus;
  cancelledBy: "STUDENT" | "TUTOR" | null;
  price: number;

  createdAt: string;

  tutorProfile: BookingTutor;
  availabilitySlot: BookingSlot;
}
