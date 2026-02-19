
import { tutorServices } from "@/services/tutor.services";

import PopularTutorCard from "./populartutorCard";

export default async function Mostpopulartutor() {
const {data} = await tutorServices.getmostpopularTutor()
console.log(data)

  return (
    <section className="py-12 w-11/12 mx-auto">
      <div className="mb-6 flex items-center justify-center">
        <h2 className="text-2xl text-center font-bold">Most Popular Tutor</h2>
        
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data?.data?.map((tutor: any) => (
          <PopularTutorCard key={tutor.id} tutor={tutor} />
        ))}
      </div>
    </section>
  );
}
