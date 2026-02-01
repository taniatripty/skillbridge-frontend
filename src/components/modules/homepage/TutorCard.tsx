// src/components/tutor/TutorCard.tsx
import { Tutor } from "@/types/tutor";
import Image from "next/image";
import Link from "next/link";



export default function TutorCard({ tutor }: { tutor: Tutor }) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm hover:shadow-md transition">
      {/* Image */}
      <div className="flex items-center gap-4">
        <Image
          src={tutor.image || "/avatar.jpg"}
          alt={tutor.name || "Tutor"}
          width={60}
          height={60}
          className="rounded-full object-cover"
        />

        <div>
          <h3 className="text-lg font-semibold">{tutor.name}</h3>
          <p className="text-sm text-gray-500">${tutor.hourlyRate}/hour</p>
        </div>
      </div>

      {/* Languages */}
      <div className="mt-4">
        <p className="text-sm font-medium">Languages</p>
        <div className="flex flex-wrap gap-2 mt-1">
          {tutor.languages.map((lang: string) => (
            <span
              key={lang}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs"
            >
              {lang}
            </span>
          ))}
        </div>
      </div>

      {/* Availability preview */}
      <div className="mt-4">
        <p className="text-sm font-medium">Available</p>
        <p className="text-xs text-gray-600">
          {tutor.availability.length > 0
            ? `${tutor.availability.length} slots available`
            : "No slots available"}
        </p>
      </div>

      {/* Details button */}
      <Link
        href={`/tutors/${tutor.id}`}
        className="mt-4 block text-center rounded-lg bg-black px-4 py-2 text-sm text-white hover:bg-gray-800"
      >
        View Details
      </Link>
    </div>
  );
}
