// src/components/home/TutorSection.tsx

import { tutorService } from "@/services/tutor.services";
import TutorCard from "./TutorCard";

export default async function TutorSection() {
const {data} = await tutorService.getAllTutors();

  return (
    <section className="py-12 w-11/12 mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Available Tutors</h2>
        
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data?.data?.map((tutor: any) => (
          <TutorCard key={tutor.id} tutor={tutor} />
        ))}
      </div>
    </section>
  );
}
