import { Tutor } from "@/types/tutor";
import Image from "next/image";
import Link from "next/link";

export default function PopularTutorCard({ tutor }: { tutor: Tutor }) {
  return (
    <div className="relative rounded-2xl border border-yellow-400 bg-yellow-50 p-6 shadow-lg hover:shadow-2xl transition-all duration-300">
      {/* Ribbon for popularity */}
      <div className="absolute -top-3 -right-3 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-tr-xl rounded-bl-xl">
        POPULAR
      </div>

      {/* Image & Info */}
      <div className="flex items-center gap-4">
        <Image
          src={tutor.image || "/avatar.jpg"}
          alt={tutor.name || "Tutor"}
          width={70}
          height={70}
          className="rounded-full object-cover border-2 border-yellow-400"
        />
        <div className="flex-1">
          <h3 className="text-lg font-bold">{tutor.name}</h3>
          <p className="text-sm text-gray-700">৳ {tutor.hourlyRate}/hour</p>
          {tutor.reviews.length > 0 ? (
            <p className="text-sm font-semibold text-yellow-700 mt-1">
              ⭐ {tutor.averageRating.toFixed(1)}{" "}
              <span className="text-xs text-gray-600">
                ({tutor.reviews.length} reviews)
              </span>
            </p>
          ) : (
            <p className="text-xs text-gray-500 mt-1">No reviews yet</p>
          )}
        </div>
      </div>

      {/* Languages */}
      <div className="mt-4">
        <p className="text-sm text-gray-500 font-medium">Languages</p>
        <div className="flex flex-wrap gap-2 mt-1">
          {tutor.languages.map((lang: string) => (
            <span
              key={lang}
              className="rounded-full bg-yellow-200 px-3 py-1 text-xs font-medium"
            >
              {lang}
            </span>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="mt-4">
        <p className="text-sm font-medium">Availability</p>
        <p className="text-xs text-gray-700 mt-1">
          {tutor.availability.length > 0
            ? `${tutor.availability.length} slots available`
            : "No slots available"}
        </p>
      </div>

      {/* View Details Button */}
      <Link
        href={`/tutor/${tutor.id}`}
        className="mt-5 block w-full text-center rounded-lg bg-yellow-400 px-4 py-2 text-sm font-semibold text-white hover:bg-yellow-500"
      >
        View Profile
      </Link>
    </div>
  );
}
