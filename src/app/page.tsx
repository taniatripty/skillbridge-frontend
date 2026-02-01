
import { Hero } from "@/components/hero";
import TutorCard from "@/components/modules/homepage/TutorCard";

import { tutorService } from "@/services/tutor.services";
import { Tutor } from "../types/tutor";
import TutorSection from "@/components/modules/homepage/TutorSection";

export default async function Home() {


  return (
    <div>
      <Hero></Hero>
      <TutorSection></TutorSection>
    </div>
  );
}
