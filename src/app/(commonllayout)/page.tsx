
import { Hero } from "@/components/hero";





import TutorSection from "@/components/modules/homepage/TutorSection";
import { userServices } from "@/services/user.services";

export default async function Home() {
  const {data}=await userServices.getsession()
console.log(data)

  return (
    <div>
      <Hero></Hero>
      <TutorSection></TutorSection>
    </div>
  );
}
