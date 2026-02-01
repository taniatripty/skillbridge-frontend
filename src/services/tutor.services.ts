// src/services/tutor.service.ts

import { env } from "@/env";


const API_URL = env.API_URL


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
  getTutorById
}