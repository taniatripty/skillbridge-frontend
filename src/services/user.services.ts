

import { env } from "@/env";

import { cookies } from "next/headers";
const AUTH_URL=env.AUTH_URL
const API_URL=env.API_URL


// const getsession=async function(){
//     try {
//         const cookiestore=await cookies();
//   console.log("Server cookies:", cookieStore.toString());
//   const res= await fetch(`${AUTH_URL}/get-session`,{
//     headers:{
//       cookie:cookiestore.toString()
//     },
//     cache:'no-store',
//   })
//   const session=await res.json()
//   if(session==null){
//     return{data:null,error:{message:'session is missing'}}
//   }
//  return {
//     data:session, error:null
//  }
//     } catch (err) {
//         console.error(err)
//         return{ data:null, error:{message:'something went wrong'}}
        
//     }
// }

const getsession = async function () {
  try {
    const cookieStore = await cookies();

    const cookieHeader = cookieStore.toString();

    console.log("========== SESSION DEBUG ==========");
    console.log("AUTH URL:", AUTH_URL);
    console.log("Cookies:", cookieHeader);
    console.log("Has cookie:", Boolean(cookieHeader));
    console.log("===================================");

    const res = await fetch(`${AUTH_URL}/get-session`, {
      method: "GET",
      headers: {
        Cookie: cookieHeader,
      },
      cache: "no-store",
    });

    const session = await res.json();

    console.log("Session status:", res.status);
    console.log("Session response:", session);

    if (!res.ok) {
      return {
        data: null,
        error: {
          message:
            session?.message || "Failed to get session",
        },
      };
    }

    if (!session?.user) {
      return {
        data: null,
        error: {
          message: "Session is missing",
        },
      };
    }

    return {
      data: session,
      error: null,
    };
  } catch (err) {
    console.error("Get session error:", err);

    return {
      data: null,
      error: {
        message:
          err instanceof Error
            ? err.message
            : "Something went wrong",
      },
    };
  }
};


const getAllUser=async function(){
    try {
        const cookiestore=await cookies();
  console.log(cookiestore)
  const res= await fetch(`${API_URL}/api/v1/users`,{
    headers:{
      cookie:cookiestore.toString()
    },
    cache:'no-store',
  })
  const data=await res.json()
 
 return {
    data:data, error:null
 }
    } catch (err) {
        console.error(err)
        return{ data:null, error:{message:'something went wrong'}}
        
    }
}

const getDashboardStats=async function(){
    try {
        const cookiestore=await cookies();
  console.log(cookiestore)
  const res= await fetch(`${API_URL}/api/v1/users/all`,{
    headers:{
      cookie:cookiestore.toString()
    },
    cache:'no-store',
  })
  const data=await res.json()
 
 return {
    data:data, error:null
 }
    } catch (err) {
        console.error(err)
        return{ data:null, error:{message:'something went wrong'}}
        
    }
}


export const userServices={
  getsession,
  getAllUser,
  getDashboardStats

}

