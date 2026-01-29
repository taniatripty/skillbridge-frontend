
import { Hero } from "@/components/hero";
import { userServices } from "@/services/user.services";


export default async function Home() {
  const session=await userServices.getsession()
  console.log(session)
  
  return (
   <div>
  
   <Hero></Hero>
   </div>
  );
}
