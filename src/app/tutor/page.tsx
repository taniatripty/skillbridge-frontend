import { userServices } from "@/services/user.services";
import BecomeTutorForm from "./BecomeTutorForm";



export default async function Page() {
  const session= await userServices.getsession();
 
  if (session?.data==null) {
    return <div>Please login first</div>;
  }

  const user=session.data.user

  return (
    <BecomeTutorForm
    user={{
        name: user.name,
        email: user.email,
      }}
    />
   
  
  );
}
