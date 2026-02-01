
// import TutorDetails from "@/components/modules/homepage/TutorDetails";
// import { tutorServices } from "@/services/tutor.services";


// interface PageProps {
//   params: {
//     id: string;
//   };
// }

// export default async function TutorDetailsPage({ params }: PageProps) {
//   const { data, error } = await tutorServices.getTutorById();
//   console.log(data)

//   if (error || !data) {
//     return <div className="p-10 text-center">Tutor not found</div>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-10">
//       <TutorDetails tutor={data} />
//     </div>
//   );
// }



import TutorDetails from "@/components/modules/homepage/TutorDetails";
import { tutorServices } from "@/services/tutor.services";


export default async function TutorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: tutor, error } = await tutorServices.getTutorById(id);

  // ✅ Tutor not found UI
  if (error || !tutor) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold">Tutor not found 😕</h2>
          <p className="text-muted-foreground">
            The tutor you are looking for does not exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <TutorDetails tutor={tutor} />
    </div>
  );
}
