
"use client";

import { useEffect, useState } from "react";
import TutorCard from "./TutorCard";

type Tutor = any;

export default function TutorSearch() {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [rating, setRating] = useState<number | undefined>();
  const [hourlyRate, setHourlyRate] = useState<number | undefined>();
  const [languages, setLanguages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Convert to Title Case (to match DB format: "Math")
  const toTitleCase = (text: string) =>
    text
      .trim()
      .toLowerCase()
      .split(" ")
      .map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(" ");

  // Initial load
  useEffect(() => {
    searchTutors();
  }, []);

  const searchTutors = async () => {
    setLoading(true);

    const params = new URLSearchParams();

    if (rating !== undefined) {
      params.append("rating", String(rating));
    }

    if (hourlyRate !== undefined) {
      params.append("hourlyRate", String(hourlyRate));
    }

    if (languages.length > 0) {
      const normalizedLanguages = languages.map((l) =>
        toTitleCase(l)
      );

      params.append("languages", normalizedLanguages.join(","));
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/tutor?${params.toString()}`,
        { cache: "no-store" }
      );

      const data = await res.json();
      setTutors(data.data || []);
    } catch (error) {
      console.error("Failed to fetch tutors:", error);
      setTutors([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <h1 className="text-center text-2xl font-bold mt-5 mb-5">All Available Tutors</h1>
      {/* 🔍 Search Controls */}
      <div className="mb-6 mt-3 flex flex-wrap gap-3 items-center">
        {/* Rating */}
        <input
          type="number"
          min={1}
          max={5}
          placeholder="Min rating (1–5)"
          className="border rounded px-3 py-2 text-sm w-44"
          onChange={(e) =>
            setRating(e.target.value ? Number(e.target.value) : undefined)
          }
        />

        {/* Price */}
        <input
          type="number"
          placeholder="Hourly rate"
          className="border rounded px-3 py-2 text-sm w-44"
          onChange={(e) =>
            setHourlyRate(
              e.target.value ? Number(e.target.value) : undefined
            )
          }
        />

        {/* Languages */}
        <input
          type="text"
          placeholder="Languages (Math, Physics)"
          className="border rounded px-3 py-2 text-sm w-64"
          onChange={(e) =>
            setLanguages(
              e.target.value
                .split(",")
                .map((l) => l.trim())
                .filter(Boolean)
            )
          }
        />

        {/* Search Button */}
        <button
          onClick={searchTutors}
          className="rounded-lg border px-4 py-2 text-sm hover:bg-muted transition"
        >
          Search Tutors
        </button>
      </div>

      {/* 📋 Results */}
      {loading ? (
        <p className="text-sm text-gray-500">Loading...</p>
      ) : tutors.length === 0 ? (
        <p className="text-sm text-gray-500">No tutors found</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tutors.map((tutor) => (
            <TutorCard key={tutor.id} tutor={tutor} />
          ))}
        </div>
      )}
    </>
  );
}
