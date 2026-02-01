// src/services/tutor.service.ts

import { env } from "@/env";


const API_URL = env.API_URL

export const tutorService = {
  getAllTutors: async () => {
    
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
};
