
import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

const getTutorReviews = async () => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/api/reviews/tutor`, {
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

export const reviewServices={
    getTutorReviews
}
