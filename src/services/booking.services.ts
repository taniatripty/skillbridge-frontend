// import { env } from "@/env";

// const API_URL=env.API_URL

// const getMybooking=async () => {

//     try {

//             const res=await fetch(`${API_URL}/api/bookings`,
//               {next:{revalidate:10}})
//             // { cache: "no-store"}
//             // )

//             const data=await res.json();
//             return{
//                 data:data, error:null
//             }

//         } catch (err) {
//         console.error(err)
//         return{ data:null, error:{message:'something went wrong'}}

//     }

//   }

//   export const bookingservices={
// getMybooking
//   }

import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

const getMyBooking = async () => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/api/bookings`, {
      headers: {
        cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch bookings");
    }

    const data = await res.json();

    return {
      data: data,
      error: null,
    };
  } catch (error: any) {
    console.error(error);
    return {
      data: [],
      error: error.message,
    };
  }
};

const getBookingById = async (id: string) => {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/bookings/${id}`, {
      headers: {
        cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });
    const data = await res.json();
    console.log(data);

    if (!res.ok)
      return { data: null, error: data.message || "Failed to fetch booking" };
    return { data: data.data, error: null };
  } catch (err) {
    console.log(err);
    return { data: null, error: { message: "Something went wrong" } };
  }
};

export const bookingServices = {
  getMyBooking,
  getBookingById,
};
