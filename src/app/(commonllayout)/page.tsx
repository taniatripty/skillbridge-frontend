
import { Hero } from "@/components/hero";
import Mostpopulartutor from "@/components/modules/homepage/mostpopulartutor";
import StatisticsSection from "@/components/modules/homepage/statisticsSection";
import TestimonialSection from "@/components/modules/homepage/testimonialSection";





import TutorSection from "@/components/modules/homepage/TutorSection";
import { userServices } from "@/services/user.services";

export default async function Home() {
  const {data}=await userServices.getsession()
console.log(data)

  return (
    <div>
      <Hero></Hero>
      <TutorSection></TutorSection>
      <Mostpopulartutor></Mostpopulartutor>
      <TestimonialSection></TestimonialSection>
      <StatisticsSection></StatisticsSection>
    </div>
  );
}
