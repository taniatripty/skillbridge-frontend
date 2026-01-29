

import { env } from "@/env";
import { error } from "console";
import { cookies } from "next/headers";
const AUTH_URL=env.AUTH_URL

export const userServices={
 getsession:async function(){
    try {
        const cookiestore=await cookies();
  console.log(cookiestore)
  const res= await fetch(`${AUTH_URL}/get-session`,{
    headers:{
      cookie:cookiestore.toString()
    },
    cache:'no-store',
  })
  const session=await res.json()
  if(session==null){
    return{data:null,error:{message:'session is missing'}}
  }
 return {
    data:session, error:null
 }
    } catch (err) {
        console.error(err)
        return{ data:null, error:{message:'something went wrong'}}
        
    }
}
}



