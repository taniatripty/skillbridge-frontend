import { categoryServices } from "@/services/categories.services";


export default async function SubjectsTable() {
  const { data } = await categoryServices.getAllCategories();

  return (
    <div className="w-11/12 mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">All Subjects</h1>

      <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
        <table className="table w-full">
          <thead className="">
            <tr>
              <th>#</th>
              <th>Subject Name</th>
              <th>Created At</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-6 text-gray-500">
                  No subjects found
                </td>
              </tr>
            )}

            {data.map((category: any, index: number) => (
              <tr key={category.id} className="hover">
                <td>{index + 1}</td>
                <td className="font-semibold">{category.name}</td>
                <td>
                  {new Date(category.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
