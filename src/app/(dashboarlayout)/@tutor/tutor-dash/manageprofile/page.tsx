import ProfileForm from "@/components/modules/homepage/ProfileForm";
import { userServices } from "@/services/user.services";



export default async function ProfilePage() {
  const { data } = await userServices.getsession()
  const user = data?.user;

  if (!user) {
    return <div>Please login first</div>;
  }

  return (
    <div className="w-9/12 mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

     
      <ProfileForm user={user} />
    </div>
  );
}
