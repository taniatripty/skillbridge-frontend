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

   

    const data = await res.json();
     if (!res.ok)
      return { data: null, error: data.message || "Failed to fetch booking" };

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

// const getMyBookingstatus = async () => {
//   try {
//     const cookieStore = await cookies();

//     const res = await fetch(`${API_URL}/api/bookings/my/status`, {
//       headers: {
//         cookie: cookieStore.toString(),
//       },
//       cache: "no-store",
//     });

   

//     const data = await res.json();
//      if (!res.ok)
//       return { data: null, error: data.message || "Failed to fetch booking" };

//     return {
//       data: data,
//       error: null,
//     };
//   } catch (error: any) {
//     console.error(error);
//     return {
//       data: [],
//       error: error.message,
//     };
//   }
// };


 const getMyBookingstatus = async () => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/api/bookings/my/status`, {
      headers: {
        cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    const json = await res.json();

    // Match backend shape
    if (!res.ok) {
      return {
        success: false,
        data: null,
        message: json.message || "Failed to fetch booking",
      };
    }

    return {
      success: true,
      data: json.data, // this is your stats object
      message: null,
    };
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      data: null,
      message: error.message || "Something went wrong",
    };
  }
};
const getallBookings = async () => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/api/bookings/all`, {
      headers: {
        cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

   

    const data = await res.json();
     if (!res.ok)
      return { data: null, error: data.message || "Failed to fetch booking" };

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

const getTutorBookings = async () => {
   const cookieStore = await cookies();
  const res = await fetch(`${API_URL}/api/bookings/tutorbooking`, {
          headers: {
        cookie: cookieStore.toString(),
      },
    cache: "no-store",
    
  });

  const data = await res.json();

  return {
    data:data,
    error: null
  };
};

const getalltutorokingstatus = async () => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/api/bookings/tutor/statistics`, {
      headers: {
        cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

   

    const data = await res.json();
     if (!res.ok)
      return { data: null, error: data.message || "Failed to fetch booking" };

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

const cancelBooking = async (bookingId: string) => {
  const res = await fetch(`${API_URL}/api/bookings/${bookingId}`, {
    headers: {
        cookie: cookieStore.toString(),
      },
       cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to cancel booking");
  }

  return data.data;
};

export const bookingServices = {
  getMyBooking,
  getallBookings,
  getBookingById,
  cancelBooking,
  getTutorBookings,
  getMyBookingstatus,
  getalltutorokingstatus
};
