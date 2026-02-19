

"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface Review {
  id: string;
  rating: number;
  comment: string;
  tutorProfile: {
    name: string;
  };
}

interface Props {
  reviews: Review[];
}

export default function TestimonialSlider({ reviews }: Props) {
  if (!reviews || reviews.length === 0) return null;

  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <section className="py-24 bg-gradient-to-b from-white via-blue-50 to-indigo-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Trusted by Students Worldwide
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Real feedback from learners who improved their skills with our expert tutors.
          </p>
        </div>

        <div className="relative">
          <motion.div
            className="flex gap-8"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 25,
              repeat: Infinity,
            }}
          >
            {duplicatedReviews.map((review, index) => (
              <div
                key={index}
                className="min-w-[340px] md:min-w-[380px] bg-white rounded-3xl shadow-lg border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300"
              >
                {/* Rating + Badge Row */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={`${
                          i < review.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-indigo-100 text-indigo-600">
                   
                  </span>
                </div>

                {/* Comment */}
                <p className="text-gray-600 leading-relaxed mb-8">
                  “{review.comment}”
                </p>

                {/* Tutor Profile Section */}
                <div className="flex items-center justify-between border-t pt-6">
                  <div className="flex items-center gap-4">
                    {/* Avatar Placeholder */}
                    {/* <div className="h-12 w-12 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 flex items-center justify-center text-white font-semibold text-lg">
                      {review.tutorProfile.name.charAt(0)}
                    </div> */}

                    <div className="flex flex-col">
                      <h4 className="font-semibold text-lg text-gray-800">
                        {review.tutorProfile.name}
                      </h4>
                      <p className="text-sm text-gray-400">
                        Expert Tutor • SkillBridge
                      </p>
                    </div>
                  </div>

                  {/* Rating Number */}
                  {/* <div className="text-right">
                    <p className="text-lg font-bold text-indigo-600">
                      {review.rating}.0
                    </p>
                    <p className="text-xs text-gray-400"></p>
                  </div> */}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
