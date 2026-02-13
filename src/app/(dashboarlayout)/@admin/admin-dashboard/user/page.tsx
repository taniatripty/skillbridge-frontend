import UsersTable from "@/components/modules/user/UsersTable";
import { userServices } from "@/services/user.services";



export default async function UsersPage() {
  const {data}= await userServices.getAllUser();
  console.log(data)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Users</h1>

      <UsersTable users={data.data} />
    </div>
  );
}
