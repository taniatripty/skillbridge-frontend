
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Tutor } from "@/types/tutor";

// export default function TutorDetails({ tutor }: { tutor:Tutor }) {
//   return (
//     <div className="max-w-4xl mx-auto space-y-8">
//       {/* Header */}
//       <Card>
//         <CardContent className="p-6 flex gap-6 items-center">
//           <Image
//             src={tutor.image || "/avatar.jpg"}
//             alt={tutor.name || "Tutor"}
//             width={100}
//             height={100}
//             className="rounded-full"
//           />

//           <div>
//             <h1 className="text-2xl font-bold">{tutor.name}</h1>
//             <p className="text-muted-foreground">{tutor.email}</p>
//             <p className="mt-2 font-medium">
//               💰 ${tutor.hourlyRate} / hour
//             </p>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Info */}
//       <Card>
//         <CardContent className="p-6 space-y-4">
//           <div>
//             <h3 className="font-semibold">Education</h3>
//             <p className="text-muted-foreground">
//               {tutor.education || "Not provided"}
//             </p>
//           </div>

//           <div>
//             <h3 className="font-semibold">Experience</h3>
//             <p className="text-muted-foreground">
//               {tutor.experience
//                 ? `${tutor.experience} years`
//                 : "Not provided"}
//             </p>
//           </div>

//           <div>
//             <h3 className="font-semibold">Subjects</h3>
//             <div className="flex flex-wrap gap-2 mt-2">
//               {tutor.languages.map((subject) => (
//                 <span
//                   key={subject}
//                   className="rounded-full bg-muted px-3 py-1 text-sm"
//                 >
//                   {subject}
//                 </span>
//               ))}
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Availability */}
//       <Card>
//         <CardContent className="p-6">
//           <h3 className="text-lg font-semibold mb-4">Availability</h3>

//           {tutor.availability.length === 0 && (
//             <p className="text-muted-foreground">
//               No available slots
//             </p>
//           )}

//           <div className="grid gap-3 sm:grid-cols-2">
//             {tutor.availability.map((slot) => (
//               <div
//                 key={slot.id}
//                 className="rounded-lg border p-3 flex justify-between items-center"
//               >
//                 <div>
//                   <p className="font-medium">{slot.dayOfWeek}</p>
//                   <p className="text-sm text-muted-foreground">
//                     {slot.startTime} - {slot.endTime}
//                   </p>
//                 </div>

//                 <span
//                   className={`text-xs px-2 py-1 rounded-full ${
//                     slot.isBooked
//                       ? "bg-red-100 text-red-600"
//                       : "bg-green-100 text-green-600"
//                   }`}
//                 >
//                   {slot.isBooked ? "Booked" : "Available"}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>

//       {/* Book Button */}
//       <div className="sticky bottom-4">
//         <Button size="lg" className="w-full">
//           Book Tutor
//         </Button>
//       </div>
//     </div>
//   );
// }

"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tutor } from "@/types/tutor";
import BookingModal from "./BookingModal";


export default function TutorDetails({ tutor }: { tutor: Tutor }) {
  const [selectedSlot, setSelectedSlot] = useState<any | null>(null);
  const [open, setOpen] = useState(false);

  const availableSlots = tutor.availability.filter(
    (slot) => !slot.isBooked
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <Card>
        <CardContent className="p-6 flex gap-6 items-center">
          <Image
            src={tutor.image || "/avatar.jpg"}
            alt={tutor.name || "Tutor"}
            width={100}
            height={100}
            className="rounded-full"
          />

          <div>
            <h1 className="text-2xl font-bold">{tutor.name}</h1>
            <p className="text-muted-foreground">{tutor.email}</p>
            <p className="mt-2 font-medium">
              💰 ${tutor.hourlyRate} / hour
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Info */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <div>
            <h3 className="font-semibold">Education</h3>
            <p className="text-muted-foreground">
              {tutor.education || "Not provided"}
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Experience</h3>
            <p className="text-muted-foreground">
              {tutor.experience
                ? `${tutor.experience} years`
                : "Not provided"}
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Subjects</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {tutor.languages.map((subject) => (
                <span
                  key={subject}
                  className="rounded-full bg-muted px-3 py-1 text-sm"
                >
                  {subject}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Availability */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Availability</h3>

          {availableSlots.length === 0 && (
            <p className="text-muted-foreground">
              No available slots
            </p>
          )}

          <div className="grid gap-3 sm:grid-cols-2">
            {tutor.availability.map((slot) => {
              const isSelected = selectedSlot?.id === slot.id;

              return (
                <button
                  key={slot.id}
                  disabled={slot.isBooked}
                  onClick={() => setSelectedSlot(slot)}
                  className={`rounded-lg border p-3 text-left transition
                    ${slot.isBooked && "opacity-50 cursor-not-allowed"}
                    ${isSelected && "border-primary bg-muted"}
                  `}
                >
                  <p className="font-medium">{slot.dayOfWeek}</p>
                  <p className="text-sm text-muted-foreground">
                    {slot.startTime} - {slot.endTime}
                  </p>

                  <span
                    className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${
                      slot.isBooked
                        ? "bg-red-500/10 text-red-500"
                        : "bg-green-500/10 text-green-500"
                    }`}
                  >
                    {slot.isBooked ? "Booked" : "Available"}
                  </span>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Book Button */}
      <div className="sticky bottom-4 bg-background pt-4">
        <Button
          size="lg"
          className="w-full"
          disabled={!selectedSlot}
          onClick={() => setOpen(true)}
        >
          {selectedSlot ? "Book Tutor" : "Select a slot"}
        </Button>
      </div>

      {/* Booking Modal */}
      {open && selectedSlot && (
        <BookingModal
          tutor={tutor}
          slot={selectedSlot}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}
