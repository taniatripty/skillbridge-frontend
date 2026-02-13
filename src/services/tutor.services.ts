// src/services/tutor.service.ts

import { env } from "@/env";


const API_URL = env.API_URL

// src/services/tutor.services.ts


//  const getAllTutor= async ({
//     rating,
//     hourlyRate,
//     languages = [],
//   }: {
//     rating?: number;
//     hourlyRate?: number;
//     languages?: string[];
//   }) => {
//     try {
//       const params = new URLSearchParams();

//       if (rating !== undefined)
//         params.append("rating", rating.toString());

//       if (hourlyRate !== undefined)
//         params.append("hourlyRate", hourlyRate.toString());

//       if (languages.length > 0)
//         params.append("languages", languages.join(","));

//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/tutor?${params.toString()}`,
//         { cache: "no-store" }
//       );

//       const data = await res.json();
//       return { data: data.data, error: null };
//     } catch (error) {
//       return { data: null, error };
//     }
//   }


// const getAllTutor = async (
//   {
//     rating,
//     hourlyRate,
//     languages = [],
//   }: {
//     rating?: number;
//     hourlyRate?: number;
//     languages?: string[];
//   } = {} // ✅ IMPORTANT
// ) => {
//   try {
//     const params = new URLSearchParams();

//     if (rating !== undefined)
//       params.append("rating", rating.toString());

//     if (hourlyRate !== undefined)
//       params.append("hourlyRate", hourlyRate.toString());

//     if (languages.length > 0)
//       params.append("languages", languages.join(","));

//     const res = await fetch(
//       `${API_URL}/api/tutor?${params.toString()}`,
//       { cache: "no-store" }
//     );

//     const data = await res.json();

//     return { data: data, error: null };
//   } catch (error) {
//     return { data: null, error };
//   }
// };

 const getAllTutor=async () => {
    
    try {
           
            const res=await fetch(`${API_URL}/api/tutor`,
              // {next:{revalidate:10}})
            { cache: "no-store"}
            )

            const data=await res.json();
            return{
                data:data, error:null
            }
            
        } catch (err) {
        console.error(err)
        return{ data:null, error:{message:'something went wrong'}}
        
    }
    
  }


  const getmostpopularTutor=async () => {
    
    try {
           
            const res=await fetch(`${API_URL}/api/tutor/popular`,
              // {next:{revalidate:10}})
            { cache: "no-store"}
            )

            const data=await res.json();
            return{
                data:data, error:null
            }
            
        } catch (err) {
        console.error(err)
        return{ data:null, error:{message:'something went wrong'}}
        
    }
    
  }



   const  getTutorById= async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/api/tutor/${id}`, {
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok) {
        return { data: null, error: data };
      }

      return { data: data.data, error: null };
    } catch (error) {
      return {
        data: null,
        error: { message: "Failed to fetch tutor" },
      };
    }
  }

export const tutorServices={
  getAllTutor,
  getTutorById,
  getmostpopularTutor
}